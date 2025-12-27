import ArticleContent from "@/components/organisms/ArticleContent";
import ArticleMeta from "@/components/organisms/ArticleMeta";
import CommentSection from "@/components/organisms/CommentSection";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetArticleByDocumentIdQuery } from "@/services/article/article.api";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByArticleQuery,
  useUpdateCommentMutation,
} from "@/services/comment/comment.api";

const DetailsArticle = () => {
  const dispatch = useDispatch();
  const { documentId } = useParams<{ documentId: string }>();

  const {
    data: articleRes,
    isLoading: articleLoading,
    isError: articleError,
    error: articleErr,
  } = useGetArticleByDocumentIdQuery(documentId!, {
    skip: !documentId,
  });

  const article = articleRes?.data;

  const {
    data: commentsRes,
    isError: commentsError,
    error: commentsErr,
    refetch: refetchComments,
  } = useGetCommentsByArticleQuery(
    { articleId: article?.id as number },
    {
      skip: !article?.id,
    }
  );

  const comments = commentsRes?.data ?? [];

  const [createComment, { isLoading: creatingComment }] =
    useCreateCommentMutation();

  const [updateComment, { isLoading: updatingComment }] =
    useUpdateCommentMutation();

  const [deleteComment, { isLoading: deletingComment }] =
    useDeleteCommentMutation();

  useEffect(() => {
    if (articleError && articleErr) {
      dispatch(
        showSnackbar({
          message: getErrorMessage(articleErr),
          severity: "error",
          context: "main",
        })
      );
    }

    if (commentsError && commentsErr) {
      dispatch(
        showSnackbar({
          message: getErrorMessage(commentsErr),
          severity: "error",
          context: "main",
        })
      );
    }
  }, [articleError, articleErr, commentsError, commentsErr, dispatch]);

  if (articleLoading) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" py={6}>
          <CircularProgress />
        </Stack>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" py={6}>
          Failed to load article
        </Stack>
      </Container>
    );
  }

  const handleCreateComment = async (value: string) => {
    try {
      await createComment({
        articleId: article.id,
        content: value,
      }).unwrap();

      refetchComments();

      dispatch(
        showSnackbar({
          message: "Comment added successfully",
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
  };

  const handleUpdateComment = async (documentId: string, value: string) => {
    try {
      await updateComment({
        documentId,
        content: value,
      }).unwrap();

      refetchComments();

      dispatch(
        showSnackbar({
          message: "Comment updated",
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
  };

  const handleDeleteComment = async (documentId: string) => {
    try {
      await deleteComment({ documentId }).unwrap();

      refetchComments();

      dispatch(
        showSnackbar({
          message: "Comment deleted",
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
  };

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
          loadingSubmit={creatingComment || updatingComment}
          loadingDelete={deletingComment}
          onCreate={handleCreateComment}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
        />
      </Stack>
    </Container>
  );
};

export default DetailsArticle;
