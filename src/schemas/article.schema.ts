import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  cover_image_url: z
    .string()
    .trim()
    .min(1, "Cover image URL is required")
    .refine((val) => /^https?:\/\/.+/i.test(val), {
      message: "Cover image must be a valid URL",
    }),
  category: z.string().min(1, "Category is required"),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;
