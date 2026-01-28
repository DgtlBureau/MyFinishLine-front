import axios from "axios";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseSuccessInterceptor,
  responseErrorInterceptor,
} from "./interceptors/errorInterceptor";
import { setupRetryInterceptor } from "./interceptors/retryInterceptor";

const apiClient = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

setupRetryInterceptor(apiClient, {
  retries: 3,
  retryDelay: 1000,
});

apiClient.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor
);

export default apiClient;
