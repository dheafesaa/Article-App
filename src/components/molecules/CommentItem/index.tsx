import { Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CommentEditor from "@/components/molecules/CommentEditor";
import Avatar from "@/components/atoms/Avatar";
import type { Comment } from "@/types/comment.types";
import { formatDate } from "@/utils/formatDate";

interface Props {
  comment: Comment;
  loadingSubmit?: boolean;
  loadingDelete?: boolean;
  onUpdate?: (documentId: string, value: string) => void;
  onDelete?: (documentId: string) => void;
}

const CommentItem = ({
  comment,
  loadingSubmit,
  loadingDelete,
  onUpdate,
  onDelete,
}: Props) => {
  const [editing, setEditing] = useState(false);

  return (
    <Stack spacing={2} py={3} borderBottom="1px solid" borderColor="divider">
      <Stack direction="row" spacing={2}>
        <Avatar name={comment.documentId} size={40} />
        <Stack spacing={0.5} flex={1}>
          <Typography fontWeight={600}>{comment.documentId}</Typography>
          <Typography variant="caption">
            {formatDate(comment.createdAt)}
          </Typography>
          {!editing ? (
            <Typography>{comment.content}</Typography>
          ) : (
            <CommentEditor
              initialValue={comment.content}
              loading={loadingSubmit}
              onSubmit={async (v) => {
                if (!onUpdate) return;
                await onUpdate(comment.documentId, v);
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
            <IconButton
              size="small"
              loading={loadingDelete}
              onClick={() => onDelete?.(comment.documentId)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default CommentItem;
