import { AxiosError, AxiosInstance } from "axios";

interface RetryConfig {
  retries: number;
  retryDelay: number;
  retryCondition?: (error: AxiosError) => boolean;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error: AxiosError) => {
    if (!error.response) {
      return true;
    }
    const status = error.response.status;
    return status === 408 || status === 429 || status >= 500;
  },
};

interface AxiosConfigWithRetry {
  __retryCount?: number;
  __retryConfig?: RetryConfig;
}

export const setupRetryInterceptor = (
  instance: AxiosInstance,
  config: Partial<RetryConfig> = {}
): void => {
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };

  instance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const axiosConfig = error.config as AxiosConfigWithRetry &
      typeof error.config;

    if (!axiosConfig) {
      return Promise.reject(error);
    }

    axiosConfig.__retryCount = axiosConfig.__retryCount || 0;
    axiosConfig.__retryConfig = axiosConfig.__retryConfig || retryConfig;

    const shouldRetry =
      axiosConfig.__retryCount < axiosConfig.__retryConfig.retries &&
      axiosConfig.__retryConfig.retryCondition?.(error);

    if (!shouldRetry) {
      return Promise.reject(error);
    }

    axiosConfig.__retryCount += 1;

    const delay =
      axiosConfig.__retryConfig.retryDelay *
      Math.pow(2, axiosConfig.__retryCount - 1);

    await new Promise((resolve) => setTimeout(resolve, delay));

    return instance(axiosConfig);
  });
};
