import { SetStateAction } from "react";
import { IDate } from "../../Application/AddActivityForm/AddActivityForm";
import {
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper,
} from "../../wheel-picker";

const createArray = (length: number, add = 0): WheelPickerOption<number>[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value,
    };
  });

const hourOptions12 = createArray(12, 1);
const hourOptions24 = createArray(24, 0);
const minuteOptions = createArray(60);
const meridiemOptions: WheelPickerOption[] = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

const WheelStartTimePicker = ({
  value,
  onChange,
  use24Hour = false,
}: {
  value: IDate;
  onChange: (value: SetStateAction<IDate>) => void;
  use24Hour?: boolean;
}) => {
  const hourOptions = use24Hour ? hourOptions24 : hourOptions12;
  const handleChangeDate = (value: number | string, type: string) => {
    switch (type) {
      case "hour": {
        onChange((prevState: IDate) => {
          return { ...prevState, hour: +value };
        });
        return;
      }
      case "minute": {
        onChange((prevState: IDate) => {
          return { ...prevState, minute: +value };
        });
        return;
      }
      case "meridiem": {
        onChange((prevState: IDate) => {
          return { ...prevState, meridiem: value as "AM" | "PM" };
        });
        return;
      }
    }
  };

  return (
    <WheelPickerWrapper>
      <WheelPicker
        options={hourOptions}
        value={value.hour}
        onValueChange={(value) => handleChangeDate(value, "hour")}
      />
      <WheelPicker
        options={minuteOptions}
        value={value.minute}
        onValueChange={(value) => handleChangeDate(value, "minute")}
      />
      {!use24Hour && (
        <WheelPicker
          options={meridiemOptions}
          value={value.meridiem}
          onValueChange={(value) => handleChangeDate(value, "meridiem")}
        />
      )}
    </WheelPickerWrapper>
  );
};

export default WheelStartTimePicker;
