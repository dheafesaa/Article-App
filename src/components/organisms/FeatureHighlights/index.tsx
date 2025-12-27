import Heading from "@/components/molecules/Heading";
import { CardFeatures } from "@/theme/card.customize";
import { Box, Typography, Grid, Stack } from "@mui/material";

type FeatureItem = {
  id: string | number;
  title: string;
  description: string;
};

interface FeatureHighlightsProps {
  items: FeatureItem[];
}

const FeatureHighlights = ({ items }: FeatureHighlightsProps) => {
  return (
    <Box>
      <Heading title="Where Places Turn Into Stories" />
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack sx={CardFeatures}>
              <Typography variant="h4">{item.title}</Typography>
              <Typography>{item.description}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureHighlights;
