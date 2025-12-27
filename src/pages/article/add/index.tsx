import TextField from "@/components/atoms/TextField";
import {
  Container,
  FormControl,
  FormLabel,
  Stack,
  Grid,
  Box,
  Button,
} from "@mui/material";
import ImageUpload from "@/components/molecules/ImageUpload";
import TextArea from "@/components/atoms/TextArea";
import { useState } from "react";
import CategorySelect from "@/components/molecules/CategorySelect";
import type { CategoryItem } from "@/components/molecules/CategoryDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { CTAButtonSx, CTAButtonTextSx } from "@/theme/button.customize";
const CreateArticle = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: "1", name: "Travel" },
    { id: "2", name: "Food" },
  ]);

  const handleCreate = (name: string) => {
    const newCategory = {
      id: crypto.randomUUID(),
      name,
    };
    setCategories((prev) => [...prev, newCategory]);
    setCategory(newCategory);
  };

  const handleUpdate = (updated: CategoryItem) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setCategory(updated);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setCategory(null);
  };

  return (
    <Container maxWidth="lg">
      <Stack component="form" noValidate spacing={3} py={4}>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={CTAButtonTextSx}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/article")}
            sx={CTAButtonSx}
          >
            Publish
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <TextField type="text" placeholder="Summertime" />
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <CategorySelect
                value={category}
                options={categories}
                onChange={setCategory}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl>
          <ImageUpload
            label="Cover Image"
            onChange={(file) => {
              console.log(file);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <TextArea placeholder="Write something" minRows={10} maxRows={16} />
        </FormControl>
      </Stack>
    </Container>
  );
};

export default CreateArticle;
