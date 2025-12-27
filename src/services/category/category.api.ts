import { api } from "@/store/api";
import type { Category, CategoryListResponse } from "@/types/category.types";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryListResponse, void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
    createCategory: builder.mutation<{ data: Category }, { name: string }>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body: {
          data: body,
        },
      }),
    }),
    updateCategory: builder.mutation<
      Category,
      { documentId: string; name: string }
    >({
      query: ({ documentId, name }) => ({
        url: `/categories/${documentId}`,
        method: "PUT",
        body: {
          data: {
            name,
          },
        },
      }),
    }),
    deleteCategory: builder.mutation<void, { documentId: string }>({
      query: ({ documentId }) => ({
        url: `/categories/${documentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
