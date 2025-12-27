import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "status" in error) {
    const fetchError = error as FetchBaseQueryError & {
      error?: {
        message?: string;
      };
    };

    if (fetchError.error?.message) {
      return fetchError.error.message;
    }
  }

  return "Something went wrong. Please try again.";
};
