import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '../../hooks';

import { bgGradient } from '../../theme/css';

import { Logo, Iconify } from '../../components';

import { useMutation, useQuery } from '@apollo/client';
import { CREATE_OFFICER, GET_OFFICES, GET_POSITIONS } from '../../graphql/users';

// ----------------------------------------------------------------------

interface OfficerInput {
    firstName: string;
    lastName: string;
    positionId: string;
    officeId: string;
    password: string;
};

const formDefaults = {
    firstName: '',
    lastName: '',
    positionId: '',
    officeId: '',
    password: ''
}

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<OfficerInput>(formDefaults);

  const { firstName, lastName, positionId, officeId, password } = formData;

  const { data: positions, error: positionError } = useQuery(GET_POSITIONS);

  const { data: offices, error: officeError } = useQuery(GET_OFFICES);

  const [createOfficer, { error: createError }] = useMutation(CREATE_OFFICER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const officer = await createOfficer({
        variables: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            positionId: parseInt(positionId),
            officeId: parseInt(officeId),
            password: password
        }
    });

    if (officer.data && officer.data.createOfficer) 
      router.push(`/verify/${officer.data.createOfficer.uuid}`);
    else setError("Account already exists.");

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
          <Typography variant="h4">SIGN UP</Typography>

          <Typography variant="body2" sx={{ my: 2 }}>
            Already have an account?
            <Link href='/login' variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }}>
                Sign in
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

                    {positions && (
                        <TextField
                            name='positionId'
                            select
                            label="Position"
                            value={positionId} 
                            onChange={handleChange}
                            required
                            fullWidth
                        >
                            {positions.getPositions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}

                    {offices && (
                        <TextField
                            name='officeId'
                            select
                            label="Office"
                            value={officeId} 
                            onChange={handleChange}
                            required
                            fullWidth
                        >
                            {offices.getOffices.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}

                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password} 
                        onChange={handleChange}
                        required
                        fullWidth
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
                  {(error || positionError?.message || officeError?.message || createError?.message) && (
                    <Typography variant="body2" align='center' color="error">
                      {error || positionError?.message || officeError?.message || createError?.message}
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
                    Sign up
                </Button>
            </form>
        </Card>
      </Stack>
    </Box>
  );
}