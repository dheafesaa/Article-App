import { Avatar as AvatarMUI } from "@mui/material";

interface AvatarProps {
  name: string;
  size?: number;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Avatar = ({ name, size = 120 }: AvatarProps) => {
  return (
    <AvatarMUI
      sx={{
        width: size,
        height: size,
        bgcolor: "secondary.main",
        fontSize: size / 2.5,
        fontWeight: 600,
      }}
    >
      {getInitials(name)}
    </AvatarMUI>
  );
};

export default Avatar;
