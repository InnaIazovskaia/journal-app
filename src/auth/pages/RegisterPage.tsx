import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { UserRegisterData } from "../../types";
import { formValidations } from "../../hooks/formValidations";
import { useState } from "react";

export const RegisterPage = (): JSX.Element => {
  const initialRegisterState: UserRegisterData = {
    email: "",
    password: "",
    displayName: "",
  };

  const [formSubmited, setFormSubmited] = useState(false);

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValidation,
    emailValidation,
    passwordValidation,
  } = useForm(initialRegisterState, formValidations);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);
  };

  return (
    <AuthLayout title="Register">
      <h1>FormValid {isFormValid ? "Valid" : "Incorrect"}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Username"
              type="text"
              placeholder="Username"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={Boolean(displayNameValidation) && formSubmited}
              helperText={displayNameValidation}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@googl.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={Boolean(emailValidation) && formSubmited}
              helperText={emailValidation}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={Boolean(passwordValidation) && formSubmited}
              helperText={passwordValidation}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}> Already a member? </Typography>
            <Link component={RouterLink} color="#f91f6d" to="/auth/login">
              Log in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
