import { z } from "zod";

/* ================= ARTICLE ================= */

export const ArticleSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
  cover_image_url: z.string().url(),
  publishedAt: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const ArticleDetailResponseSchema = z.object({
  data: ArticleSchema,
  meta: z.object({}).optional(),
});

/* ================= COMMENTS ================= */

export const CommentSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  publishedAt: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;

export const CommentListResponseSchema = z.object({
  data: z.array(CommentSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
});
