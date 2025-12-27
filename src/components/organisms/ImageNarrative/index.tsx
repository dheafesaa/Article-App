import { Box, Grid, Typography, Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

type NarrativeItem = {
  id: string | number;
  text: string;
};

interface ImageNarrativeProps {
  title: string;
  imageSrc: string;
  items: NarrativeItem[];
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
}));

const ImageNarrative = ({ title, imageSrc, items }: ImageNarrativeProps) => {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
        <Box
          component="img"
          src={imageSrc}
          alt={title}
          sx={{
            width: "100%",
            borderRadius: 1.5,
            objectFit: "cover",
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
        <Stack spacing={3}>
          <Typography variant="h2" textAlign="center" maxWidth={600}>
            {title}
          </Typography>
          {items.map((item, index) => (
            <Item key={item.id}>
              <Typography color="#FFF">
                {index + 1}. {item.text}
              </Typography>
            </Item>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ImageNarrative;
