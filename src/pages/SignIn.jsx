import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import errorObserver from '../helpers/observers/ErrorObserver';
import { AuthModel } from '../helpers/models';
import { withoutAuth } from '../helpers/autoNavigation';
import { useAuthStore, useGlobalStore } from '../store';

function SignIn() {
  const navigate = useNavigate();
  const showAlert = useGlobalStore(state => state.showAlert);
  const signIn = useAuthStore(state => state.signIn);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    errorObserver.registerRefresh(setErrors);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new AuthModel(event.currentTarget);
    const hasErrors = form.signInValidate();
    if (hasErrors) {
      return;
    }
    const [isSuccess, error] = await signIn(form.data);
    if (isSuccess) {
      showAlert('success', 'You signed in successfully.');
    } else {
      setErrors({ common: error });
    }
  };

  return (
    <Container maxWidth="xs" className="pollus__container" sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errors.common && (
            <FormHelperText error>{errors.common}</FormHelperText>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link onClick={() => navigate('/sign_up')} variant="body2" className="pollus__link">
                Do not have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default withoutAuth(SignIn);
