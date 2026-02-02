"use client";

import { SetStateAction } from "react";
import { logger } from "@/app/lib/logger";
import {
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper,
} from "../../wheel-picker";

export const createArray = (
  length: number,
  add = 0,
): WheelPickerOption<number>[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value,
    };
  });

const CustomWheelPicker = <T,>({
  options,
  value,
  onChange,
}: {
  options: WheelPickerOption<T>[];
  value: T;
  onChange: (value: SetStateAction<T>) => void;
}) => {
  return (
    <WheelPickerWrapper>
      <WheelPicker
        options={options}
        value={value}
        onValueChange={(value) => {
          logger.log(value);
          onChange(value);
        }}
      />
    </WheelPickerWrapper>
  );
};

export default CustomWheelPicker;
