export const handleConvertDistance = (distanceInMeters: number) => {
  if (!distanceInMeters) return "0 m";
  if (distanceInMeters >= 1000) {
    return `${(distanceInMeters / 1000).toFixed(2)} km`;
  }
  return `${distanceInMeters.toFixed(0)} m`;
};

export const handleConvertTime = (
  elapsedTimeInSeconds: number,
  type: "hoursOnly" | "full" = "full"
) => {
  if (type === "hoursOnly") {
    if (!elapsedTimeInSeconds) return "0 h";
    const hours = (elapsedTimeInSeconds / 60).toFixed(1);
    return `${hours} h`;
  }
  if (!elapsedTimeInSeconds) return "--:--";
  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
  const seconds = elapsedTimeInSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const handleConvertTimeShort = (elapsedTimeInSeconds: number) => {
  if (!elapsedTimeInSeconds) return "0m";
  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const minutes = (elapsedTimeInSeconds % 3600) / 60;
  const parts = [];
  if (hours > 0)
    parts.push(`${hours}${minutes > 0 ? `.${Math.floor(minutes * 10)}` : ""}h`);
  else if (minutes > 0) parts.push(`${minutes.toFixed(1)}m`);
  else parts.push(`${elapsedTimeInSeconds}s`);
  return parts.join(" ");
};

export const handleConvertDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 24) {
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes <= 1 ? "just now" : `${diffMinutes} minutes ago`;
    }
    return `${diffHours} hours ago`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "yesterday";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const calculateHoursBetweenDates = (
  creationDate: string,
  completionDate: string
) => {
  const start = new Date(creationDate);
  const end = completionDate ? new Date(completionDate) : new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "";
  }

  const diffInMs = end.getTime() - start.getTime();

  const hours = diffInMs / (1000 * 60 * 60);

  return hours;
};
