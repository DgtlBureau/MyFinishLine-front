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
      <div className="flex items-center gap-0.5">
        <span className="text-[9px] text-white/50 font-medium w-6 text-center">DAYS</span>
        <span className="w-3" />
        <span className="text-[9px] text-white/50 font-medium w-6 text-center">HRS</span>
        <span className="w-3" />
        <span className="text-[9px] text-white/50 font-medium w-6 text-center">MIN</span>
        <span className="w-3" />
        <span className="text-[9px] text-white/50 font-medium w-6 text-center">SEC</span>
      </div>
      <div className="flex items-center font-bold text-[18px] text-white tabular-nums">
        <span className="w-6 text-center">{pad(time.days)}</span>
        <span className="w-3 text-center text-white/70">:</span>
        <span className="w-6 text-center">{pad(time.hours)}</span>
        <span className="w-3 text-center text-white/70">:</span>
        <span className="w-6 text-center">{pad(time.minutes)}</span>
        <span className="w-3 text-center text-white/70">:</span>
        <span className="w-6 text-center">{pad(time.seconds)}</span>
      </div>
    </div>
  );
};

export default TimeCounter;
