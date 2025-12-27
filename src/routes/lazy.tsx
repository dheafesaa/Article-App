import { lazy } from "react";

export const HomePage = lazy(() => import("@/pages/home"));
export const ProfilePage = lazy(() => import("@/pages/profile"));
export const SignInPage = lazy(() => import("@/pages/auth/signin"));
export const SignUpPage = lazy(() => import("@/pages/auth/signup"));
export const ArticlePage = lazy(() => import("@/pages/article"));
export const CreateArticlePage = lazy(() => import("@/pages/article/add"));
export const DetailsArticlePage = lazy(() => import("@/pages/article/details"));
export const EditArticlePage = lazy(() => import("@/pages/article/edit"));
