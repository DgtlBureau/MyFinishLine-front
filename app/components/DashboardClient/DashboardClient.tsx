"use client";

import { IActivity, IAthlete } from "@/app/types";
import { useState } from "react";
import { MapContainer } from "react-leaflet";
import Map from "../Map/Map";

interface IDashboardClientProps {
  athlete: IAthlete;
  activities: IActivity[];
}

const DashboardClient = ({ athlete, activities }: IDashboardClientProps) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/strava/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  const formatPace = (speedMps: number) => {
    if (!speedMps) return "0:00";
    const paceMinPerKm = 16.6667 / speedMps;
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const totalDistance =
    activities.reduce(
      (sum: number, a: { distance: number }) => sum + a.distance,
      0
    ) / 1000;
  const totalTime = activities.reduce(
    (sum: number, a: { moving_time: number }) => sum + a.moving_time,
    0
  );

  return (
    <div className="p-10 max-w-7xl mx-auto min-h-screen">
      <header className="rounded-lg border border-[#fc4c02] p-6 flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <img
            src={athlete.profile}
            alt="Profile"
            className="rounded-full w-16 h-16"
          />
          <div>
            <h1 className="text-black">
              {athlete.firstname} {athlete.lastname}
            </h1>
            <p className="text-gray-700 italic">
              {athlete.city}, {athlete.country}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="py-2 px-4 bg-red-500 rounded-sm text-white hover:bg-red-600 transition-colors duration-300 cursor-pointer"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </header>

      <div className="flex gap-6 justify-between">
        <div className="w-full text-center border border-[#fc4c02] rounded-lg p-6 ">
          <div className="text-4xl text-[#fc4c02] font-bold">
            {activities.length}
          </div>
          <div className="mt-5 text-black">Total Runs</div>
        </div>
        <div className="w-full text-center border border-[#fc4c02] rounded-lg p-6">
          <div className="text-4xl text-[#fc4c02] font-bold">
            {totalDistance.toFixed(0)}
          </div>
          <div className="mt-5 text-black">Total KM</div>
        </div>
        <div className="w-full text-center border border-[#fc4c02] rounded-lg p-6">
          <div className="text-4xl text-[#fc4c02] font-bold">
            {Math.round(totalTime / 3600)}
          </div>
          <div className="mt-5 text-black">Total Hours</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
