"use client";

import { useState, useEffect } from "react";

interface ITimeCounterProps {
  startDate: string;
}

const TimeCounter = ({ startDate }: ITimeCounterProps) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate);
      const now = new Date();
      const diffMs = Math.abs(now.getTime() - start.getTime());

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const pad = (num: number) => num.toString().padStart(2, "0");

  const totalHours = time.days * 24 + time.hours + time.minutes / 60;

  return (
    <div className="flex flex-col">
      <span className="text-[11px] text-white/70 font-medium tracking-wider">
        TIME ON TRACK
      </span>
      <div className="flex items-end gap-0.5">
        <div className="flex flex-col items-center w-8 flex-shrink-0">
          <span className="text-[9px] text-white/50 font-medium">DAYS</span>
          <span className="font-bold text-[18px] text-white tabular-nums">{pad(time.days)}</span>
        </div>
        <span className="text-[18px] font-bold text-white/70 pb-0.5 flex-shrink-0">:</span>
        <div className="flex flex-col items-center w-8 flex-shrink-0">
          <span className="text-[9px] text-white/50 font-medium">HRS</span>
          <span className="font-bold text-[18px] text-white tabular-nums">{pad(time.hours)}</span>
        </div>
        <span className="text-[18px] font-bold text-white/70 pb-0.5 flex-shrink-0">:</span>
        <div className="flex flex-col items-center w-8 flex-shrink-0">
          <span className="text-[9px] text-white/50 font-medium">MIN</span>
          <span className="font-bold text-[18px] text-white tabular-nums">{pad(time.minutes)}</span>
        </div>
        <span className="text-[18px] font-bold text-white/70 pb-0.5 flex-shrink-0">:</span>
        <div className="flex flex-col items-center w-8 flex-shrink-0">
          <span className="text-[9px] text-white/50 font-medium">SEC</span>
          <span className="font-bold text-[18px] text-white tabular-nums">{pad(time.seconds)}</span>
        </div>
      </div>
    </div>
  );
};

export default TimeCounter;
