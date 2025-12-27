import { Stack, Chip } from "@mui/material";
import { categoryChipSx } from "@/theme/chip.customize";

interface Category {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeId?: string;
  onChange?: (id: string) => void;
}

const CategoryTabs = ({
  categories,
  activeId,
  onChange,
}: CategoryTabsProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {categories.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Chip
            key={item.id}
            label={item.label}
            clickable
            onClick={() => onChange?.(item.id)}
            sx={categoryChipSx(isActive)}
          />
        );
      })}
    </Stack>
  );
};

export default CategoryTabs;
