export interface IActivity {
  activity_date: string;
  activity_id: string;
  activity_name: string;
  activity_time: number;
  average_heart_rate: number | null;
  average_speed: string;
  created_at: string;
  from: string;
  id: number;
  max_heart_rate: number | null;
  max_speed: string;
  progress: string;
  sport_type: string;
  updated_at: string;
  user_id: number;
}

export interface IAthlete {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: "M" | "F";
  premium: boolean;
  summit: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
  friend: null;
  follower: null;
}
