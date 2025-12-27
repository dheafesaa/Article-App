import { Typography, Stack } from "@mui/material";

interface HeadingProps {
  title: string;
  description?: string;
  color?: string;
}

const Heading = ({ title, description, color }: HeadingProps) => {
  return (
    <Stack textAlign="center" alignItems="center" mx="auto" py={3} gap={2}>
      <Typography variant="h2" maxWidth={600} color={color}>
        {title}
      </Typography>
      <Typography maxWidth={550} color={color}>
        {description}
      </Typography>
    </Stack>
  );
};

export default Heading;
