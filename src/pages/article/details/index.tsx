import ArticleContent from "@/components/organisms/ArticleContent";
import ArticleMeta from "@/components/organisms/ArticleMeta";
import CommentSection from "@/components/organisms/CommentSection";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";
import type { ArticleComment } from "@/types/comments.types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetArticleByDocumentIdQuery } from "@/services/article/article.api";
const DetailsArticle = () => {
  const dispatch = useDispatch();
  const { documentId } = useParams<{ documentId: string }>();

  const { data, isLoading, isError, error } = useGetArticleByDocumentIdQuery(
    documentId!,
    { skip: !documentId }
  );

  const [comments, setComments] = useState<ArticleComment[]>([]);

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

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" py={6}>
          <CircularProgress />
        </Stack>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" py={6}>
          Failed to load details
        </Stack>
      </Container>
    );
  }

  const article = data.data;

  return (
    <Container maxWidth="lg">
      <Stack spacing={4} py={3}>
        <Typography variant="h3">{article.title}</Typography>
        <ArticleMeta
          authorName={article.documentId}
          publishedAt={article.publishedAt}
          commentCount={comments.length}
          readTime="5 min read"
        />
        <ArticleContent
          image={article.cover_image_url}
          content={article.description}
        />
        <CommentSection
          comments={comments}
          onCreate={(value) =>
            setComments((p) => [
              {
                id: crypto.randomUUID(),
                author: "Dhea Fesa Athallah",
                content: value,
                createdAt: new Date().toISOString(),
              },
              ...p,
            ])
          }
          onUpdate={(id, value) =>
            setComments((p) =>
              p.map((c) => (c.id === id ? { ...c, content: value } : c))
            )
          }
          onDelete={(id) => setComments((p) => p.filter((c) => c.id !== id))}
        />
      </Stack>
    </Container>
  );
};

export default DetailsArticle;
