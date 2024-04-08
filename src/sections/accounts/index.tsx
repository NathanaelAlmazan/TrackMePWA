import React, { lazy } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Iconify, Loader } from '../../components';

const FormDialog = lazy(() => import('./form-dialog'));
const AccountsTable = lazy(() => import('./table'));

export default function AccountPage() {
    const [form, setForm] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    const handleAccountForm = () => {
        setForm(!form);
        setSelected(null);
    };

    const handleAccountEdit = (uuid: string) => {
        setSelected(uuid);
        setForm(!form);
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Accounts</Typography>

                <Button onClick={handleAccountForm} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Create
                </Button>
            </Stack>

            <AccountsTable 
                refresh={form}
                onEdit={handleAccountEdit} 
            />

            <Loader>
                <FormDialog 
                    open={form}
                    officerId={selected}
                    onClose={handleAccountForm}
                />
            </Loader>
        </Container>
    );
}