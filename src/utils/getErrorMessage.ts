import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ApiErrorResponse {
  message?: string;
}

export const getErrorMessage = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    const data = error.data as ApiErrorResponse | undefined;
    if (data?.message) {
      return data.message;
    }
  }

  return "Something went wrong. Please try again.";
};

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === "object" && error !== null && "status" in error;
};
