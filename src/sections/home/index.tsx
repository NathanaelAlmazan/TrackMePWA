import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from '../../theme/css';

import { Logo } from '../../components';
import { useRouter } from '../../hooks';

export default function HomePage() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box
            sx={{
                ...bgGradient({
                color: alpha(theme.palette.background.default, 0.4),
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

            <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ height: 1 }}>
                <Box sx={{ pb: 3 }}>
                    <Typography variant="h1" align="center">TRACK ME</Typography>
                    <Typography variant="h4" align="center">Revenue Region VI</Typography>
                </Box>

                <Button
                    size="large"
                    variant="contained"
                    color="inherit"
                    sx={{ width: 300 }}
                    onClick={() => router.push('/login')}
                >
                    SIGN IN
                </Button>

                <Button
                    size="large"
                    variant="outlined"
                    color="inherit"
                    sx={{ width: 300 }}
                    onClick={() => router.push('/register')}
                >
                    SIGN UP
                </Button>
            </Stack>
        </Box>
    );
}