import "@ncdai/react-wheel-picker/style.css";

import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";

import { cn } from "@/app/lib/utils";

type WheelPickerValue = WheelPickerPrimitive.WheelPickerValue;

type WheelPickerOption<T extends WheelPickerValue = string> =
  WheelPickerPrimitive.WheelPickerOption<T>;

type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames;

function WheelPickerWrapper({
  className,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      className={cn(
        "w-full rounded-2xl bg-white/40 backdrop-blur-xl px-2 border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]",
        "*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-xl",
        "*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-xl",
        className,
      )}
      {...props}
    />
  );
}

function WheelPicker<T extends WheelPickerValue = string>({
  classNames,
  ...props
}: WheelPickerPrimitive.WheelPickerProps<T>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      classNames={{
        optionItem: "text-[#1a1a2e]/40 font-medium text-xl",
        highlightWrapper: cn(
          "bg-white/70 backdrop-blur-sm text-[#1a1a2e] font-bold text-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]",
          "data-rwp-focused:ring-2 data-rwp-focused:ring-white/30 data-rwp-focused:ring-inset",
        ),
        ...classNames,
      }}
      {...props}
    />
  );
}

export { WheelPicker, WheelPickerWrapper };
export type { WheelPickerClassNames, WheelPickerOption };
