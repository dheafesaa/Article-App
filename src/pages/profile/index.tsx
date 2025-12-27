import { CircularProgress, Container, Stack } from "@mui/material";
import LetterAvatar from "@/components/atoms/Avatar";
import UserIdentity from "@/components/organisms/UserIdentify";
import { useGetMeQuery } from "@/services/auth/auth.api";

const Profile = () => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" py={6}>
          <CircularProgress />
        </Stack>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth="lg">
        <Stack alignItems="center" py={6}>
          Failed to load profile
        </Stack>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg">
      <Stack spacing={3} alignItems="center" py={3} flex={1}>
        <LetterAvatar name={data.username} />
        <UserIdentity
          name={data.username}
          email={data.email}
          verified={data.confirmed}
        />
      </Stack>
    </Container>
  );
};

export default Profile;
