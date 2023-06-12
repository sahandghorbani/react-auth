import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { LoginFormProps } from "../../types/ITypes";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";

type userForm = {
  username: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading  , message}) => {
  // const succeed = useSelector((state:any) => state.AuthSlice.message);
  const {
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<userForm>({ mode: "onChange" });

  const navigate = useNavigate();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     onSubmit(getValues()['username'] , getValues()['password']);
  };
  useEffect(() => {
    if (message === "Success") {
      reset();
      navigate("/");
    }
  }, [message, reset]);

  return (
    <Container maxWidth="lg">
      <form onSubmit={onFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              error={Boolean(errors.username?.message)}
              helperText={
                Boolean(errors.username?.message) && errors.username?.message
              }
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters long",
                },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              error={Boolean(errors.password?.message)}
              helperText={
                Boolean(errors.password?.message) && errors.password?.message
              }
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /(?=.*[a-zA-Z])(?=.*[0-9])/,
                  message: "Password must include both letters and numbers",
                },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>

    </Container>
  );
};

export default LoginForm;
