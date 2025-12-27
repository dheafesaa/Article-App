import { z } from "zod";

/* ================= SIGN IN ================= */

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email format")),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

/* ================= SIGN UP ================= */

export const signUpSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email format")),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
