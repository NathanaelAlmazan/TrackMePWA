import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {
    OfficeCard,
    PurposeCard,
    StatusCard,
    TypesCard,
    PositionsCard
} from './cards';

export default function SettingsPage() {
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4">Settings</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <OfficeCard />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <PurposeCard />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TypesCard />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <StatusCard />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <PositionsCard />
                </Grid>

            </Grid>
        </Container>
    );
}