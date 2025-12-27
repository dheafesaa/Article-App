import { Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CommentEditor from "@/components/molecules/CommentEditor";
import Avatar from "@/components/atoms/Avatar";
import type { ArticleComment } from "@/types/comments.types";

interface Props {
  comment: ArticleComment;
  onUpdate: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}

const CommentItem = ({ comment, onUpdate, onDelete }: Props) => {
  const [editing, setEditing] = useState(false);

  return (
    <Stack spacing={2} py={3} borderBottom="1px solid" borderColor="divider">
      <Stack direction="row" spacing={2}>
        <Avatar name={comment.author} size={40} />
        <Stack spacing={0.5} flex={1}>
          <Typography fontWeight={600}>{comment.author}</Typography>
          <Typography variant="caption">{comment.createdAt}</Typography>
          {!editing ? (
            <Typography>{comment.content}</Typography>
          ) : (
            <CommentEditor
              initialValue={comment.content}
              onSubmit={(v) => {
                onUpdate(comment.id, v);
                setEditing(false);
              }}
              onCancel={() => setEditing(false)}
            />
          )}
        </Stack>
        {!editing && (
          <Stack direction="row">
            <IconButton size="small" onClick={() => setEditing(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(comment.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default CommentItem;
