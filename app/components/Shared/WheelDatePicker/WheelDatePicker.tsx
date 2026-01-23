"use client";

import { SetStateAction, useState } from "react";
import {
  WheelPicker,
  type WheelPickerOption,
  WheelPickerWrapper,
} from "../../wheel-picker";
import { IDate } from "../../Application/AddActivityForm/AddActivityForm";

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

const currentYear = new Date().getFullYear();
const yearOptions = createArray(21, currentYear - 10).map((option) => ({
  label: option.value.toString(),
  value: option.value,
}));

const monthOptions: WheelPickerOption<number>[] = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

const DateWheelPicker = ({
  value,
  onChange,
}: {
  value: IDate;
  onChange: (value: SetStateAction<IDate>) => void;
}) => {
  const daysInMonth = getDaysInMonth(value.month, value.year);
  const dayOptions = createArray(daysInMonth, 1);

  const handleChangeDate = (value: number, type: string) => {
    switch (type) {
      case "year": {
        onChange((prevState: IDate) => {
          return { ...prevState, year: value };
        });
        return;
      }
      case "month": {
        onChange((prevState: IDate) => {
          return { ...prevState, month: value };
        });
        return;
      }
      case "day": {
        onChange((prevState: IDate) => {
          return { ...prevState, day: value };
        });
        return;
      }
    }
  };

  return (
    <WheelPickerWrapper>
      <WheelPicker
        options={monthOptions}
        value={value.month}
        onValueChange={(value) => handleChangeDate(value, "month")}
        infinite
      />
      <WheelPicker
        options={dayOptions}
        value={value.day}
        onValueChange={(value) => handleChangeDate(value, "day")}
        infinite
      />
      <WheelPicker
        options={yearOptions}
        value={value.year}
        onValueChange={(value) => handleChangeDate(value, "year")}
        infinite
      />
    </WheelPickerWrapper>
  );
};

export default DateWheelPicker;
