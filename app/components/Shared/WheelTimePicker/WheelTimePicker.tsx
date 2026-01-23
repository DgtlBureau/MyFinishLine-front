import { SetStateAction } from "react";
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

const hourOptions = createArray(24, 0);
const minuteOptions = createArray(60);
const secondOptions = createArray(60);

const WheelTimePicker = ({
  value,
  onChange,
}: {
  value: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onChange: (
    value: SetStateAction<{
      hours: number;
      minutes: number;
      seconds: number;
    }>,
  ) => void;
}) => {
  const handleChangeValue = (value: number, type: string) => {
    switch (type) {
      case "hours": {
        onChange((prevState) => {
          return { ...prevState, hours: value };
        });
        return;
      }
      case "minutes": {
        onChange((prevState) => {
          return { ...prevState, minutes: value };
        });
        return;
      }
      case "seconds": {
        onChange((prevState) => {
          return { ...prevState, seconds: value };
        });
        return;
      }
    }
  };

  return (
    <WheelPickerWrapper>
      <WheelPicker
        options={hourOptions}
        defaultValue={1}
        value={value.hours}
        onValueChange={(value) => handleChangeValue(value, "hours")}
      />
      <WheelPicker
        options={minuteOptions}
        defaultValue={0}
        value={value.minutes}
        onValueChange={(value) => handleChangeValue(value, "minutes")}
      />
      <WheelPicker
        options={secondOptions}
        defaultValue={0}
        value={value.seconds}
        onValueChange={(value) => handleChangeValue(value, "seconds")}
      />
    </WheelPickerWrapper>
  );
};

export default WheelTimePicker;
