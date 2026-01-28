"use client";

import { ApiError, ApiErrorType } from "@/app/lib/api";
import { RefreshCw, WifiOff, ShieldX, ServerCrash, Clock } from "lucide-react";

interface ApiErrorFallbackProps {
  error: Error | ApiError;
  resetErrorBoundary?: () => void;
  onRetry?: () => void;
}

const ApiErrorFallback = ({
  error,
  resetErrorBoundary,
  onRetry,
}: ApiErrorFallbackProps) => {
  const getErrorConfig = () => {
    if (error instanceof ApiError) {
      switch (error.type) {
        case ApiErrorType.NETWORK:
          return {
            icon: WifiOff,
            title: "No Connection",
            message: "Check your internet connection and try again.",
            color: "text-orange-500",
            bgColor: "bg-orange-100",
          };
        case ApiErrorType.AUTH:
          return {
            icon: ShieldX,
            title: "Session Expired",
            message: "Please log in again to continue.",
            color: "text-red-500",
            bgColor: "bg-red-100",
          };
        case ApiErrorType.SERVER:
          return {
            icon: ServerCrash,
            title: "Server Error",
            message: "Something went wrong on our end. Try again later.",
            color: "text-blue-500",
            bgColor: "bg-blue-100",
          };
        case ApiErrorType.TIMEOUT:
          return {
            icon: Clock,
            title: "Request Timeout",
            message: "The request took too long. Please try again.",
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
          };
        default:
          return {
            icon: RefreshCw,
            title: "Something Went Wrong",
            message: error.message || "An unexpected error occurred.",
            color: "text-gray-500",
            bgColor: "bg-gray-100",
          };
      }
    }

    return {
      icon: RefreshCw,
      title: "Error",
      message: error.message || "Something went wrong.",
      color: "text-gray-500",
      bgColor: "bg-gray-100",
    };
  };

  const config = getErrorConfig();
  const Icon = config.icon;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div
        className={`w-14 h-14 mb-4 rounded-full ${config.bgColor} flex items-center justify-center`}
      >
        <Icon className={`w-7 h-7 ${config.color}`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {config.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 max-w-xs">{config.message}</p>
      <button
        onClick={handleRetry}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
};

export default ApiErrorFallback;
