import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, Snackbar } from '../../../components';
import { CREATE_REPORT, GET_REPORT_BY_ID, UPDATE_REPORT } from '../../../graphql/reports';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Frequency, ReportType } from '../../../__generated__/graphql';

interface ReportForm {
    name: string;
    basis: string;
    frequency: "NONE" | "MONTHLY" | "YEARLY";
    type: "HR" | "ADMIN";
}

const formDefaults: ReportForm = {
    name: '',
    basis: '',
    frequency: "NONE",
    type: "HR"
}

export default function FormDialog({
    reportId,
    open,
    onClose
}: {
    reportId?: number | null,
    open: boolean,
    onClose: () => void
}) {
    const [getReportById, { error: getError }] = useLazyQuery(GET_REPORT_BY_ID, {
        fetchPolicy: 'no-cache'
    }); 

    const [formData, setFormData] = useState<ReportForm>(formDefaults);
    const [localDeadline, setLocalDeadline] = useState<Dayjs>(dayjs(new Date()));
    const [nationalDeadline, setNationalDeadline] = useState<Dayjs>(dayjs(new Date()));

    const { name, basis, frequency, type } = formData;

    const [createReport, { error: createError }] = useMutation(CREATE_REPORT);
    const [updateReport, { error: updateError }] = useMutation(UPDATE_REPORT);

    useEffect(() => {
        if (reportId) {
            getReportById({ variables: { id: reportId } }).then(({ data }) => {
                if (data) {
                    setFormData({
                        name: data.getReportById.name,
                        basis: data.getReportById.basis,
                        frequency: data.getReportById.frequency,
                        type: data.getReportById.type
                    });

                    setLocalDeadline(dayjs(new Date(data.getReportById.localDue)));
                    setNationalDeadline(dayjs(new Date(data.getReportById.nationalDue)));
                }
            });
        } else {
            setFormData(formDefaults);
            setLocalDeadline(dayjs(new Date()));
            setNationalDeadline(dayjs(new Date()));
        }
    }, [reportId, getReportById])

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
         ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleLocalDeadlineChange = (newValue: Dayjs | null) => {
        if (!newValue) return;
        setLocalDeadline(newValue);
    }

    const handleNationalDeadlineChange = (newValue: Dayjs | null) => {
        if (!newValue) return;
        setNationalDeadline(newValue);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (reportId) {
            await updateReport({
                variables: {
                    id: reportId,
                    name,
                    basis,
                    type: type as ReportType,
                    frequency: frequency as Frequency,
                    localDue: localDeadline.toISOString(),
                    nationalDue: nationalDeadline.toISOString()
                }
            });
        } else {
            await createReport({
                variables: {
                    name,
                    basis,
                    type: type as ReportType,
                    frequency: frequency as Frequency,
                    localDue: localDeadline.toISOString(),
                    nationalDue: nationalDeadline.toISOString()
                }
            });
        }

        // reset form
        setFormData(formDefaults);
        setLocalDeadline(dayjs(new Date()));
        setNationalDeadline(dayjs(new Date()));

        onClose(); // close dialog
    }

    return (
        <>
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <form onSubmit={handleSubmit}>
            <DialogTitle>{reportId ? "Edit Report" : "Create Report"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{ pt: 2 }}>
                    <Grid item xs={12}>
                        <TextField 
                            name='name'
                            label='Report Name'
                            variant='outlined'
                            value={name}
                            onChange={handleFormChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            name='basis'
                            label='Report Basis'
                            variant='outlined'
                            value={basis}
                            onChange={handleFormChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <DatePicker 
                            label='Next Regional Deadline'
                            value={localDeadline}
                            onChange={handleLocalDeadlineChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <DatePicker 
                            label='Next National Deadline'
                            value={nationalDeadline}
                            onChange={handleNationalDeadlineChange}
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
                            required
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

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            name='type'
                            select
                            label="Report Type"
                            variant='outlined'
                            value={type}
                            onChange={handleFormChange}
                            required
                            fullWidth
                        >
                            <MenuItem value="HR">
                                Human Resource Report
                            </MenuItem>
                            <MenuItem value="ADMIN">
                                Administrative Report
                            </MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
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
            message={createError?.message || getError?.message || updateError?.message} 
        />

        </>
    );
}