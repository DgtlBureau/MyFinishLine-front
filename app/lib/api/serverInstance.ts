import axios from "axios";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseSuccessInterceptor,
  responseErrorInterceptor,
} from "./interceptors/errorInterceptor";
import { setupRetryInterceptor } from "./interceptors/retryInterceptor";

const baseURL =
  process.env.BACKEND_URL || "https://dev.myfinishline.io/back/api";

const serverInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

serverInstance.interceptors.request.use(
  requestInterceptor,
  requestErrorInterceptor
);

setupRetryInterceptor(serverInstance, {
  retries: 2,
  retryDelay: 500,
});

serverInstance.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor
);

export const paddleInstance = axios.create({
  baseURL: "https://api.paddle.com/v2",
  timeout: 30000,
});

export default serverInstance;
