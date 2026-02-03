/**
 * Standard API Response wrapper
 * @template T - The type of the data field
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

/**
 * API Error response structure
 */
export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  details?: unknown;
}

/**
 * Paginated API Response
 * @template T - The type of items in the data array
 */
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}

/**
 * Generic list response (non-paginated)
 * @template T - The type of items in the array
 */
export interface ListResponse<T> {
  data: T[];
  count?: number;
}

/**
 * Success response with message
 */
export interface SuccessResponse {
  success: boolean;
  message: string;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  bearer_token: string;
  user: {
    id: number;
    email: string;
    name?: string;
    avatar?: string;
  };
}

/**
 * Generic API request params
 */
export interface ApiRequestParams {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Sorting options
 */
export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * Filter options
 */
export interface FilterOptions {
  [key: string]: string | number | boolean | string[] | number[] | undefined;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page?: number;
  per_page?: number;
  sort?: SortOptions;
  filters?: FilterOptions;
}
