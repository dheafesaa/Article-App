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
import { setAuth } from "@/services/auth/auth.slice";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "@/services/auth/auth.api";
import { showSnackbar } from "@/services/snackbar/snackbar.slice";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const res = await signUp(data).unwrap();
      localStorage.setItem("token", res.jwt);
      localStorage.setItem("user", JSON.stringify(res.user));

      dispatch(setAuth(res.user));

      dispatch(
        showSnackbar({
          message: "Account created successfully",
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
            isPassword
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
        >
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
