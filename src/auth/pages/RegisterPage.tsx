import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = (): JSX.Element => (
  <AuthLayout title="Register">
    <form>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            type="text"
            placeholder="Username"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            placeholder="email@googl.com"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Password"
            type="password"
            placeholder="Password"
            fullWidth
          />
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
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
