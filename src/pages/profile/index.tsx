import { Container, Stack } from "@mui/material";
import LetterAvatar from "@/components/atoms/Avatar";
import UserIdentity from "@/components/organisms/UserIdentify";

const Profile = () => {
  const user = {
    name: "Dhea Fesa Athallah",
    email: "dhea.fesaathallah@gmail.com",
    verified: true,
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={4} alignItems="center" py={3} flex={1}>
        <LetterAvatar name={user.name} />
        <UserIdentity
          name={user.name}
          email={user.email}
          verified={user.verified}
        />
      </Stack>
    </Container>
  );
};

export default Profile;
