import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import { HomePage, SignInPage, SignUpPage } from "./lazy";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import Article from "@/pages/article";
import Profile from "@/pages/profile";
import CreateArticle from "@/pages/article/add";
import DetailsArticle from "@/pages/article/details";

const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/*" element={<HomePage />} />
          <Route path="/article" element={<Article />} />
          <Route path="/article/new" element={<CreateArticle />} />
          <Route path="/article/:documentId" element={<DetailsArticle />} />
          <Route path="/profile" element={<Profile />} />
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
