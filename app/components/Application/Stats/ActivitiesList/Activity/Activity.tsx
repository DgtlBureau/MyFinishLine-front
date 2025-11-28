import { IActivity } from "@/app/types";

const handleConvertDistance = (distanceInMeters: number) => {
  if (!distanceInMeters) return "0m";
  if (distanceInMeters >= 1000) {
    return `${(distanceInMeters / 1000).toFixed(2)}km`;
  }
  if (distanceInMeters < 1000) {
    return `${distanceInMeters.toFixed(0)}m`;
  }
};

const handleConvertTime = (elapsedTimeInSeconds: number) => {
  if (!elapsedTimeInSeconds) return "--:--";
  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
  const seconds = elapsedTimeInSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const handleConvertDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const Activity = ({
  name,
  distance,
  elapsed_time,
  start_date,
  location_country,
  location_city,
  average_speed,
  sport_type,
}: IActivity) => {
  return (
    <div className="bg-background border-border border px-4 py-2 rounded grid grid-cols-2 gap-1 shadow-xl shadow-accent">
      <span>Name</span>
      <span className="text-right">{name}</span>
      <span>Distance</span>
      <span className="text-right">{handleConvertDistance(distance)}</span>
      <span>Average Speed</span>
      <span className="text-right">
        {(average_speed * 3.6).toFixed(2)} km/h
      </span>
      <span>Type</span>
      <span className="text-right">{sport_type}</span>
      <span>Start Date</span>
      <span className="text-right">{handleConvertDate(start_date)}</span>
      <span>Time</span>
      <span className="text-right">{handleConvertTime(elapsed_time)}</span>
      {location_city ||
        (location_country && (
          <>
            <span>Location</span>
            <span>
              {location_city}, {location_country}
            </span>
          </>
        ))}
    </div>
  );
};

export default Activity;
