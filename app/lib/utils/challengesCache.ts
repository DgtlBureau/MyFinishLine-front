import axios from "axios";

let cachedPromise: Promise<any[]> | null = null;

export function fetchChallengesList(): Promise<any[]> {
  if (!cachedPromise) {
    cachedPromise = axios
      .get("/api/challenges/list")
      .then(({ data }) => (Array.isArray(data) ? data : []))
      .catch(() => [] as any[])
      .finally(() => {
        // Allow refetch after 30 seconds
        setTimeout(() => {
          cachedPromise = null;
        }, 30000);
      });
  }
  return cachedPromise;
}
