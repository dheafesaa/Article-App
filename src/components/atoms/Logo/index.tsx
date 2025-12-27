import { Box, Typography, Link } from "@mui/material";

interface LogoProps {
  src: string;
  name: string;
  width?: number;
  height?: number;
}

const Logo = ({ src, name, width = 36, height = 36 }: LogoProps) => {
  return (
    <Link
      href="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={`${name} Logo`}
        sx={{
          height: height,
          width: width,
          display: "block",
        }}
      />
      <Typography variant="h4" component="span" color="secondary">
        {name}
      </Typography>
    </Link>
  );
};

export default Logo;
