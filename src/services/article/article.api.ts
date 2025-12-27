import { api } from "@/store/api";
import type { ArticleListResponse } from "@/types/article.types";

export interface GetArticlesParams {
  page: number;
  pageSize: number;
  search?: string;
  category?: string;
}

export const articleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleListResponse, GetArticlesParams>({
      query: ({ page, pageSize, search, category }) => {
        const params = new URLSearchParams({
          "pagination[page]": String(page),
          "pagination[pageSize]": String(pageSize),
          populate: "*",
        });

        if (search) {
          params.append("filters[title][$containsi]", search);
        }

        if (category && category !== "all") {
          params.append("filters[category][documentId][$eq]", category);
        }

        return {
          url: `/articles?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetArticlesQuery } = articleApi;
