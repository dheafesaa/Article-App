import { Stack, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

interface UserIdentityProps {
  name: string;
  email: string;
  verified?: boolean;
}

const UserIdentity = ({ name, email, verified }: UserIdentityProps) => {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          {name}
        </Typography>
        {verified && (
          <VerifiedIcon fontSize="small" sx={{ color: "secondary.main" }} />
        )}
      </Stack>

      <Typography variant="body2" color="text.secondary">
        {email}
      </Typography>
    </Stack>
  );
};

export default UserIdentity;
