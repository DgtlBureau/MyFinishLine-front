import { NextResponse } from 'next/server';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode: number = 500, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * Standardized error response interface
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: unknown;
}

/**
 * Handles API errors and returns a standardized NextResponse
 *
 * @param error - The error object (can be ApiError, AxiosError, Error, or unknown)
 * @param context - Optional context string for logging/debugging
 * @returns NextResponse with standardized error format
 *
 * @example
 * try {
 *   // API logic
 * } catch (error) {
 *   return handleApiError(error, 'GET /api/user/profile');
 * }
 */
export function handleApiError(
  error: unknown,
  context?: string
): NextResponse<ApiErrorResponse> {
  // Log error for debugging (in development)
  if (process.env.NODE_ENV === 'development') {
    console.error(`[API Error]${context ? ` ${context}` : ''}:`, error);
  }

  // Handle ApiError instances
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.name,
        message: error.message,
        statusCode: error.statusCode,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }

  // Handle Axios errors (from backend API calls)
  if (isAxiosError(error)) {
    // Backend returned error response
    if (error.response) {
      const status = error.response.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const data = error.response.data as Record<string, unknown>;

      return NextResponse.json(
        {
          error: (data?.error as string) || 'Backend Error',
          message: (data?.message as string) || 'Request failed',
          statusCode: status,
          details: data,
        },
        { status }
      );
    }

    // Network errors (ECONNREFUSED, ENOTFOUND)
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return NextResponse.json(
        {
          error: 'Service Unavailable',
          message: 'Cannot connect to backend service',
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        },
        { status: HttpStatus.SERVICE_UNAVAILABLE }
      );
    }

    // Timeout errors
    if (error.code === 'ECONNABORTED') {
      return NextResponse.json(
        {
          error: 'Request Timeout',
          message: 'Request timeout. Please try again.',
          statusCode: 408,
        },
        { status: 408 }
      );
    }

    // Other network errors
    if (error.request) {
      return NextResponse.json(
        {
          error: 'Network Error',
          message: 'No response from server. Please check your connection.',
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        },
        { status: HttpStatus.SERVICE_UNAVAILABLE }
      );
    }
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  // Handle unknown error types
  return NextResponse.json(
    {
      error: 'Unknown Error',
      message: 'An unexpected error occurred',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      details: error,
    },
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}

/**
 * Type guard to check if error is an Axios error
 */
function isAxiosError(error: unknown): error is {
  response?: { status: number; data: unknown };
  request?: unknown;
  code?: string;
  message: string;
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('response' in error || 'request' in error || 'code' in error)
  );
}

/**
 * Creates a standardized success response
 *
 * @param data - Response data
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with data
 *
 * @example
 * return createSuccessResponse({ user: userData }, 200);
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): NextResponse<T> {
  return NextResponse.json(data, { status });
}

/**
 * Common HTTP status codes for API errors
 */
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
