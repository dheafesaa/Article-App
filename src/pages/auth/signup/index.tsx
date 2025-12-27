import Logo from "@/components/atoms/Logo";
import TextField from "@/components/atoms/TextField";
import { CardAuth } from "@/theme/card.customize";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Link,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/auth.schema";
import type { SignUpSchema } from "@/schemas/auth.schema";
import ArticleAppLogo from "@/assets/article-app.png";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpSchema) => {
    console.log(data);
  };

  return (
    <Card sx={CardAuth}>
      <Logo src={ArticleAppLogo} name="Depscape" />
      <Typography variant="h3">Sign Up</Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <FormControl>
          <FormLabel>Username</FormLabel>
          <TextField
            type="text"
            placeholder="John Doe"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <TextField
            type="email"
            placeholder="your@email.com"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextField
            type="password"
            placeholder="••••••"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </FormControl>

        <Button type="submit" fullWidth variant="contained">
          Sign up
        </Button>

        <Typography textAlign="center">
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </Typography>
      </Box>
    </Card>
  );
};

export default SignUp;
