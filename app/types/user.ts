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
  strava_id: string | null;
  total_activities_count: number;
  total_distance: number;
  total_moving_time_hours: number;
  updated_at: string;
  username: string;
  has_strava_connect: boolean;
  avatar_symbol: string | null;
  avatar_color: string;
}
