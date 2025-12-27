import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api",
  }),
  endpoints: () => ({}),
});
