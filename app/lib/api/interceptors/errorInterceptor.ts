import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiError, ApiErrorType } from "../types/errors";
import { ApiErrorResponse } from "../types/responses";

export const responseSuccessInterceptor = (
  response: AxiosResponse
): AxiosResponse => {
  return response;
};

export const responseErrorInterceptor = (
  error: AxiosError<ApiErrorResponse>
): Promise<never> => {
  if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
    throw new ApiError({
      type: ApiErrorType.TIMEOUT,
      message: "Request timed out. Please try again.",
      originalError: error,
    });
  }

  if (!error.response) {
    throw new ApiError({
      type: ApiErrorType.NETWORK,
      message: "Network error. Please check your connection.",
      originalError: error,
    });
  }

  const { status, data } = error.response;

  if (status === 401) {
    throw new ApiError({
      type: ApiErrorType.AUTH,
      message: data?.message || "Authentication required",
      status,
      originalError: error,
    });
  }

  if (status === 403) {
    throw new ApiError({
      type: ApiErrorType.AUTH,
      message: data?.message || "Access denied",
      status,
      originalError: error,
    });
  }

  if (status === 404) {
    throw new ApiError({
      type: ApiErrorType.NOT_FOUND,
      message: data?.message || "Resource not found",
      status,
      originalError: error,
    });
  }

  if (status === 422 || status === 400) {
    throw new ApiError({
      type: ApiErrorType.VALIDATION,
      message: data?.message || "Validation error",
      status,
      validationErrors: data?.errors,
      originalError: error,
    });
  }

  if (status >= 500) {
    throw new ApiError({
      type: ApiErrorType.SERVER,
      message: data?.message || "Server error. Please try again later.",
      status,
      originalError: error,
    });
  }

  throw new ApiError({
    type: ApiErrorType.UNKNOWN,
    message: data?.message || "An unexpected error occurred",
    status,
    originalError: error,
  });
};

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return config;
};

export const requestErrorInterceptor = (error: unknown): Promise<never> => {
  return Promise.reject(error);
};
