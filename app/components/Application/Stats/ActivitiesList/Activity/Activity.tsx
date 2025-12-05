import { IActivity } from "@/app/types";
import { MapPin, Clock, Gauge, Calendar, Route } from "lucide-react";

const handleConvertDistance = (distanceInMeters: number) => {
  if (!distanceInMeters) return "0 m";
  if (distanceInMeters >= 1000) {
    return `${(distanceInMeters / 1000).toFixed(2)} km`;
  }
  return `${distanceInMeters.toFixed(0)} m`;
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
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
  const location = [location_city, location_country].filter(Boolean).join(", ");

  return (
    <li className="group border border-border bg-card px-4 py-3 rounded-md hover:bg-accent transition-colors duration-150">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-medium text-foreground leading-snug">{name}</h3>
        <span className="text-xs font-medium text-background bg-foreground px-2 py-1 rounded shrink-0">
          {sport_type}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Route className="w-4 h-4 shrink-0" />
          <span className="text-foreground font-medium">
            {handleConvertDistance(distance)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 shrink-0" />
          <span className="text-foreground font-medium">
            {handleConvertTime(elapsed_time)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex gap-0.5">
            <Gauge className="w-4 h-4 shrink-0" />
            <span className="text-xs">/avg</span>
          </div>
          <span className="text-foreground font-medium">
            {(average_speed * 3.6).toFixed(1)} km/h
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4 shrink-0" />
          <span className="text-foreground font-medium">
            {handleConvertDate(start_date)}
          </span>
        </div>
      </div>

      {location && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm mt-3 pt-3 border-t border-border">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>{location}</span>
        </div>
      )}
    </li>
  );
};

export default Activity;
