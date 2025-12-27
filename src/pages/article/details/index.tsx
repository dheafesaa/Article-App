import ArticleContent from "@/components/organisms/ArticleContent";
import ArticleMeta from "@/components/organisms/ArticleMeta";
import CommentSection from "@/components/organisms/CommentSection";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteArticleMutation,
  useGetArticleByDocumentIdQuery,
} from "@/services/article/article.api";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByArticleQuery,
  useUpdateCommentMutation,
} from "@/services/comment/comment.api";
import { CTAButtonSx } from "@/theme/button.customize";
import { articleCTASx, articleToolbarSx } from "@/theme/toolbar.customize";
import { formatDate } from "@/utils/formatDate";
import ArticleDialog from "@/components/molecules/ArticleDialog";

const DetailsArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const [openDelete, setOpenDelete] = useState(false);

  const [deleteArticle, { isLoading: deletingArticle }] =
    useDeleteArticleMutation();

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle({ documentId: documentId! }).unwrap();

      dispatch(
        showSnackbar({
          message: "Article deleted successfully",
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
        <Box sx={articleToolbarSx}>
          <Typography variant="h3">{article.title}</Typography>
          <Box sx={articleCTASx}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDelete(true)}
              sx={CTAButtonSx}
            >
              Delete
            </Button>
            <Button
              component={NavLink}
              variant="contained"
              type="submit"
              to={`/article/edit/${documentId}`}
              sx={CTAButtonSx}
            >
              Edit
            </Button>
          </Box>
        </Box>
        <ArticleMeta
          authorName={article.documentId}
          publishedAt={formatDate(article.publishedAt)}
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
      <ArticleDialog
        open={openDelete}
        title="Delete Article"
        description="Are you sure you want to delete this article? This action cannot be undone."
        confirmText="Delete"
        loading={deletingArticle}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteArticle}
      />
    </Container>
  );
};

export default DetailsArticle;
