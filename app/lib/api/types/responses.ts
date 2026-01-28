export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface ApiListResponse<T> {
  data: T[];
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
  status?: number;
}
