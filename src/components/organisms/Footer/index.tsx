import { Box, Typography, Divider, Container } from "@mui/material";

interface FooterProps {
  brand?: string;
  year?: number;
}

const Footer = ({ brand = "Depscape", year }: FooterProps) => {
  return (
    <Box component="footer">
      <Divider />
      <Container maxWidth="lg">
        <Typography textAlign="center" py={3}>
          © {year ?? new Date().getFullYear()} {brand}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
