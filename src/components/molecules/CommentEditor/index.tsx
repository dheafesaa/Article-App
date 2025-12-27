import { Stack, Button } from "@mui/material";
import TextArea from "@/components/atoms/TextArea";
import { useState } from "react";
import { articleButtonSx } from "@/theme/button.customize";

interface Props {
  initialValue?: string;
  loading?: boolean;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
}

const CommentEditor = ({
  initialValue = "",
  loading = false,
  onSubmit,
  onCancel,
}: Props) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = () => {
    onSubmit(value.trim());
    setValue("");
  };

  return (
    <Stack spacing={2}>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minRows={5}
        placeholder="Write a response..."
      />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        {onCancel && (
          <Button variant="text" onClick={onCancel} sx={articleButtonSx}>
            Cancel
          </Button>
        )}
        <Button
          variant="contained"
          disabled={!value.trim()}
          loading={loading}
          onClick={handleSubmit}
          sx={articleButtonSx}
        >
          Respond
        </Button>
      </Stack>
    </Stack>
  );
};

export default CommentEditor;
