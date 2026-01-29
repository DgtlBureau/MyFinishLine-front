"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { getSmallDistanceUnit } from "@/app/lib/utils/convertData";
import axios from "axios";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import WheelTimePicker from "../../Shared/WheelTimePicker/WheelTimePicker";
import DateWheelPicker from "../../Shared/WheelDatePicker/WheelDatePicker";
import WheelStartTimePicker from "../../Shared/WheelStartTimePicker/WheelStartTimePicker";
import SheetContainer from "../../SheetContainer/SheetContainer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserActiveChallenge } from "@/app/lib/utils/userService";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setChallenge } from "@/app/lib/features/challenge/challengeSlice";
import { useNotifications } from "@/app/contexts/NotificationContext";
import { motion } from "framer-motion";

const glassInput =
  "h-14 text-base bg-white/20 backdrop-blur-xl border-white/30 rounded-2xl shadow-lg text-white font-medium caret-white placeholder:text-white/40 placeholder:font-normal focus:border-white/50 focus:ring-white/20";

enum ActivityType {
  Walk = "Walk",
  Run = "Run",
  Cycling = "Cycling",
  Swimming = "Swimming",
}

export interface IDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  meridiem: "AM" | "PM";
}

export interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

interface IManualActivity {
  name: string;
  start_date: Date;
  type: ActivityType;
  distance: string;
}

const sportTypeOptions = [
  ActivityType.Walk,
  ActivityType.Run,
  ActivityType.Cycling,
  ActivityType.Swimming,
];

