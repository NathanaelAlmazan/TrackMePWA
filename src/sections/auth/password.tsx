import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '../../hooks';

import { bgGradient } from '../../theme/css';

import { Logo, Iconify } from '../../components';

import { useLazyQuery } from '@apollo/client';
import { CONFIRM_RESET_PASSWORD, REQUEST_RESET_PASSWORD } from '../../graphql/users';

// ----------------------------------------------------------------------
interface ResetPassword {
    email: string;
    phone: string;
    code: string;
    password: string;
}

const formDefaults = {
    email: '',
    phone: '',
    code: '',
    password: '',
}

export default function ResetPasswordView() {
  const theme = useTheme();

  const router = useRouter();

  const [error, setError] = useState<string>();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<ResetPassword>(formDefaults);

  const { email, phone, code, password } = formData;

  const [requestReset, { error: requestError }] = useLazyQuery(REQUEST_RESET_PASSWORD);
  const [confirmReset, { error: confirmError }] = useLazyQuery(CONFIRM_RESET_PASSWORD);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email && !phone) {
      setError("Please type your verified email or phone number.");
      return
    }

    requestReset({ variables: { email, phone } })
     .then(({ data }) => {
            if (data && data.requestResetPassword) {
                setConfirm(true);
            }
        })
     .catch((error) => {
        setError(error.message);
    });
  };

  const handleSubmitPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    confirmReset({ variables: { email, phone, code, password } })
    .then(({ data }) => {
           if (data && data.confirmResetPassword) {
               router.push('/login')
           }
       })
    .catch((error) => {
        setError(error.message);
    });
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
          <Typography variant="h4">RESET PASSWORD</Typography>

            {!confirm ? (
                <form onSubmit={handleSubmitRequest}>
                    <Stack spacing={2} sx={{ my: 3 }}>
                        <TextField 
                            name="email" 
                            label="Email" 
                            type="email"
                            value={email} 
                            onChange={handleChange}
                            fullWidth
                        />

                        <Divider>
                            <Chip label="OR" size="medium" />
                        </Divider>

                        <TextField 
                            name="phone" 
                            label="Phone" 
                            value={phone} 
                            onChange={handleChange}
                            inputProps={{ minLength: 10, maxLength: 10 }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">+63</InputAdornment>,
                            }}
                            fullWidth
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
                        {(requestError?.message || error) && (
                            <Typography variant="body2" align='center' color="error">
                                {requestError?.message || error}
                            </Typography>
                        )}
                    </Stack>

                    <Button
                        fullWidth
                        endIcon={<Iconify icon="mdi:arrow-right" />}
                        size="large"
                        type="submit"
                        variant="contained"
                        color="inherit"
                    >
                        Send Code
                    </Button>
                </form>
            ): (
                <form onSubmit={handleSubmitPassword}>
                    <Stack spacing={2} sx={{ my: 3 }}>
                        <TextField 
                            name="code" 
                            label="Code" 
                            value={code} 
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            name="password"
                            label="New Password"
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

                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
                        {(confirmError?.message || error) && (
                            <Typography variant="body2" align='center' color="error">
                                {confirmError?.message || error}
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
                        Reset Password
                    </Button>
                </form>
            )}
        </Card>
      </Stack>
    </Box>
  );
}