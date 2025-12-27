import { api } from "@/store/api";
import type { SignInRequest, SignInResponse } from "@/types/auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: ({ identifier, password }) => ({
        url: "/auth/local",
        method: "POST",
        body: new URLSearchParams({
          identifier,
          password,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
