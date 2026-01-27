export interface IUser {
  avatar_url: string | null;
  country: string | null;
  created_at: string;
  email: string;
  first_name: string;
  full_avatar_url: string | null;
  has_activated_code: boolean | null;
  id: number | null;
  last_name: string;
  phone: string;
  available_onboarding: boolean;
  strava_id: string | null;
  total_activities_count: number;
  total_distance: number;
  total_moving_time_hours: number;
  updated_at: string;
  username: string;
  has_strava_connect: boolean;
  has_fitbit_connect: boolean;
  avatar_symbol: string | null;
  avatar_color: string;
  selected_skin?: { id: number; image_url: string } | null;
  selected_frame?: { id: number; image_url: string } | null;
  selected_banner?: { id: number; image_url: string } | null;
  sex: string;
  birth_date: {
    year: number;
    month: number;
    day: number;
  };
  measure: "km" | "mile";
  total_distance_mile?: number;
}
