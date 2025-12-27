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
import { useSignInMutation } from "@/services/auth/auth.api";
import { useDispatch } from "react-redux";
import { setAuth } from "@/services/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    try {
      const res = await signIn({
        identifier: data.email,
        password: data.password,
      }).unwrap();

      localStorage.setItem("token", res.jwt);
      localStorage.setItem("user", JSON.stringify(res.user));

      dispatch(setAuth(res.user));

      dispatch(
        showSnackbar({
          message: "Login successful",
          severity: "success",
          context: "main",
        })
      );

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    } catch (error: unknown) {
      dispatch(
        showSnackbar({
          message: getErrorMessage(error),
          severity: "error",
          context: "auth",
        })
      );
    }
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
            isPassword
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          loading={isLoading}
        >
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
