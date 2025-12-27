import TextField from "@/components/atoms/TextField";
import {
  Container,
  FormControl,
  FormLabel,
  Stack,
  Grid,
  Box,
  Button,
} from "@mui/material";
import TextArea from "@/components/atoms/TextArea";
import CategorySelect from "@/components/molecules/CategorySelect";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { CTAButtonSx, CTAButtonTextSx } from "@/theme/button.customize";
import {
  createArticleSchema,
  type CreateArticleSchema,
} from "@/schemas/article.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useCreateArticleMutation } from "@/services/article/article.api";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { CategoryItem } from "@/components/molecules/CategoryDialog";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/services/category/category.api";
import { useMemo } from "react";

const CreateArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createArticle, { isLoading }] = useCreateArticleMutation();
  const {
    data: categoryRes,
    isLoading: categoryLoading,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const [createCategory, { isLoading: creatingCategory }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: updatingCategory }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deletingCategory }] =
    useDeleteCategoryMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateArticleSchema>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      category: "",
    },
  });

  const selectedCategoryId = useWatch({
    control,
    name: "category",
  });

  const categories: CategoryItem[] = useMemo(() => {
    return (
      categoryRes?.data.map((c) => ({
        id: c.documentId,
        name: c.name,
      })) ?? []
    );
  }, [categoryRes?.data]);

  const selectedCategory = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId) ?? null
    : null;

  const onSubmit = async (values: CreateArticleSchema) => {
    const payload = {
      ...values,
      category: Number(values.category),
    };

    try {
      await createArticle(payload).unwrap();
      dispatch(
        showSnackbar({
          message: "Article published successfully",
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

  return (
    <Container maxWidth="lg">
      <Stack
        component="form"
        noValidate
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
            loading={isLoading}
            sx={CTAButtonSx}
          >
            Publish
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <FormLabel>Title</FormLabel>
              <TextField
                placeholder="Summertime"
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
                  categoryLoading ||
                  creatingCategory ||
                  updatingCategory ||
                  deletingCategory
                }
                error={!!errors.category}
                helperText={errors.category?.message}
                onChange={(val) => {
                  setValue("category", val?.id ?? "", {
                    shouldValidate: true,
                  });
                }}
                onCreate={async (name) => {
                  try {
                    const res = await createCategory({ name }).unwrap();
                    setValue("category", res.data.documentId, {
                      shouldValidate: true,
                    });
                    await refetchCategories();
                    dispatch(
                      showSnackbar({
                        message: "Category created",
                        severity: "success",
                        context: "main",
                      })
                    );
                  } catch (err) {
                    dispatch(
                      showSnackbar({
                        message: getErrorMessage(err),
                        severity: "error",
                        context: "main",
                      })
                    );
                  }
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
                onDelete={async (documentId) => {
                  try {
                    await deleteCategory({ documentId }).unwrap();
                    await refetchCategories();
                    if (selectedCategoryId === documentId) {
                      setValue("category", "", { shouldValidate: true });
                    }
                    dispatch(
                      showSnackbar({
                        message: "Category deleted",
                        severity: "success",
                        context: "main",
                      })
                    );
                  } catch (err) {
                    dispatch(
                      showSnackbar({
                        message: getErrorMessage(err),
                        severity: "error",
                        context: "main",
                      })
                    );
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <FormLabel>Cover Image</FormLabel>
          <TextField
            placeholder="https://example.com/image.jpg"
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
            placeholder="Write something..."
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </FormControl>
      </Stack>
    </Container>
  );
};

export default CreateArticle;
