import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
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
import { UserCredentials } from "../../types";
import {
  store,
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store";
import { useAppSelector } from "../../store/hooks";
import { useMemo } from "react";

const initialLoginState: UserCredentials = {
  email: "",
  password: "",
};

export const LoginPage = (): JSX.Element => {
  const { dispatch } = store;

  const { status, errorMessage } = useAppSelector((state) => state.auth);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const { email, password, onInputChange } = useForm(initialLoginState);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = async () => {
    await dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@googl.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
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
            />
          </Grid>

          <Grid container display={errorMessage ? "" : "none"} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="#f91f6d" to="/auth/register">
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
