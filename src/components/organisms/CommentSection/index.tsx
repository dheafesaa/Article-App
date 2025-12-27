import { Box, Divider, Stack, Typography } from "@mui/material";
import CommentItem from "@/components/molecules/CommentItem";
import CommentEditor from "@/components/molecules/CommentEditor";
import type { Comment } from "@/types/comment.types";

interface Props {
  comments: Comment[];
  loadingSubmit?: boolean;
  loadingDelete?: boolean;
  onCreate: (value: string) => void;
  onUpdate: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
}

const CommentSection = ({
  comments,
  loadingSubmit = false,
  loadingDelete = false,
  onCreate,
  onUpdate,
  onDelete,
}: Props) => {
  return (
    <Stack spacing={4}>
      <Box py={3}>
        <Divider />
      </Box>
      <Typography>Responses ({comments.length})</Typography>
      <CommentEditor onSubmit={onCreate} loading={loadingSubmit} />
      <Stack>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            loadingSubmit={loadingSubmit}
            loadingDelete={loadingDelete}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default CommentSection;
