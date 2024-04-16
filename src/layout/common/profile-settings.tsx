import { useState, useEffect, useRef } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SignatureCanvas from 'react-signature-canvas';
import Tooltip from '@mui/material/Tooltip';

import { update } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Iconify } from '../../components';

import axios from 'axios';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_OFFICER_BY_ID, UPDATE_OFFICER } from '../../graphql/users';
import { Uploads } from '../../sections/documents/document-dialog/CommentField';

interface OfficerInput {
    firstName: string;
    lastName: string;
    email?: string | null;
    phone?: string | null;
    avatar: string;
    signature?: string | null;
    password: string;
};

const formDefaults = {
    firstName: '',
    lastName: '',
    avatar: '',
    password: '',
    email: '',
    phone: ''
}

const defaultAvatars = [
    {
        alt: 'Profile 0',
        src: '/assets/images/avatars/avatar_30.jpg'
    },
    {
        alt: 'Profile 1',
        src: '/assets/images/avatars/avatar_27.jpg'
    },
    {
        alt: 'Profile 2',
        src: '/assets/images/avatars/avatar_28.jpg'
    },
    {
        alt: 'Profile 3',
        src: '/assets/images/avatars/avatar_26.jpg'
    },
    {
        alt: 'Profile 4',
        src: '/assets/images/avatars/avatar_29.jpg'
    }
]

