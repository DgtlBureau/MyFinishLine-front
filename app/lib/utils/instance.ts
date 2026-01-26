import axios from "axios";

const baseURL = "https://dev.myfinishline.io/back/api";
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
