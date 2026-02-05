"use client";

import { useFormik } from "formik";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { validate } from "@/app/lib/utils/validate/paymentValidate";
import { useState, useEffect, useRef, useMemo } from "react";
import { IProduct, IShippingRate, IDiscount } from "@/app/types";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { Lock, CreditCard, Shield, MapPin, Package, Check, X, Loader2 } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { logger } from "@/app/lib/logger";
interface PaymentFormProps {
  product: IProduct;
  quantity: number;
  selectedShipping: IShippingRate | null;
  setSelectedShipping: (shipping: IShippingRate | null) => void;
  setDiscount: (discount: IDiscount | null) => void;
}

const PaymentForm = ({ product, quantity, selectedShipping, setSelectedShipping, setDiscount }: PaymentFormProps) => {
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
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const appliedPromoRef = useRef<string>("");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return shippingRates;
    const q = countrySearch.toLowerCase();
    return shippingRates.filter(
      (rate) => rate.country_name.toLowerCase().includes(q) || rate.country_code.toLowerCase().includes(q)
    );
  }, [countrySearch, shippingRates]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  // Apply promo code — validate via backend (cached Paddle discounts)
  const applyPromoCode = async () => {
    const code = values.promoCode.trim();
    if (!code) return;

    setPromoLoading(true);
    setPromoStatus("idle");

    try {
      const response = await fetch("/api/payment/validate-promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const discountData = await response.json();
        setDiscount(discountData);
        setPromoStatus("valid");
        appliedPromoRef.current = code;
      } else {
        setDiscount(null);
        setPromoStatus("invalid");
        appliedPromoRef.current = "";
      }
    } catch (error) {
      logger.error("Failed to validate promo code", error);
      setDiscount(null);
      setPromoStatus("invalid");
      appliedPromoRef.current = "";
    }

    setPromoLoading(false);
  };

  // Reset promo status when user edits the promo code
  useEffect(() => {
    const code = values.promoCode.trim();
    if (code !== appliedPromoRef.current) {
      setPromoStatus("idle");
      if (!code) {
        setDiscount(null);
        appliedPromoRef.current = "";
      }
    }
  }, [values.promoCode]);

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

    // Add shipping if country is selected and has paddle_price_id (1 shipping per challenge)
    if (selectedShipping && selectedShipping.paddle_price_id) {
      items.push({
        priceId: selectedShipping.paddle_price_id,
        quantity,
      });
    }

    paddle.Checkout.open({
      items,
      customer: {
        email: values.email,
        address: {
          countryCode: values.country || undefined,
          postalCode: values.postalCode || undefined,
          city: values.city || undefined,
          firstLine: values.address || undefined,
        },
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
        allowLogout: false,
        showAddTaxId: false,
        successUrl: `${window.location.origin}/payment/success`,
        ...({ allowQuantityUpdates: false } as Record<string, unknown>),
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
        <div ref={countryRef} className="relative">
          <label htmlFor="country" className="block text-sm font-medium text-white/80 mb-1.5">Country *</label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="off"
            value={countrySearch}
            placeholder="Search country..."
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setCountryDropdownOpen(true);
              if (!e.target.value) {
                setFieldValue("country", "");
                setSelectedShipping(null);
              }
            }}
            onFocus={() => setCountryDropdownOpen(true)}
            onBlur={handleBlur}
            className={glassInputClassName}
          />
          {countryDropdownOpen && filteredCountries.length > 0 && (
            <ul className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-lg">
              {filteredCountries.map((rate) => (
                <li
                  key={rate.id}
                  onMouseDown={() => {
                    setFieldValue("country", rate.country_code);
                    setSelectedShipping(rate);
                    setCountrySearch(`${rate.country_name} ($${rate.price})`);
                    setCountryDropdownOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm text-[#1a1a2e] cursor-pointer hover:bg-[#3B5CC6]/10 transition-colors"
                >
                  {rate.country_name} (${rate.price})
                </li>
              ))}
            </ul>
          )}
          {countryDropdownOpen && filteredCountries.length === 0 && countrySearch && (
            <div className="absolute z-50 mt-1 w-full rounded-xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-lg px-4 py-3 text-sm text-[#1a1a2e]/50">
              No countries found
            </div>
          )}
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
          <PhoneInput
            international
            limitMaxLength
            defaultCountry={(values.country as Country) || undefined}
            country={(values.country as Country) || undefined}
            value={values.phone}
            onChange={(value) => setFieldValue("phone", value || "")}
            onBlur={handleBlur}
            className={glassInputClassName}
            id="phone"
            name="phone"
          />
          {touched.phone && errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
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
          <div className="flex items-stretch gap-2">
            <div className="flex-1">
              <Input
                id="promoCode"
                name="promoCode"
                value={values.promoCode}
                placeholder="Enter promo code"
                onChange={(e) => setFieldValue("promoCode", e.target.value)}
                className={glassInputClassName}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyPromoCode();
                  }
                }}
              />
            </div>
            <button
              type="button"
              onClick={applyPromoCode}
              disabled={promoLoading || !values.promoCode.trim()}
              className="shrink-0 px-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/60 text-[#1a1a2e] font-medium text-sm hover:bg-white/70 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {promoLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Apply"
              )}
            </button>
          </div>
          {promoStatus === "valid" && (
            <p className="flex items-center gap-1.5 text-green-400 text-sm mt-2">
              <Check size={14} />
              Promo code applied
            </p>
          )}
          {promoStatus === "invalid" && (
            <p className="flex items-center gap-1.5 text-red-400 text-sm mt-2">
              <X size={14} />
              Invalid promo code
            </p>
          )}
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
