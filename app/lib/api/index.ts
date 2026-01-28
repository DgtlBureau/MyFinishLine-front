export { default as apiClient } from "./axiosInstance";
export { default as serverInstance, paddleInstance } from "./serverInstance";

export { ApiError, ApiErrorType } from "./types/errors";
export type { ApiErrorDetails } from "./types/errors";

export type {
  ApiResponse,
  ApiListResponse,
  ApiErrorResponse,
  PaginationMeta,
} from "./types/responses";
