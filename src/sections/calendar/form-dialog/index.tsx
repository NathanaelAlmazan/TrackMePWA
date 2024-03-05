import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { DatePicker, Snackbar, Iconify } from '../../../components';
import { CREATE_EVENT, CREATE_SUBMISSION, GET_EVENT_BY_ID, GET_REPORTS, UPDATE_EVENT } from '../../../graphql/reports';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

// types
import { Frequency } from '../../../__generated__/graphql';
import { Uploads } from '../../documents/document-dialog/CommentField';

interface EventForm {
    reportId: string;
    subject: string;
    image?: string | null;
    description: string;
    frequency: "NONE" | "MONTHLY" | "YEARLY";
}

const formDefaults: EventForm = {
    reportId: '',
    subject: '',
    image: '',
    description: '',
    frequency: "NONE"
}

export default function FormDialog({
    eventId,
    selectedDate,
    open,
    onClose
}: {
    eventId?: number | null,
    selectedDate: Date,
    open: boolean,
    onClose: () => void
}) {
    const { data: reports, error: reportError } = useQuery(GET_REPORTS);
    const [getEventById, { error: getError }] = useLazyQuery(GET_EVENT_BY_ID, {
        fetchPolicy: 'no-cache'
    }); 

    const [image, setImage] = useState<File | null>(null);
    const [formData, setFormData] = useState<EventForm>(formDefaults);
    const [eventDate, setEventDate] = useState<Dayjs>(dayjs(selectedDate));
    const [localDeadline, setLocalDeadline] = useState<Dayjs>(dayjs(selectedDate));
    const [nationalDeadline, setNationalDeadline] = useState<Dayjs>(dayjs(selectedDate));

    const { subject, description, frequency, reportId } = formData;

    const [createEvent, { error: createError }] = useMutation(CREATE_EVENT);
    const [updateEvent, { error: updateError }] = useMutation(UPDATE_EVENT);

    const [createSubmission, { error: submitError }] = useMutation(CREATE_SUBMISSION);

    useEffect(() => {
        if (eventId) {
            getEventById({ variables: { id: eventId } }).then(({ data }) => {
                if (data) {
                    setFormData({
                        subject: data.getEventById.subject,
                        description: data.getEventById.description,
                        frequency: data.getEventById.frequency,
                        image: data.getEventById.image,
                        reportId: ''
                    });

                    setEventDate(dayjs(new Date(data.getEventById.date)));
                }
            });
        } else {
            setFormData(formDefaults);
            setEventDate(dayjs(new Date()));
        }
    }, [eventId, getEventById]);

    useEffect(() => {
        setEventDate(dayjs(selectedDate));
        setLocalDeadline(dayjs(selectedDate));
        setNationalDeadline(dayjs(selectedDate));
    }, [selectedDate])

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
         ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setImage(e.target.files[0]);
    }

    const handleDateChange = (newValue: Dayjs | null) => {
        if (!newValue) return;
        setEventDate(newValue);
    };

    const handleLocalDeadlineChange = (newValue: Dayjs | null) => {
        if (!newValue) return;
        setLocalDeadline(newValue);
    };

    const handleNationalDeadlineChange = (newValue: Dayjs | null) => {
        if (!newValue) return;
        setNationalDeadline(newValue);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (reportId) {
            await createSubmission({
                variables: {
                    reportId: parseInt(reportId),
                    localDue: localDeadline.toISOString(),
                    nationalDue: nationalDeadline.toISOString()
                }
            })
        } else {
            let imageUrl: string | null = null;
            if (image) {
                const form = new FormData();
                form.append("files", image);

                const response = await axios.post(process.env.REACT_APP_MEDIA_URL as string, form);
                
                if (response.data) {
                    const uploaded: Uploads[] = response.data.files;
                    imageUrl = uploaded[0].fileUrl;
                }
            }

            if (eventId) {
                await updateEvent({
                    variables: {
                        id: eventId,
                        subject,
                        description,
                        image: imageUrl,
                        date: eventDate.toISOString(),
                        frequency: frequency as Frequency
                    }
                });
            } else {
                await createEvent({
                    variables: {
                        subject,
                        description,
                        image: imageUrl,
                        date: eventDate.toISOString(),
                        frequency: frequency as Frequency
                    }
                });
            }
        }

        // reset form
        setFormData(formDefaults);
        setEventDate(dayjs(new Date(selectedDate)));
        setLocalDeadline(dayjs(new Date(selectedDate)));
        setNationalDeadline(dayjs(new Date(selectedDate)));

        onClose(); // close dialog
    };

    return (
        <>
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <form onSubmit={handleSubmit}>

            {eventId ? (
                <DialogTitle>Edit Event</DialogTitle>
            ) : (
                <Divider sx={{ pt: 2 }}>ADD EVENT</Divider>
            )}
            
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            name='subject'
                            label='Event Name'
                            variant='outlined'
                            value={subject}
                            onChange={handleFormChange}
                            fullWidth
                            required={!reportId}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            name='description'
                            label='Description'
                            variant='outlined'
                            value={description}
                            onChange={handleFormChange}
                            fullWidth
                            required={!reportId}
                            helperText={image?.name || formData.image}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title='Attach Image'>
                                            <IconButton component='label' edge="end">
                                                <Iconify icon='tdesign:image-add' />

                                                <input type='file' accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} hidden />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <DatePicker 
                            label='Event Date'
                            value={eventDate}
                            onChange={handleDateChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            name='frequency'
                            select
                            label="Frequency"
                            variant='outlined'
                            value={frequency}
                            onChange={handleFormChange}
                            required={!reportId}
                            fullWidth
                        >
                            <MenuItem value="NONE">
                                None
                            </MenuItem>
                            <MenuItem value="MONTHLY">
                                Monthly
                            </MenuItem>
                            <MenuItem value="YEARLY">
                                Yearly
                            </MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

                {!eventId && (
                    <>
                    <Divider sx={{ py: 2 }}>OR ADD REPORT</Divider>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                name='reportId'
                                select
                                label="Report"
                                variant='outlined'
                                value={reportId}
                                onChange={handleFormChange}
                                required={!!reportId}
                                fullWidth
                            >   
                                {reports && reports.getReports.map(report => (
                                    <MenuItem key={report.id} value={report.id}>
                                        {report.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                            <DatePicker 
                                label='Regional Deadline'
                                value={localDeadline}
                                onChange={handleLocalDeadlineChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                            <DatePicker 
                                label='National Deadline'
                                value={nationalDeadline}
                                onChange={handleNationalDeadlineChange}
                            />
                        </Grid>
                    </Grid>
                    </>
                )}


            </DialogContent>

            <DialogActions>
                <Stack direction='row' spacing={2}>
                    <Button onClick={onClose} color='inherit'>
                        Cancel
                    </Button>
                    <Button variant='contained' color='inherit' type='submit'>
                        Save
                    </Button>
                </Stack>
            </DialogActions>
            </form>
        </Dialog>

        <Snackbar 
            severity='error' 
            message={createError?.message || getError?.message || updateError?.message 
                || reportError?.message || submitError?.message} 
        />

        </>
    );
}