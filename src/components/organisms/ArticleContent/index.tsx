import { Box, Typography, Stack } from "@mui/material";

interface ArticleContentProps {
  image: string;
  imageAlt?: string;
  content: string;
}

const ArticleContent = ({
  image,
  imageAlt = "Article cover",
  content,
}: ArticleContentProps) => {
  return (
    <Stack spacing={4}>
      <Box
        component="img"
        src={image}
        alt={imageAlt}
        sx={{
          width: "100%",
          maxHeight: { xs: 300, sm: 450, md: 600 },
          objectFit: "cover",
          borderRadius: 1.5,
        }}
      />
      <Typography>{content}</Typography>
    </Stack>
  );
};

export default ArticleContent;
