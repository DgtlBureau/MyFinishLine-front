"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { ApiError, ApiErrorType } from "@/app/lib/api";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const error = this.state.error;
      let title = "Something went wrong";
      let message = "An unexpected error occurred. Please try again.";

      if (error instanceof ApiError) {
        switch (error.type) {
          case ApiErrorType.NETWORK:
            title = "Connection Error";
            message = "Please check your internet connection and try again.";
            break;
          case ApiErrorType.AUTH:
            title = "Authentication Error";
            message = "Your session has expired. Please log in again.";
            break;
          case ApiErrorType.SERVER:
            title = "Server Error";
            message = "Our servers are having issues. Please try again later.";
            break;
          case ApiErrorType.TIMEOUT:
            title = "Request Timeout";
            message = "The request took too long. Please try again.";
            break;
        }
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4 max-w-sm">{message}</p>
          <button
            onClick={this.handleRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
