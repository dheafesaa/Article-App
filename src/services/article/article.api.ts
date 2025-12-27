import { api } from "@/store/api";
import type {
  ArticleDetailResponse,
  ArticleListResponse,
  ArticleRequest,
} from "@/types/article.types";

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
        const params = new URLSearchParams();
        params.append("pagination[page]", String(page));
        params.append("pagination[pageSize]", String(pageSize));
        params.append("populate", "*");
        params.append("sort", "publishedAt:desc");
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
    getArticleByDocumentId: builder.query<ArticleDetailResponse, string>({
      query: (documentId) => ({
        url: `/articles/${documentId}?populate=category`,
        method: "GET",
      }),
    }),
    createArticle: builder.mutation<ArticleDetailResponse, ArticleRequest>({
      query: (body) => ({
        url: "/articles",
        method: "POST",
        body: {
          data: body,
        },
      }),
    }),
    updateArticle: builder.mutation<
      ArticleDetailResponse,
      { documentId: string; data: ArticleRequest }
    >({
      query: ({ documentId, data }) => ({
        url: `/articles/${documentId}`,
        method: "PUT",
        body: {
          data,
        },
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByDocumentIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} = articleApi;
