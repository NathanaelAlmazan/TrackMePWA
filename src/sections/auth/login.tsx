import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { login } from '../../redux';
import { useAppDispatch, useRouter } from '../../hooks';

import { bgGradient } from '../../theme/css';

import { Logo, Iconify } from '../../components';

import { useLazyQuery } from '@apollo/client';
import { LOGIN_OFFICER } from '../../graphql/users';
import { Role } from '../../__generated__/graphql';

// ----------------------------------------------------------------------

interface OfficerInput {
    firstName: string;
    lastName: string;
    password: string;
};

const formDefaults = {
    firstName: '',
    lastName: '',
    password: ''
}

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<OfficerInput>(formDefaults);

  const { firstName, lastName, password } = formData;

  const [loginOfficer, { error: loginError }] = useLazyQuery(LOGIN_OFFICER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const officer = await loginOfficer({
        variables: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            password: password
        }
    });

    if (officer.data && officer.data.loginOfficer) {
      dispatch(login({
        uuid: officer.data.loginOfficer.uuid,
        firstName: officer.data.loginOfficer.firstName,
        lastName: officer.data.loginOfficer.lastName,
        role: officer.data.loginOfficer.position?.role,
        office: officer.data.loginOfficer.office?.id,
        position: officer.data.loginOfficer.position?.label,
        avatar: officer.data.loginOfficer.avatar
      }));

      const role = officer.data.loginOfficer.position?.role || Role.Officer;

      if (!officer.data.loginOfficer.verified) router.push(`/verify/${officer.data.loginOfficer.uuid}`);
      else if ([Role.Superuser, Role.Director].includes(role)) router.push('/dashboard');
      else router.push('/calendar');
    }
    else setError("Wrong credentials or account is inactive.");

    setFormData(formDefaults); // reset form
  }

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.5),
          imgUrl: '/assets/background/overlay_5.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">SIGN IN</Typography>

          <Typography variant="body2" sx={{ my: 2 }}>
            Don't have an account?
            <Link href='/register' variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }}>
                Sign up
            </Link>
          </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ mb: 2 }}>
                    <TextField 
                        name="firstName" 
                        label="First Name" 
                        value={firstName} 
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField 
                        name="lastName" 
                        label="Last Name" 
                        value={lastName} 
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password} 
                        onChange={handleChange}
                        required
                        fullWidth
                        inputProps={{ minLength: 8 }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                  <Link href='/password' variant="subtitle2" underline="hover">
                    Forgot password?
                  </Link>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
                  {(loginError?.message || error) && (
                    <Typography variant="body2" align='center' color="error">
                      {loginError?.message || error}
                    </Typography>
                  )}
                </Stack>

                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                >
                    Sign in
                </Button>
            </form>
        </Card>
      </Stack>
    </Box>
  );
}