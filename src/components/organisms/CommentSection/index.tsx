import { Box, Divider, Stack, Typography } from "@mui/material";
import CommentItem from "@/components/molecules/CommentItem";
import CommentEditor from "@/components/molecules/CommentEditor";
import type { ArticleComment } from "@/types/comments.types";

interface Props {
  comments: ArticleComment[];
  onCreate: (value: string) => void;
  onUpdate: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}

const CommentSection = ({ comments, onCreate, onUpdate, onDelete }: Props) => {
  return (
    <Stack spacing={4}>
      <Box py={3}>
        <Divider />
      </Box>
      <Typography>Responses ({comments.length})</Typography>
      <CommentEditor onSubmit={onCreate} />
      <Stack>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default CommentSection;
