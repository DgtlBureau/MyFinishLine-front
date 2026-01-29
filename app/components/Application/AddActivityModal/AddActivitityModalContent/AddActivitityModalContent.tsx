"use client";

import { Button } from "@/app/components/ui/button";
import { DateTimePicker } from "@/app/components/ui/dateTimePicker";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  addActivity,
  updateActivities,
} from "@/app/lib/features/activities/activitiesSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import convertToFormattedDate from "@/app/lib/utils/convertToFormattedDate";
import timeStringToSeconds from "@/app/lib/utils/timeStringConvert";
import { IActivity } from "@/app/types";
import axios from "axios";
import { format, parse } from "date-fns";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNotifications } from "@/app/contexts/NotificationContext";

enum ActivityType {
  Walk = "Walk",
  Run = "Run",
  Cycling = "Cycling",
  Swimming = "Swimming",
}

interface IManualActivity {
  name: string;
  start_date: Date;
  moving_time: string;
  type: ActivityType;
  distance: string;
  average_speed: string;
  max_speed: string;
  average_heart_rate: string;
}

const sportTypeOptions = [
  ActivityType.Walk,
  ActivityType.Run,
  ActivityType.Cycling,
  ActivityType.Swimming,
];

const AddActivitityModalContent = ({
  onClose,
  handleAddActivity,
}: {
  onClose: () => void;
  handleAddActivity: (activity: IActivity) => void;
}) => {
  const { checkNotifications } = useNotifications();
  const [activityData, setActivityData] = useState<IManualActivity>({
    name: "",
    start_date: new Date(),
    moving_time: "00:00:00",
    type: ActivityType.Walk,
    distance: "",
    max_speed: "",
    average_speed: "",
    average_heart_rate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/user/activities", {
        ...activityData,
        date: activityData.start_date.toString(),
        moving_time: timeStringToSeconds(activityData.moving_time),
        start_date: format(activityData.start_date, "yyyy-MM-dd hh:mm:ss"),
      });
      toast.success("Manual activity successfully added");
      handleAddActivity(data);
      await checkNotifications();
      onClose();
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
    <form onSubmit={handleSubmit}>
      <h4 className="text-lg">Add activity manually</h4>
      <label>
        <span className="text-sm">Name</span>
        <Input
          name="name"
          placeholder="Quick run"
          value={activityData.name}
          onChange={handleChange}
        />
      </label>
      <div className="flex gap-2">
        <label className="w-full">
          <span className="text-sm">Date</span>
          <DateTimePicker
            value={activityData.start_date}
            onChange={(value) => {
              setActivityData((prevState) => {
                return { ...prevState, start_date: value };
              });
            }}
          />
        </label>
        <label>
          <span className="text-sm">Time elapsed</span>
          <Input
            name="moving_time"
            type="time"
            step="1"
            containerClassName="w-full"
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
            value={activityData.moving_time}
            onChange={handleChange}
          />
        </label>
      </div>
      <label>
        <span className="text-sm">Activity type</span>
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
          <SelectTrigger className="w-full mt-1">
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
      </label>
      <label className="w-full">
        <span className="text-sm">Distance</span>
        <div className="relative flex items-center w-full">
          <Input
            name="distance"
            type="number"
            containerClassName="w-full"
            className="w-full pr-8"
            placeholder="1000.0"
            value={activityData.distance}
            onChange={handleChange}
          />
          <span className="absolute right-3.5 text-sm text-[#71717A]">m</span>
        </div>
      </label>
      <div className="flex gap-2">
        <label className="w-full">
          <span className="text-sm">Average speed</span>
          <div className="relative flex items-center w-full">
            <Input
              name="average_speed"
              type="number"
              containerClassName="w-full"
              className="w-full pr-12"
              placeholder="10.0"
              value={activityData.average_speed}
              onChange={handleChange}
            />
            <span className="absolute right-3.5 text-sm text-[#71717A]">
              m/s
            </span>
          </div>
        </label>
        <label className="w-full">
          <span className="text-sm">Max speed</span>
          <div className="relative flex items-center w-full">
            <Input
              name="max_speed"
              type="number"
              containerClassName="w-full"
              className="w-full pr-12"
              placeholder="10.0"
              value={activityData.max_speed}
              onChange={handleChange}
            />
            <span className="absolute right-3.5 text-sm text-[#71717A]">
              m/s
            </span>
          </div>
        </label>
      </div>
      <label className="w-full">
        <span className="text-sm">Average heart rate</span>
        <div className="relative flex items-center w-full">
          <Input
            name="average_heart_rate"
            type="number"
            containerClassName="w-full"
            className="w-full pr-12"
            placeholder="90"
            value={activityData.average_heart_rate}
            onChange={handleChange}
          />
          <span className="absolute right-3.5 text-sm text-[#71717A]">bpm</span>
        </div>
      </label>
      <Button
        className="mt-2 w-full flex items-center justify-center"
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
      <Button
        className="mt-2 w-full flex items-center justify-center"
        type="button"
        variant="outline"
        onClick={onClose}
      >
        Cancel
      </Button>
    </form>
  );
};

export default AddActivitityModalContent;
