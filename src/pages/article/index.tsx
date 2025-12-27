import Heading from "@/components/molecules/Heading";
import RoundedPagination from "@/components/molecules/RoundedPagination";
import { SearchInput } from "@/components/molecules/SearchInput";
import ArticleList from "@/components/organisms/ArticleList";
import { CircularProgress, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ArticleToolbar from "@/components/organisms/ArticleToolbar";
import { useDispatch } from "react-redux";
import { useGetArticlesQuery } from "@/services/article/article.api";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";

const categories = [
  { id: "all", label: "All Categories" },
  { id: "villages", label: "Villages" },
  { id: "bandung", label: "Travel Bandung" },
  { id: "bogor", label: "Wisata Bogor" },
];

const Article = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useGetArticlesQuery(
    {
      page,
      pageSize: 10,
      search: query || undefined,
      category: active !== "all" ? active : undefined,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isError && error) {
      dispatch(
        showSnackbar({
          message: getErrorMessage(error),
          severity: "error",
          context: "main",
        })
      );
    }
  }, [isError, error, dispatch]);

  const pagination = data?.meta.pagination;

  return (
    <Container maxWidth="lg">
      <Stack gap={4}>
        <Stack>
          <Heading
            title="Stories From Every Place"
            description="Travel stories made from places moments and words worth keeping."
          />
          <SearchInput
            value={query}
            onChange={(val) => {
              setQuery(val);
              setPage(1);
            }}
          />
        </Stack>
        <ArticleToolbar
          categories={categories}
          activeId={active}
          labelButton="Create Story"
          onCategoryChange={(id) => {
            setActive(id);
            setPage(1);
          }}
        />
        {isLoading ? (
          <Stack alignItems="center" py={6}>
            <CircularProgress />
          </Stack>
        ) : (
          <ArticleList
            items={
              data?.data.map((item) => ({
                image: item.cover_image_url,
                title: item.title,
                documentId: item.documentId,
                description: item.description,
                publishedAt: item.publishedAt,
                commentCount: item.comments.length,
              })) ?? []
            }
          />
        )}

        {pagination && pagination.pageCount > 1 && (
          <RoundedPagination
            page={pagination.page}
            count={pagination.pageCount}
            onChange={setPage}
          />
        )}
      </Stack>
    </Container>
  );
};

export default Article;
