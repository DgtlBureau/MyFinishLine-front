"use client";

import { SetStateAction } from "react";
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

const CustomWheelPicker = ({
  options,
  value,
  onChange,
}: {
  options: any;
  value: any;
  onChange: (value: SetStateAction<any>) => void;
}) => {
  return (
    <WheelPickerWrapper>
      <WheelPicker options={options} value={value} onValueChange={onChange} />
    </WheelPickerWrapper>
  );
};

export default CustomWheelPicker;