export default function ProfileDialog({
    open,
    onClose
}: {
    open: boolean,
    onClose: () => void
}) {
    const dispatch = useAppDispatch();
    const { uuid } = useAppSelector((state) => state.auth);

    const [error, setError] = useState<string>();
    const [edit, setEdit] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [avatars, setAvatars] = useState(defaultAvatars);
    const [formData, setFormData] = useState<OfficerInput>(formDefaults);
    const signaturePad = useRef<SignatureCanvas | null>(null);

    const { firstName, lastName, email, phone, avatar, signature, password } = formData;
  
    const [getOfficerById, { error: officerError }] = useLazyQuery(GET_OFFICER_BY_ID);

    const [updateOfficer, { error: updateError }] = useMutation(UPDATE_OFFICER);

    useEffect(() => {
        if (uuid) {
            getOfficerById({ variables: { uuid: uuid } })
                .then(({ data }) => {
                    if (data && data.getOfficerById) {
                        setFormData({
                            firstName: data.getOfficerById.firstName,
                            lastName: data.getOfficerById.lastName,
                            avatar: data.getOfficerById.avatar,
                            signature: data.getOfficerById.signature,
                            email: data.getOfficerById.email,
                            phone: data.getOfficerById.phone,
                            password: ''
                        });
                    }
                });
        }
    }, [uuid, getOfficerById]);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value });
    };
  
    const handleAvatarChange = (event: React.MouseEvent<unknown>, src: string) => {
        setFormData({...formData, avatar: src });
    };

    const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            try {
                const form = new FormData();
                form.append("files", file);

                const result = await axios.post(process.env.REACT_APP_UPLOAD_URL as string, form);
                const uploaded: Uploads[] = result.data.files;

                setAvatars(previous => [ ...previous, {
                    alt: uploaded[0].fileName,
                    src: uploaded[0].fileUrl
                }]);

                setFormData({...formData, avatar: uploaded[0].fileUrl });
            } catch (err) {
                setError("Failed to upload files.");
                return
            }
        }
    };

    const handleEditSignature = (event: React.MouseEvent<unknown>) => {
        setEdit(!edit);
    };

    const handleDrawSignature = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                signaturePad.current?.getTrimmedCanvas().toBlob((blob) => {
                    if (blob) {
                        const form = new FormData();
                        form.append("files", blob, `${lastName}_signature.png`);
    
                        axios.post(process.env.REACT_APP_UPLOAD_URL as string, form)
                            .then(({ data }) => {
                                const uploaded: Uploads[] = data.files;
                                const fileUrl = uploaded[0].fileUrl;

                                setFormData({...formData, signature: fileUrl });
                                setEdit(false);

                                resolve(fileUrl); // Resolve with file URL
                            })
                            .catch(error => reject(error.message));
                    }
                }, 'image/png');
            } catch (error) {
                setError("Failed to upload files.");
            }
        });
    }

    const handleUploadSignature = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            try {
                const form = new FormData();
                form.append("files", file);

                const result = await axios.post(process.env.REACT_APP_UPLOAD_URL as string, form);
                const uploaded: Uploads[] = result.data.files;

                setFormData({...formData, signature: uploaded[0].fileUrl });
                setEdit(false);
                
            } catch (err) {
                setError("Failed to upload files.");
                return
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!uuid) return;

        const officer = await updateOfficer({
            variables: {
                uuid: uuid,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                avatar: avatar,
                signature: (!signature || edit) ? await handleDrawSignature() : signature,
                password: password.length > 5 ? password : undefined
            }
        });
    

        if (officer.data && officer.data.updateOfficer) {
            dispatch(update({
                firstName: firstName,
                lastName: lastName,
                avatar: avatar
            }));
            onClose();
        }
        else setError("Failed to update profile.");
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
            <DialogTitle>
                Profile
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Stack spacing={2}>
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
                                    name="email" 
                                    label="Email" 
                                    type='email'
                                    value={email} 
                                    onChange={handleChange}
                                    fullWidth
                                />

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

                                <TextField
                                    name="password"
                                    label="New Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password} 
                                    onChange={handleChange}
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel sx={{ mb: 1 }}>Avatar</FormLabel>
                                    <Stack direction="row" spacing={2} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                                        {avatars.map(img => ( 
                                            <Avatar 
                                                key={img.alt} 
                                                src={img.src} 
                                                alt={img.alt} 
                                                onClick={(event) => handleAvatarChange(event, img.src)}
                                                sx={{ 
                                                    opacity: img.src === avatar ? 1.0 : 0.3, 
                                                    cursor: 'pointer' 
                                                }} 
                                            />
                                        ))}

                                        <Tooltip title='Upload'>
                                            <Avatar
                                                component='label'
                                                sx={{
                                                    cursor: 'pointer' 
                                                }} 
                                            >
                                                <Iconify icon="material-symbols:upload" />
                                                <input type="file" accept="image/*" onChange={handleUploadAvatar} hidden style={{ display: 'none' }} />
                                            </Avatar>
                                        </Tooltip>
                                    </Stack>
                                </FormControl>

                                <FormControl>
                                    <FormLabel sx={{ mb: 1 }}>Signature</FormLabel>

                                    <Box 
                                        sx={{ 
                                            display: 'flex', 
                                            position: 'relative',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid black',
                                            borderRadius: 2
                                        }}
                                    >
                                        {!signature || edit ? (
                                            <>
                                                <SignatureCanvas 
                                                    penColor='black'
                                                    ref={signaturePad}
                                                    canvasProps={{ width: 224, height: 126 }}
                                                />
                                                <Stack direction='row' justifyContent='flex-end' sx={{ position: 'absolute', top: 0, right: 0, p: 1 }}>
                                                    <Tooltip title='Upload'>
                                                        <IconButton component='label'>
                                                            <Iconify icon='material-symbols:upload' />
                                                            <input type="file" accept="image/*" onChange={handleUploadSignature} hidden style={{ display: 'none' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                   {edit && (
                                                        <Tooltip title='Cancel'>
                                                            <IconButton onClick={handleEditSignature}>
                                                                <Iconify icon='iconoir:cancel' />
                                                            </IconButton>
                                                        </Tooltip>
                                                   )}
                                                </Stack>
                                            </>
                                            
                                        ) : (
                                            <>
                                                <Box sx={{ p: 2 }}>
                                                    <Box component='img' 
                                                        src={signature} 
                                                        alt="signature" 
                                                        sx={{ width: '100%', height: '100%', maxWidth: 224, maxHeight: 126 }}
                                                    />  
                                                </Box>
                                                <Stack direction='row' justifyContent='flex-end' sx={{ position: 'absolute', top: 0, right: 0, p: 1 }}>
                                                    <Tooltip title='Edit'>
                                                        <IconButton onClick={handleEditSignature}>
                                                            <Iconify icon='mingcute:edit-line' />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </>
                                        )}
                                    </Box>
                                </FormControl>
                            </Stack>             
                        </Grid>

                        {(officerError?.message || error || updateError?.message) && (
                            <Grid item xs={12}>
                                <Typography variant="body2" align='right' color="error">
                                    {officerError?.message || error || updateError?.message}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit">
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
    );
}