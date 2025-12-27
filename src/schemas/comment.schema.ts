import { z } from "zod";

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
