import { IUser } from "./types/user";

export interface IBackgroundImage {
  id: number;
  image_url: string;
  challenge_id: number;
}

export interface IStatus {
  id: number | null;
  name: string;
  type: string;
}

export interface IStory {
  id: number;
  image_url: string;
  title: string;
  content: string;
  challenge_step_id: string;
}

export interface IStep {
  challenge_id: number;
  completed: boolean;
  distance_by_next_step: string;
  distance_by_next_step_mile?: number;
  id: number;
  index: number;
  story: IStory[];
  user_distance: number;
  user_distance_mile?: number;
  user_distance_percent: number;
  x_coordinate: string;
  y_coordinate: string;
  active: boolean;
  title: string;
  next: boolean;
  distance_to_reach_step: string;
  distance_to_reach_step_mile?: number;
  user_distance_reach: string;
  user_distance_reach_mile?: number;
  is_viewed: boolean;
}

export interface IRoutePoint {
  x: number;
  y: number;
}

export interface IRoute {
  from_step_index: number;
  to_step_index: number;
  points: IRoutePoint[];
}

export interface IRouteData {
  version: number;
  routes: IRoute[];
  base_width: number;
  base_height: number;
}

export interface IActiveChallenge {
  background_images: IBackgroundImage[];
  description: string;
  id: number;
  name: string;
  status: IStatus;
  status_id: number;
  steps: IStep[];
  total_distance: string;
  total_distance_mile?: number;
  activate_date: string;
  user_distance: number;
  user_distance_mile?: number;
  is_completed: boolean;
  completed_at: string;
  image_url?: string | null;
  reward?: IReward;
  reward_ticket?: IRewardTicket;
  route_data?: IRouteData;
}

export interface IActivity {
  activity_date: string;
  activity_id: string;
  activity_name: string;
  activity_time: number;
  average_heart_rate: number | null;
  average_speed: string;
  average_speed_mile?: number;
  created_at: string;
  from: string;
  id: number;
  max_heart_rate: number | null;
  max_speed: string;
  max_speed_mile?: number;
  progress: string;
  progress_mile?: number;
  sport_type: string;
  updated_at: string;
  user_id: number;
  pace: number;
  pace_mile?: number;
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

export enum Currencies {
  EUR = "EUR",
  USD = "USD",
}

export enum CurrencieSymbols {
  EUR = "€",
  USD = "$",
}

type Currency = keyof typeof CurrencieSymbols;

export interface IPrice {
  amount: string;
  currency: Currency;
  stripe_price_id?: string;
  paddle_price_id: string;
}

// Product from landing page
export interface IProduct {
  name: string;
  description: string;
  main_image?: string;
  images: string;
  prices: IPrice;
  paddle_product_id: string;
  challenge_info?: IActiveChallenge;
  content: {
    id: number;
    title: string;
    image: string;
    paragraphs: { id: number; text: string }[];
  }[];
}

export interface IReward {
  id: number;
  challenge_id: number;
  name: string;
  description: string;
  image_url: string | null;
}

export interface IContract {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  type: string;
  badges: any[];
  banners: any[];
  frames: any[];
  skins: any[];
  end_date: null | string;
  reward_type: "badge" | "frame" | "skin" | "banner";
  is_completed: boolean;
  rare: {
    id: number;
    name: string;
    type: "common" | "legendary";
  };
}

export interface IRewardTicket {
  address: string;
  country: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  phone: string;
  reward_id: number;
  status: IShipmentStatus;
  status_id: number;
  user_id: number;
  zip_code: string;
}

export interface ILeaderboard {
  challenge_id: number;
  id: number;
  total_progress: string;
  total_progress_mile?: number;
  total_hours: string;
  user_id: number;
  user: IUser;
  position: number;
}

export interface IShipmentStatus extends Omit<IStatus, "type"> {
  type: ShipmentStatuses;
}

export enum ShipmentStatuses {
  created = "created",
  in_progress = "in_progress",
  on_the_way = "on_the_way",
  at_pickup_point = "at_pickup_point",
  received = "received",
}

export interface IWheelOption {
  label: string;
  value: string;
}
