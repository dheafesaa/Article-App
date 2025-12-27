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
  path = "/article/new",
}: ArticleToolbarProps) => {
  return (
    <Box sx={articleToolbarSx}>
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <CategoryTabs
          categories={categories}
          activeId={activeId}
          onChange={onCategoryChange}
        />
      </Box>
      <Box sx={{ flexShrink: 0 }}>
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
    </Box>
  );
};

export default ArticleToolbar;
