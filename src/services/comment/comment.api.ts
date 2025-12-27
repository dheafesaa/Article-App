import { api } from "@/store/api";
import type { CommentListResponse, Comment } from "@/types/comment.types";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByArticle: builder.query<
      CommentListResponse,
      { articleId: number; page?: number; pageSize?: number }
    >({
      query: ({ articleId, page = 1, pageSize = 10 }) => {
        const params = new URLSearchParams({
          "pagination[page]": String(page),
          "pagination[pageSize]": String(pageSize),
          "filters[article][id][$eq]": String(articleId),
          sort: "createdAt:desc",
        });

        return {
          url: `/comments?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    createComment: builder.mutation<
      Comment,
      { content: string; articleId: number }
    >({
      query: ({ content, articleId }) => ({
        url: "/comments",
        method: "POST",
        body: {
          data: {
            content,
            article: articleId,
          },
        },
      }),
    }),
    updateComment: builder.mutation<
      void,
      { documentId: string; content: string }
    >({
      query: ({ documentId, content }) => ({
        url: `/comments/${documentId}`,
        method: "PUT",
        body: {
          data: {
            content,
          },
        },
      }),
    }),
    deleteComment: builder.mutation<void, { documentId: string }>({
      query: ({ documentId }) => ({
        url: `/comments/${documentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentsByArticleQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
