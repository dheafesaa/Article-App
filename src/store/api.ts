import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "@/services/auth/baseQueryWithAuth.api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});
