export interface IUser {
  avatar_url: string | null;
  country: string | null;
  created_at: string;
  email: string;
  first_name: string;
  full_avatar_url: string | null;
  has_activated_code: boolean;
  id: number;
  last_name: string | null;
  phone: string | null;
  strava_id: string | null;
  total_activities_count: number;
  total_distance: number;
  total_moving_time_hours: number;
  updated_at: string;
  username: string;
}