const formatToBackendString = (dateTime: IDate, is24Hour: boolean): string => {
  let hour24 = dateTime.hour;

  if (!is24Hour) {
    if (dateTime.meridiem === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (dateTime.meridiem === "AM" && hour24 === 12) {
      hour24 = 0;
    }
  }

  const date = new Date(
    dateTime.year,
    dateTime.month - 1,
    dateTime.day,
    hour24,
    dateTime.minute,
  );

  return format(date, "yyyy-MM-dd HH:mm:ss");
};

const convertObjectToSeconds = (timeObject: ITime): number => {
  return timeObject.hours * 3600 + timeObject.minutes * 60 + timeObject.seconds;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const AddActivitityForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const smallDistanceUnit = getSmallDistanceUnit(user.measure);
  const use24Hour = user.measure === "km";

  const currentDate = new Date();
  const rawHours = currentDate.getHours();
  const hour12 = rawHours % 12 || 12;
  const ampm = rawHours >= 12 ? "PM" : "AM";

  const [activityData, setActivityData] = useState<IManualActivity>({
    name: "",
    start_date: new Date(),
    type: ActivityType.Walk,
    distance: "",
  });
  const [time, setTime] = useState<ITime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [date, setDate] = useState<IDate>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
    hour: use24Hour ? rawHours : hour12,
    minute: currentDate.getMinutes(),
    meridiem: ampm,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isStartTimeModalOpen, setIsStartTimeModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const { checkNotifications } = useNotifications();

  const handleOpenTimeModal = () => {
    setIsTimeModalOpen(true);
  };

  const handleCloseTimeModal = () => {
    setIsTimeModalOpen(false);
  };

  const handleOpenDateModal = () => {
    setIsDateModalOpen(true);
  };

  const handleCloseDateModal = () => {
    setIsDateModalOpen(false);
  };

  const handleOpenStartTimeModal = () => {
    setIsStartTimeModalOpen(true);
  };

  const handleCloseStartTimeModal = () => {
    setIsStartTimeModalOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.type === "number" &&
      /(?<=^| )\d+(\.\d+)?(?=$| )/.test(event.target.value)
    ) {
      setActivityData((prevState) => {
        return {
          ...prevState,
          [event.target.name]: event.target.value,
        };
      });
    } else {
      setActivityData((prevState) => {
        return {
          ...prevState,
          [event.target.name]: event.target.value,
        };
      });
    }
  };

  const handleLoadChallenge = async () => {
    try {
      const data = await getUserActiveChallenge();
      if (data) {
        dispatch(setChallenge(data));
      }
    } catch (error) {
      console.error("Failed to load challenge:", error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/user/activities", {
        ...activityData,
        moving_time: convertObjectToSeconds(time),
        start_date: formatToBackendString(date, use24Hour),
      });
      toast.success("Manual activity successfully added");
      await handleLoadChallenge();
      await checkNotifications();
      router.push("/app/profile/activities");
    } catch (error: any) {
      toast.error(
        "Error adding manual activity. " + error.response.data.message,
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="px-4 space-y-4" onSubmit={handleSubmit}>
      <motion.label
        className="block"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <span className="text-sm font-semibold text-white/80 tracking-wide">Name</span>
        <Input
          name="name"
          className={`mt-1 ${glassInput}`}
          placeholder="Quick run"
          value={activityData.name}
          onChange={handleChange}
        />
      </motion.label>

      <motion.div
        className="flex gap-3"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <label className="w-full">
          <span className="text-sm font-semibold text-white/80 tracking-wide">Start Date</span>
          <Button
            className={`mt-1 block w-full text-left hover:bg-white/30 ${glassInput}`}
            variant="outline"
            type="button"
            onClick={handleOpenDateModal}
          >
            {date.month < 10 ? "0" + date.month : date.month}.
            {date.day < 10 ? "0" + date.day : date.day}.{date.year}
          </Button>
        </label>
        <label className="w-full">
          <span className="text-sm font-semibold text-white/80 tracking-wide">Start Time</span>
          <Button
            className={`mt-1 block w-full text-left hover:bg-white/30 ${glassInput}`}
            variant="outline"
            type="button"
            onClick={handleOpenStartTimeModal}
          >
            {date.hour === 0 && date.minute === 0
              ? "Select time"
              : use24Hour
                ? `${date.hour < 10 ? "0" + date.hour : date.hour}:${date.minute < 10 ? "0" + date.minute : date.minute}`
                : `${date.hour < 10 ? "0" + date.hour : date.hour}:${date.minute < 10 ? "0" + date.minute : date.minute} ${date.meridiem}`}
          </Button>
        </label>
      </motion.div>

      <motion.label
        className="block w-full"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <span className="text-sm font-semibold text-white/80 tracking-wide">Time elapsed</span>
        <Button
          className={`mt-1 block w-full text-left hover:bg-white/30 ${glassInput}`}
          variant="outline"
          type="button"
          onClick={handleOpenTimeModal}
        >
          {time.hours === 0 && time.minutes === 0 && time.seconds === 0
            ? "Select time"
            : `${time.hours < 10 ? "0" + time.hours : time.hours}:${time.minutes < 10 ? "0" + time.minutes : time.minutes}:${time.seconds < 10 ? "0" + time.seconds : time.seconds}`}
        </Button>
      </motion.label>

      <motion.label
        className="block"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <span className="text-sm font-semibold text-white/80 tracking-wide">Activity type</span>
        <Select
          name="type"
          value={activityData.type || ""}
          onValueChange={(value) => {
            setActivityData({
              ...activityData,
              type: value as ActivityType,
            });
          }}
          required
        >
          <SelectTrigger className={`w-full mt-1 ${glassInput}`}>
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            {sportTypeOptions.map((activityType) => (
              <SelectItem
                className="w-full flex items-center justify-between"
                key={activityType}
                value={activityType}
              >
                <div className="w-full flex items-center justify-between">
                  {activityType}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.label>

      <motion.label
        className="block w-full"
        custom={4}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <span className="text-sm font-semibold text-white/80 tracking-wide">Distance</span>
        <div className="relative flex items-center w-full mt-1">
          <Input
            name="distance"
            type="number"
            containerClassName="w-full"
            className={`w-full pr-8 ${glassInput}`}
            placeholder="1000"
            value={activityData.distance}
            onChange={handleChange}
          />
          <span className="absolute right-3.5 text-sm text-white/50 font-medium">m</span>
        </div>
      </motion.label>

      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="space-y-2 pt-2"
      >
        <Button
          className="w-full h-14 text-base rounded-2xl flex items-center justify-center"
          type="submit"
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 width={48} height={48} className="animate-spin" />
            </div>
          ) : (
            "Submit activity"
          )}
        </Button>
        <Link
          href="/app/profile/activities"
          className={`block w-full text-center hover:bg-white/30 ${glassInput} leading-[3.5rem]`}
        >
          Cancel
        </Link>
      </motion.div>

      <SheetContainer isOpen={isDateModalOpen} onClose={handleCloseDateModal}>
        <div className="max-w-4xl mx-auto pb-20 pt-4">
          <DateWheelPicker value={date} onChange={setDate} />
        </div>
      </SheetContainer>
      <SheetContainer
        isOpen={isStartTimeModalOpen}
        onClose={handleCloseStartTimeModal}
      >
        <div className="max-w-4xl mx-auto pb-20 pt-4">
          <WheelStartTimePicker value={date} onChange={setDate} use24Hour={use24Hour} />
        </div>
      </SheetContainer>
      <SheetContainer isOpen={isTimeModalOpen} onClose={handleCloseTimeModal}>
        <div className="max-w-4xl mx-auto pb-20 pt-4">
          <WheelTimePicker value={time} onChange={setTime} />
        </div>
      </SheetContainer>
    </form>
  );
};

export default AddActivitityForm;
