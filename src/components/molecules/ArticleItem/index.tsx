import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import Tooltip from "@/components/atoms/Tooltip";
import { CardArticle } from "@/theme/card.customize";
import { useNavigate } from "react-router-dom";

export interface ArticleItemProps {
  image: string;
  documentId: string;
  title: string;
  description: string;
  publishedAt: string;
  commentCount?: number;
}

const ArticleItem = ({
  image,
  documentId,
  title,
  description,
  publishedAt,
  commentCount = 0,
}: ArticleItemProps) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/article/${documentId}`)} sx={CardArticle}>
      <CardMedia component="img" height={200} image={image} alt={title} />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="caption">{documentId}</Typography>
          <Typography variant="h4">{title}</Typography>
          <Typography noWrap>{description}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 3,
            }}
          >
            <Typography variant="caption">{publishedAt}</Typography>
            <Tooltip title={`${commentCount} responses`}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CommentIcon fontSize="small" />
                <Typography variant="caption">{commentCount}</Typography>
              </Stack>
            </Tooltip>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ArticleItem;
