import { Grid } from "@mui/material";
import ArticleItem, {
  type ArticleItemProps,
} from "@/components/molecules/ArticleItem";

interface ArticleListProps {
  items: ArticleItemProps[];
}

const ArticleList = ({ items }: ArticleListProps) => {
  return (
    <Grid container spacing={3}>
      {items.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <ArticleItem key={item.documentId} {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleList;
