import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { UserRegisterData } from "../../types";
import { formValidations } from "../../hooks/formValidations";
import { useMemo, useState } from "react";
import { startCreatingUserWithEmailPassword, store } from "../../store";
import { useAppSelector } from "../../store/hooks";

const initialRegisterState: UserRegisterData = {
  email: "",
  password: "",
  displayName: "",
};

export const RegisterPage = (): JSX.Element => {
  const { dispatch } = store;

  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

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

    if (!isFormValid) return;

    await dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
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
            <Grid item xs={12} display={errorMessage ? "" : "none"}>
              <Alert security="error"> {errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
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
