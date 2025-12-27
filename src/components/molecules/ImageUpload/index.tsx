import { Box, Button, Typography, Stack } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useRef, useState, useEffect } from "react";
import { articleButtonSx } from "@/theme/button.customize";

interface ImageUploadProps {
  label?: string;
  onChange?: (file: File) => void;
  previewHeight?: number;
}

const ImageUpload = ({
  label = "Cover Image",
  onChange,
  previewHeight = 240,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const url = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreviewUrl(url);
    onChange?.(selectedFile);
  };

  const handlePreview = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank");
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Stack spacing={1}>
      <Typography>{label}</Typography>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelect}
      />
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          height: previewHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <ImageOutlinedIcon fontSize="large" />
          {file ? (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={handlePreview}
            >
              {file.name}
            </Typography>
          ) : (
            <Typography>No image selected</Typography>
          )}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => inputRef.current?.click()}
              sx={articleButtonSx}
            >
              {file ? "Change Image" : "Select Image"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ImageUpload;
