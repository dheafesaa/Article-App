import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface BackendErrorShape {
  error?: {
    message?: string;
  };
}

export const getErrorMessage = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    const data = error.data as BackendErrorShape | undefined;
    return data?.error?.message ?? "Something went wrong. Please try again.";
  }

  return "Something went wrong. Please try again.";
};

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === "object" && error !== null && "status" in error;
};
