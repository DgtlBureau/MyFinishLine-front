import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/back/api`
  : process.env.BACKEND_URL || "https://myfinishline.io/back/api";
const paddleBaseUrl = "https://api.paddle.com/v2";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const paddleInstance = axios.create({
  baseURL: paddleBaseUrl,
});

export default instance;
