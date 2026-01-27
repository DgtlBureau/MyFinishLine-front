"use client";

import StatBlock from "../../Shared/StatBlock/StatBlock";
import { useAppSelector } from "@/app/lib/hooks";
import { getDaysAndHours, getDistanceUnit } from "@/app/lib/utils/convertData";
import Image from "next/image";

interface IMapHeaderProps {
  challengeName: string;
  startDate: string;
  totalDistance: number;
  distance: string;
  totalDistanceMile?: number;
  distanceMile?: number;
}

const MapHeader = ({
  challengeName,
  startDate,
  totalDistance,
  distance,
  totalDistanceMile,
  distanceMile,
}: IMapHeaderProps) => {
  const { user } = useAppSelector((state) => state.user);
  const distanceUnit = getDistanceUnit(user.measure);
  const isMiles = user.measure === "mile";

  const displayTotalDistance = isMiles ? totalDistanceMile : totalDistance;
  const displayDistance = isMiles ? distanceMile : distance;

  const date = getDaysAndHours(startDate);

  return (
    <header className="fixed z-100 w-full ">
      <div className="max-w-2xl p-4 mx-auto w-full bg-linear-to-b from-[#C3B7E2] via-[#E9E0F6CC] via-60% to-transparent">
        <Image src="/images/logo-line.png" width={200} height={60} alt="Logo" />
        <div className="mt-3 flex justify-between items-center">
          <div>
            <h2 className="font-medium text-lg">{challengeName}</h2>
            <div className="mt-3 flex items gap-4">
              <StatBlock
                label="Total distance"
                value={`${Number(displayTotalDistance).toFixed(2)} ${distanceUnit} / ${Number(displayDistance).toFixed(2)} ${distanceUnit}`}
                reverse
              />
              <StatBlock label="Time on track" value={date} reverse />
            </div>
          </div>
          <div className="w-24 h-24 relative rounded-full flex items-center justify-center">
            {user.selected_frame?.image_url && (
              <Image
                className="w-24 h-24 absolute left-0 top-0"
                src={user.selected_frame?.image_url}
                width={96}
                height={96}
                alt="Frame"
              />
            )}
            {user.full_avatar_url ? (
              <Image
                className="w-20 h-20 rounded-full object-cover"
                src={user.full_avatar_url}
                width={80}
                height={80}
                alt="Avatar"
              />
            ) : (
              <div
                className="flex items-center justify-center w-20 h-20 rounded-full"
                style={{ backgroundColor: user?.avatar_color }}
              >
                <span className="font-bold text-3xl">{user.avatar_symbol}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MapHeader;
