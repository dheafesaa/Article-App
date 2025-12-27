import { Stack, Typography, Box } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";
import Avatar from "@/components/atoms/Avatar";
import Tooltip from "@/components/atoms/Tooltip";

interface ArticleMetaProps {
  authorName: string;
  publishedAt: string;
  readTime: string;
  commentCount?: number;
}

const ArticleMeta = ({
  authorName,
  publishedAt,
  readTime,
  commentCount = 0,
}: ArticleMetaProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar name={authorName} size={44} />
        <Stack>
          <Typography fontWeight={600}>{authorName}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption">{publishedAt}</Typography>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "secondary.main",
              }}
            />
            <Typography variant="caption">{readTime}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title={`${commentCount} responses`}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CommentIcon fontSize="small" />
            <Typography variant="caption">{commentCount}</Typography>
          </Stack>
        </Tooltip>
        <Tooltip title="Linkedin">
          <LinkedInIcon fontSize="small" />
        </Tooltip>
        <Tooltip title="X">
          <XIcon fontSize="small" />
        </Tooltip>
        <Tooltip title="Facebook">
          <FacebookIcon fontSize="small" />
        </Tooltip>
        <Tooltip title="Link">
          <LinkIcon fontSize="small" />
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default ArticleMeta;
