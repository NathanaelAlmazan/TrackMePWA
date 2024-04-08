import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useAppSelector, useRouter } from '../../hooks';

import { bgGradient } from '../../theme/css';

import { Logo, Iconify } from '../../components';

import { useLazyQuery } from '@apollo/client';
import { CONFIRM_VERIFY_ACCOUNT, REQUEST_VERIFY_ACCOUNT } from '../../graphql/users';
import { Role } from '../../__generated__/graphql';

// ----------------------------------------------------------------------
interface AccountVerify {
    username: string;
    code: string;
}

const formDefaults = {
    username: '',
    code: ''
}

export default function AccountVerifyView() {
  const theme = useTheme();
  const { uuid: signed, role } = useAppSelector((state) => state.auth);
  const { uuid } = useParams();

  const router = useRouter();

  const [error, setError] = useState<string>();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [formData, setFormData] = useState<AccountVerify>(formDefaults);

  const { username, code } = formData;

  const [requestVerify, { error: requestError }] = useLazyQuery(REQUEST_VERIFY_ACCOUNT);
  const [confirmVerify, { error: confirmError }] = useLazyQuery(CONFIRM_VERIFY_ACCOUNT);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!uuid) {
      setError("Invalid URL. Please relaod.");
      return
    }

    if (!username) {
      setError("Please type your email or phone number.");
      return
    }

    requestVerify({ variables: {
      uuid: uuid,
      contact: username,
    }})
     .then(({ data }) => {
            if (data && data.requestAccountVerify) {
                setConfirm(true);
                setError(undefined);
            }
        })
     .catch((error) => {
        setError(error.message);
    });
  };

  const handleSubmitPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    confirmVerify({ variables: {
        code: code,
        contact: username,
      }
  })
    .then(({ data }) => {
           if (data && data.confirmAccountVerify) {
               if (signed && role) {
                if ([Role.Superuser, Role.Director].includes(role)) router.push('/dashboard');
                else router.push('/calendar');
               } else {
                 router.push('/login');
               }
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
          <Typography variant="h4">ACCOUNT VERIFICATION</Typography>

            {!confirm ? (
                <form onSubmit={handleSubmitRequest}>
                    <Stack spacing={2} sx={{ my: 3 }}>
                        <TextField 
                            name="username" 
                            label="Email or Phone Number (+63)" 
                            value={username} 
                            onChange={handleChange}
                            fullWidth
                            required
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
                        Verify Account
                    </Button>
                </form>
            )}
        </Card>
      </Stack>
    </Box>
  );
}