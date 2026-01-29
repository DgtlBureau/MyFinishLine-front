import { MeasureUnit } from "@/app/types/user";

/**
 * Get the display label for distance unit
 */
export function getDistanceLabel(measure: MeasureUnit): string {
  return measure === "mile" ? "mi" : "km";
}

/**
 * Get the appropriate distance value based on measure unit
 */
export function getDistance(
  kmValue: number | string,
  mileValue: number | string,
  measure: MeasureUnit
): number {
  const value = measure === "mile" ? mileValue : kmValue;
  return typeof value === "string" ? parseFloat(value) : value;
}

/**
 * Format distance for display with unit label
 */
export function formatDistance(
  kmValue: number | string,
  mileValue: number | string,
  measure: MeasureUnit,
  decimals: number = 2
): string {
  const value = getDistance(kmValue, mileValue, measure);
  const label = getDistanceLabel(measure);
  return `${value.toFixed(decimals)} ${label}`;
}

/**
 * Format distance in meters/feet to km/miles for display
 */
export function formatDistanceFromMeters(
  metersValue: number,
  mileValue: number,
  measure: MeasureUnit,
  decimals: number = 2
): string {
  const value = measure === "mile" ? mileValue : metersValue / 1000;
  const label = getDistanceLabel(measure);
  return `${value.toFixed(decimals)} ${label}`;
}

/**
 * Get pace display (min/km or min/mi)
 */
export function formatPace(
  paceKm: number,
  paceMile: number,
  measure: MeasureUnit
): string {
  const pace = measure === "mile" ? paceMile : paceKm;
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace - minutes) * 60);
  const label = getDistanceLabel(measure);
  return `${minutes}:${seconds.toString().padStart(2, "0")} /${label}`;
}

/**
 * Get speed display (km/h or mph)
 */
export function formatSpeed(
  speedKm: number | string,
  speedMile: number | string,
  measure: MeasureUnit,
  decimals: number = 1
): string {
  const speed = measure === "mile"
    ? (typeof speedMile === "string" ? parseFloat(speedMile) : speedMile)
    : (typeof speedKm === "string" ? parseFloat(speedKm) : speedKm);
  const label = measure === "mile" ? "mph" : "km/h";
  return `${speed.toFixed(decimals)} ${label}`;
}
