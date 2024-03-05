import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify, Snackbar } from '../../../components';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_OFFICER, GET_OFFICER_BY_ID, GET_OFFICES, GET_POSITIONS, UPDATE_OFFICER } from '../../../graphql/users';

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

export default function AccountDialog({
    open,
    onClose,
    officerId
}: {
    open: boolean,
    onClose: () => void,
    officerId?: string | null
}) {
    const [error, setError] = useState<string>();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<OfficerInput>(formDefaults);

    const { firstName, lastName, positionId, officeId, password } = formData;

    const { data: positions, error: positionError } = useQuery(GET_POSITIONS);

    const { data: offices, error: officeError } = useQuery(GET_OFFICES);
  
    const [getOfficerById, { data: officer, error: officerError }] = useLazyQuery(GET_OFFICER_BY_ID);

    const [createOfficer, { error: createError }] = useMutation(CREATE_OFFICER);
    const [updateOfficer, { error: updateError }] = useMutation(UPDATE_OFFICER);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        if (officerId) {
            getOfficerById({ variables: { uuid: officerId } })
                .then(({ data }) => {
                    if (data && data.getOfficerById) {
                        setFormData({
                            firstName: data.getOfficerById.firstName,
                            lastName: data.getOfficerById.lastName,
                            positionId: data.getOfficerById.position?.id.toString() || '',
                            officeId: data.getOfficerById.office?.id.toString() || '',
                            password: ''
                        });
                    }
                });
        }
    }, [officerId, getOfficerById]);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (officerId) {
        const officer = await updateOfficer({
            variables: {
                uuid: officerId,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                positionId: parseInt(positionId),
                officeId: parseInt(officeId)
            }
        });
    
        if (officer.data && officer.data.updateOfficer) onClose();
        else setError("Failed to update account.");
      } else {
        const officer = await createOfficer({
            variables: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                positionId: parseInt(positionId),
                officeId: parseInt(officeId),
                password: password
            }
        });
    
        if (officer.data && officer.data.createOfficer) onClose();
        else setError("Account already exists.");
      }
  
      setFormData(formDefaults); // reset form
    }

    const handleClose = () => {
        setFormData(formDefaults);
        onClose();
    }

    return (
        <>
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
            <DialogTitle>
                {officer ? `Edit ${officer.getOfficerById?.firstName + ' ' + officer.getOfficerById?.lastName} Profile` : 'Create Officer'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2} sx={{ mb: 3 }}>
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

                        {!officerId && (
                            <TextField
                                name="password"
                                label="Temporary Password"
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
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="inherit"
                    >
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

        <Snackbar 
            severity='error' 
            message={positionError?.message || officeError?.message || 
                officerError?.message || createError?.message || error || updateError?.message} 
        />
        </>
    );
}