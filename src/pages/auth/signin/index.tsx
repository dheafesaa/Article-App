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
import { signInSchema } from "@/schemas/auth.schema";
import type { SignInSchema } from "@/schemas/auth.schema";
import ArticleAppLogo from "@/assets/article-app.png";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInSchema) => {
    console.log(data);
  };

  return (
    <Card sx={CardAuth}>
      <Logo src={ArticleAppLogo} name="Depscape" />
      <Typography variant="h3">Sign In</Typography>

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
          Sign in
        </Button>

        <Typography textAlign="center">
          Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
        </Typography>
      </Box>
    </Card>
  );
};

export default SignIn;
