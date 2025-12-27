import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import {
  ArticlePage,
  CreateArticlePage,
  DetailsArticlePage,
  EditArticlePage,
  HomePage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from "./lazy";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";

const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/*" element={<HomePage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/article/new" element={<CreateArticlePage />} />
          <Route path="/article/:documentId" element={<DetailsArticlePage />} />
          <Route
            path="/article/edit/:documentId"
            element={<EditArticlePage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
