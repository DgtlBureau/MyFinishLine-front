export enum ApiErrorType {
  NETWORK = "NETWORK_ERROR",
  TIMEOUT = "TIMEOUT_ERROR",
  AUTH = "AUTH_ERROR",
  VALIDATION = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND_ERROR",
  SERVER = "SERVER_ERROR",
  UNKNOWN = "UNKNOWN_ERROR",
}

export interface ApiErrorDetails {
  type: ApiErrorType;
  message: string;
  status?: number;
  originalError?: unknown;
  validationErrors?: Record<string, string[]>;
}

export class ApiError extends Error {
  public readonly type: ApiErrorType;
  public readonly status?: number;
  public readonly originalError?: unknown;
  public readonly validationErrors?: Record<string, string[]>;

  constructor(details: ApiErrorDetails) {
    super(details.message);
    this.name = "ApiError";
    this.type = details.type;
    this.status = details.status;
    this.originalError = details.originalError;
    this.validationErrors = details.validationErrors;
  }

  get isNetworkError(): boolean {
    return this.type === ApiErrorType.NETWORK;
  }

  get isAuthError(): boolean {
    return this.type === ApiErrorType.AUTH;
  }

  get isValidationError(): boolean {
    return this.type === ApiErrorType.VALIDATION;
  }

  get isServerError(): boolean {
    return this.type === ApiErrorType.SERVER;
  }

  get isNotFound(): boolean {
    return this.type === ApiErrorType.NOT_FOUND;
  }
}
