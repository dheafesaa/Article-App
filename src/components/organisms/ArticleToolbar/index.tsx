import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import CategoryTabs from "@/components/molecules/CategoryTabs";
import { articleToolbarSx } from "@/theme/toolbar.customize";
import { articleButtonSx } from "@/theme/button.customize";

interface Category {
  id: string;
  label: string;
}

interface ArticleToolbarProps {
  categories: Category[];
  activeId?: string;
  onCategoryChange?: (id: string) => void;
  labelButton: string;
  path?: string;
}

const ArticleToolbar = ({
  categories,
  activeId,
  onCategoryChange,
  labelButton,
  path = "/new-article",
}: ArticleToolbarProps) => {
  return (
    <Box sx={articleToolbarSx}>
      <CategoryTabs
        categories={categories}
        activeId={activeId}
        onChange={onCategoryChange}
      />
      <Button
        component={NavLink}
        to={path}
        variant="contained"
        startIcon={<AddIcon />}
        sx={articleButtonSx}
      >
        {labelButton}
      </Button>
    </Box>
  );
};

export default ArticleToolbar;
