"use client";

import { useFormik } from "formik";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { validate } from "@/app/lib/utils/validate/paymentValidate";
import { useState, useEffect, useRef } from "react";
import { IProduct, IShippingRate, IPricingPreview } from "@/app/types";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { Lock, CreditCard, Shield, MapPin, Package } from "lucide-react";

import { logger } from "@/app/lib/logger";
interface PaymentFormProps {
  product: IProduct;
  quantity: number;
  selectedShipping: IShippingRate | null;
  setSelectedShipping: (shipping: IShippingRate | null) => void;
  setPricingPreview: (preview: IPricingPreview | null) => void;
}

const PaymentForm = ({ product, quantity, selectedShipping, setSelectedShipping, setPricingPreview }: PaymentFormProps) => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      city: "",
      address: "",
      postalCode: "",
      phone: "",
      promoCode: "",
    },
    validate,
    onSubmit: () => {
      openCheckout();
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [shippingRates, setShippingRates] = useState<IShippingRate[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializePaddle({
      environment: "production",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_SIDE_TOKEN!,
    })
      .then((paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      })
      .catch((error) => {
        logger.log("Paddle js:error", error);
      });
  }, []);

  useEffect(() => {
    // Load shipping rates
    fetch("/api/payment/shipping-rates")
      .then((res) => res.json())
      .then((data) => {
        setShippingRates(data);
      })
      .catch((error) => {
        logger.error("Failed to load shipping rates", error);
      });
  }, []);

  // Fetch pricing preview with discount code
  const fetchPricingPreview = async (promoCode: string) => {
    const paddlePriceId = product.prices?.paddle_price_id;
    if (!paddlePriceId) return;

    try {
      const response = await fetch("/api/payment/preview-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge_price_id: paddlePriceId,
          quantity,
          shipping_price_id: selectedShipping?.paddle_price_id || null,
          discount_code: promoCode || null,
        }),
      });

      if (response.ok) {
        const preview = await response.json();
        // Validate that preview has required structure
        if (preview && preview.details && preview.totals) {
          setPricingPreview(preview);
        } else {
          // Invalid response structure (e.g., invalid promo code)
          setPricingPreview(null);
        }
      } else {
        // Invalid promo code or error
        setPricingPreview(null);
      }
    } catch (error) {
      logger.error("Failed to fetch pricing preview", error);
      setPricingPreview(null);
    }
  };

  // Update preview when promo code, quantity, or shipping changes (with 500ms debounce)
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (values.promoCode) {
      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        fetchPricingPreview(values.promoCode || "");
      }, 500);
    } else {
      setPricingPreview(null);
    }

    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [values.promoCode, quantity, selectedShipping]);

  const openCheckout = () => {
    if (!paddle) {
      logger.error("Paddle is not initialized");
      return;
    }

    const paddlePriceId = product.prices?.paddle_price_id;

    if (!paddlePriceId) {
      logger.error("Paddle price ID is missing from product");
      alert("Unable to process payment. Please contact support.");
      return;
    }

    setIsLoading(true);

    // Build items array - challenge + shipping if selected
    const items: Array<{ priceId: string; quantity: number }> = [
      {
        priceId: paddlePriceId,
        quantity,
      },
    ];

    // Add shipping if country is selected and has paddle_price_id
    if (selectedShipping && selectedShipping.paddle_price_id) {
      items.push({
        priceId: selectedShipping.paddle_price_id,
        quantity: 1,
      });
    }

    paddle.Checkout.open({
      items,
      customer: {
        email: values.email,
      },
      customData: {
        firstName: values.firstName,
        lastName: values.lastName,
        challengeId: product.challenge_info?.id,
        country_code: values.country,
        country_name: selectedShipping?.country_name || "",
        city: values.city,
        address: values.address,
        postal_code: values.postalCode,
        phone: values.phone,
      },
      discountCode: values.promoCode || undefined,
      settings: {
        displayMode: "overlay",
        theme: "light",
        locale: "en",
        successUrl: `${window.location.origin}/payment/success`,
      },
    });

    setIsLoading(false);
  };

  const glassInputClassName =
    "w-full py-4 px-5 text-base rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 text-[#1a1a2e] placeholder:text-[#1a1a2e]/40 outline-none focus:border-white/80 focus:ring-2 focus:ring-white/30 transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-lg">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-white/70" />
          <p className="font-bold text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            Your details
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-[50%]">
            <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-1.5">First Name</label>
            <Input
              id="firstName"
              name="firstName"
              value={values.firstName}
              placeholder="First Name"
              onChange={(e) => setFieldValue("firstName", e.target.value)}
              className={glassInputClassName}
              onBlur={handleBlur}
              error={touched.firstName ? errors.firstName : undefined}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-1.5">Last Name</label>
            <Input
              id="lastName"
              name="lastName"
              value={values.lastName}
              placeholder="Last Name"
              onChange={(e) => setFieldValue("lastName", e.target.value)}
              className={glassInputClassName}
              onBlur={handleBlur}
              error={touched.lastName ? errors.lastName : undefined}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
          <Input
            id="email"
            name="email"
            value={values.email}
            placeholder="E-mail"
            onChange={(e) => setFieldValue("email", e.target.value)}
            className={glassInputClassName}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
          />
        </div>
      </div>

      {/* Shipping Address block */}
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-lg">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-white/70" />
          <p className="font-bold text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            Shipping Address
          </p>
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-white/80 mb-1.5">Country *</label>
          <select
            id="country"
            name="country"
            value={values.country}
            onChange={(e) => {
              setFieldValue("country", e.target.value);
              const selected = shippingRates.find(rate => rate.country_code === e.target.value);
              setSelectedShipping(selected || null);
            }}
            onBlur={handleBlur}
            className={glassInputClassName + " cursor-pointer"}
          >
            <option value="">Select country</option>
            {shippingRates.map((rate) => (
              <option key={rate.id} value={rate.country_code}>
                {rate.country_name} (${rate.price})
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <p className="text-red-400 text-sm mt-1">{errors.country}</p>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-[50%]">
            <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-1.5">City *</label>
            <Input
              id="city"
              name="city"
              value={values.city}
              placeholder="City"
              onChange={(e) => setFieldValue("city", e.target.value)}
              className={glassInputClassName}
              onBlur={handleBlur}
              error={touched.city ? errors.city : undefined}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="postalCode" className="block text-sm font-medium text-white/80 mb-1.5">Postal Code *</label>
            <Input
              id="postalCode"
              name="postalCode"
              value={values.postalCode}
              placeholder="Postal Code"
              onChange={(e) => setFieldValue("postalCode", e.target.value)}
              className={glassInputClassName}
              onBlur={handleBlur}
              error={touched.postalCode ? errors.postalCode : undefined}
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-white/80 mb-1.5">Street Address *</label>
          <Input
            id="address"
            name="address"
            value={values.address}
            placeholder="Street Address"
            onChange={(e) => setFieldValue("address", e.target.value)}
            className={glassInputClassName}
            onBlur={handleBlur}
            error={touched.address ? errors.address : undefined}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1.5">Phone *</label>
          <Input
            id="phone"
            name="phone"
            value={values.phone}
            placeholder="+1 234 567 8900"
            onChange={(e) => setFieldValue("phone", e.target.value)}
            className={glassInputClassName}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : undefined}
          />
        </div>
      </div>

      {/* Promo Code block */}
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-lg">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-white/70" />
          <p className="font-bold text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            Promo Code
          </p>
        </div>
        <div>
          <label htmlFor="promoCode" className="block text-sm font-medium text-white/80 mb-1.5">Promo Code (optional)</label>
          <Input
            id="promoCode"
            name="promoCode"
            value={values.promoCode}
            placeholder="Enter promo code"
            onChange={(e) => setFieldValue("promoCode", e.target.value)}
            className={glassInputClassName}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {/* Payment info block */}
      <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-white/70" />
          <p className="font-medium text-sm text-white/80">
            Card details will be entered securely via Paddle
          </p>
        </div>
        <div className="flex items-center gap-4 text-white/50 text-xs">
          <div className="flex items-center gap-1.5">
            <Shield size={14} />
            <span>256-bit SSL encryption</span>
          </div>
          <span>Visa, Mastercard, PayPal & more</span>
        </div>
      </div>

      <Button
        variant="ghost"
        className="group relative w-full py-6 px-6 text-xl font-bold uppercase cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl overflow-hidden text-white shadow-xl backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90 hover:text-white"
        type="submit"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        {isLoading ? (
          <>
            <div className="relative z-10 w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
            <span className="relative z-10">Processing...</span>
          </>
        ) : (
          <>
            <CreditCard size={20} className="relative z-10" />
            <span className="relative z-10">Proceed to Payment</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
