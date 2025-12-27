import { api } from "@/store/api";
import type {
  SignInRequest,
  SignUpRequest,
  AuthResponse,
} from "@/types/auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInRequest>({
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
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: ({ username, email, password }) => ({
        url: "/auth/local/register",
        method: "POST",
        body: new URLSearchParams({
          username,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
