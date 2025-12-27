import TextField from "@/components/atoms/TextField";
import TextArea from "@/components/atoms/TextArea";
import CategorySelect from "@/components/molecules/CategorySelect";
import {
  Container,
  FormControl,
  FormLabel,
  Stack,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { CTAButtonSx, CTAButtonTextSx } from "@/theme/button.customize";
import {
  createArticleSchema,
  type CreateArticleSchema,
} from "@/schemas/article.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import {
  useGetArticleByDocumentIdQuery,
  useUpdateArticleMutation,
} from "@/services/article/article.api";
import {
  useGetCategoriesQuery,
  useGetCategoryByDocumentIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/services/category/category.api";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useMemo } from "react";
import type { CategoryItem } from "@/components/molecules/CategoryDialog";
import { skipToken } from "@reduxjs/toolkit/query";

const EditArticle = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: articleRes, isLoading: articleLoading } =
    useGetArticleByDocumentIdQuery(documentId!, { skip: !documentId });

  const article = articleRes?.data;
  const categoryDocumentId = article?.category?.documentId;

  const { data: categoryDetail } = useGetCategoryByDocumentIdQuery(
    categoryDocumentId ?? skipToken
  );

  const {
    data: categoryRes,
    isLoading: categoryLoading,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const categories: CategoryItem[] = useMemo(
    () =>
      categoryRes?.data.map((c) => ({
        id: c.documentId,
        name: c.name,
      })) ?? [],
    [categoryRes?.data]
  );

  const [createCategory, { isLoading: creatingCategory }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: updatingCategory }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deletingCategory }] =
    useDeleteCategoryMutation();

  const [updateArticle, { isLoading: updatingArticle }] =
    useUpdateArticleMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateArticleSchema>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      cover_image_url: "",
      category: "",
    },
  });

  const selectedCategoryId = useWatch({
    control,
    name: "category",
  });

  const selectedCategory = useMemo(() => {
    if (!selectedCategoryId) return null;
    return categories.find((c) => c.id === selectedCategoryId) ?? null;
  }, [selectedCategoryId, categories]);

  useEffect(() => {
    if (!article) return;
    if (!categoryDetail) return;

    reset({
      title: article.title,
      description: article.description,
      cover_image_url: article.cover_image_url,
      category: categoryDetail.data.documentId,
    });
  }, [article, categoryDetail, reset]);

  const onSubmit = async (values: CreateArticleSchema) => {
    try {
      await updateArticle({
        documentId: documentId!,
        data: {
          title: values.title,
          description: values.description,
          cover_image_url: values.cover_image_url,
          category: {
            connect: [values.category],
          },
        },
      }).unwrap();
      dispatch(
        showSnackbar({
          message: "Article updated successfully",
          severity: "success",
          context: "main",
        })
      );
      navigate("/article", { replace: true });
    } catch (err) {
      dispatch(
        showSnackbar({
          message: getErrorMessage(err),
          severity: "error",
          context: "main",
        })
      );
    }
  };

  if (articleLoading || categoryLoading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack
        component="form"
        spacing={3}
        py={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={CTAButtonTextSx}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            loading={updatingArticle}
            sx={CTAButtonSx}
          >
            Update
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <FormLabel>Title</FormLabel>
              <TextField
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <FormLabel>Category</FormLabel>
              <CategorySelect
                value={selectedCategory}
                options={categories}
                loading={
                  creatingCategory || updatingCategory || deletingCategory
                }
                error={!!errors.category}
                helperText={errors.category?.message}
                onChange={(v) =>
                  setValue("category", v?.id ?? "", { shouldValidate: true })
                }
                onCreate={async (name) => {
                  const res = await createCategory({ name }).unwrap();
                  await refetchCategories();
                  setValue("category", res.data.documentId, {
                    shouldValidate: true,
                  });
                }}
                onUpdate={async (category) => {
                  await updateCategory({
                    documentId: category.id,
                    name: category.name,
                  }).unwrap();
                  await refetchCategories();
                  setValue("category", category.id, {
                    shouldValidate: true,
                  });
                }}
                onDelete={async (docId) => {
                  await deleteCategory({ documentId: docId }).unwrap();
                  await refetchCategories();
                  if (selectedCategoryId === docId) {
                    setValue("category", "", { shouldValidate: true });
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <FormLabel>Cover Image</FormLabel>
          <TextField
            {...register("cover_image_url")}
            error={!!errors.cover_image_url}
            helperText={errors.cover_image_url?.message}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Description</FormLabel>
          <TextArea
            {...register("description")}
            minRows={10}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </FormControl>
      </Stack>
    </Container>
  );
};

export default EditArticle;
