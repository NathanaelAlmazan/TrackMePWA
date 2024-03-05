import { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import dayjs, { Dayjs } from 'dayjs';

import { MultiSelect, DatePicker, Snackbar } from '../../../components';
import { GET_OFFICES, GET_SIGNATORIES } from '../../../graphql/users';
import { 
    GET_PURPOSES, 
    GET_STATUSES, 
    GET_TYPES, 
    GET_TEMP_REF_NUM, 
    CREATE_DOCUMENT, 
    GET_DOCUMENT_BY_ID ,
    UPDATE_DOCUMENT
} from '../../../graphql/documents';
import { Status, Tags } from '../../../__generated__/graphql';

interface DocumentForm {
    subject: string;
    description: string;
    receivedFrom: string;
    typeId: string;
    purposeId: string;
    statusId: string;
    signatureId: string;
    tag: string;
}

const formDefaults = {
    subject: '',
    description: '',
    receivedFrom: '',
    typeId: '',
    purposeId: '',
    statusId: '',
    signatureId: '',
    tag: ''
}

export default function FormDialog({
    referenceNum,
    open,
    onClose
}: {
    referenceNum: string | null,
    open: boolean,
    onClose: () => void
}) {
    // fetch options
    const { data: offices, error: officeError } = useQuery(GET_OFFICES, {
        fetchPolicy: 'no-cache'
    }); 
    const { data: purposes, error: purposeError } = useQuery(GET_PURPOSES, {
        fetchPolicy: 'no-cache'
    });
    const { data: statuses, error: statusError } = useQuery(GET_STATUSES, {
        fetchPolicy: 'no-cache'
    });
    const { data: types, error: typesError } = useQuery(GET_TYPES, {
        fetchPolicy: 'no-cache'
    });
    const { data: signatories, error: signatoryError } = useQuery(GET_SIGNATORIES, {
        fetchPolicy: 'no-cache'
    });
    const { data: reference, error: referenceError, refetch } = useQuery(GET_TEMP_REF_NUM, {
        fetchPolicy: 'no-cache'
    });
    const [getDocumentById, { error: getError }] = useLazyQuery(GET_DOCUMENT_BY_ID, {
        fetchPolicy: 'no-cache'
    }); 

    const [createDocument, { error: createError}] = useMutation(CREATE_DOCUMENT);
    const [updateDocument, { error: updateError}] = useMutation(UPDATE_DOCUMENT);

    const [referrals, setReferrals] = useState<number[]>([]);
    const [deadline, setDeadline] = useState<Dayjs>(dayjs(new Date()));
    const [formData, setFormData] = useState<DocumentForm>(formDefaults);

    const { subject, description, receivedFrom, typeId, purposeId, statusId, signatureId, tag } = formData;

    useEffect(() => {
        if (referenceNum) {
            getDocumentById({ variables: { referenceNum: referenceNum } }).then(({ data }) => {
                if (data) {
                    setFormData({
                        subject: data.getDocumentById.subject,
                        description: data.getDocumentById.description,
                        receivedFrom: data.getDocumentById.receivedFrom,
                        typeId: data.getDocumentById.type ? data.getDocumentById.type.id.toString() : "",
                        purposeId: data.getDocumentById.purpose ? data.getDocumentById.purpose.id.toString() : "",
                        statusId: data.getDocumentById.status ? data.getDocumentById.status.id.toString() : "",
                        tag: data.getDocumentById.tag ? data.getDocumentById.tag : "",
                        signatureId: data.getDocumentById.signatory.uuid
                    });

                    setDeadline(dayjs(new Date(data.getDocumentById.dateDue)));
                    setReferrals(data.getDocumentById.refferedTo.map(office => parseInt(office.id)));
                }
            })
        } else {
            setFormData(formDefaults);
            setDeadline(dayjs(new Date()));
            setReferrals([]);
        }
    }, [referenceNum, getDocumentById])

    const handleReferralsChange = (selected: number[]) => {
        setReferrals(selected);
    }

    const handleDeadlineChange = (newValue: Dayjs | null) => {
        if (!newValue) return;
        setDeadline(newValue);
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
         ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (referenceNum) {
            await updateDocument({
                variables: {
                    referenceNum: referenceNum,
                    subject,
                    description,
                    receivedFrom,
                    typeId: parseInt(typeId),
                    purposeId: parseInt(purposeId),
                    statusId: parseInt(statusId),
                    signatureId: signatureId,
                    tag: tag.length === 0 ? null : tag as Tags,
                    refferedTo: referrals,
                    dateDue: deadline.toISOString()
                }
            });
        } else {
            await createDocument({
                variables: {
                    subject,
                    description,
                    receivedFrom,
                    typeId: parseInt(typeId),
                    purposeId: parseInt(purposeId),
                    statusId: parseInt(statusId),
                    signatureId: signatureId,
                    tag: tag.length === 0 ? null : tag as Tags,
                    refferedTo: referrals,
                    dateDue: deadline.toISOString()
                }
            });
        }

        // clear form data
        setFormData(formDefaults);
        setDeadline(dayjs(new Date()));
        setReferrals([]);

        await refetch(); // get new reference number
        onClose(); // close dialog
    }


    return (
        <>
        <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth>
            <form onSubmit={handleSubmit}>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {reference && (
                            <Typography variant='h6'>
                                {`#${referenceNum ? referenceNum : reference.getTempReferenceNum}`}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={12} md={8}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField 
                                    name='subject'
                                    label='Subject'
                                    variant='outlined'
                                    value={subject}
                                    onChange={handleFormChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField 
                                    name='description'
                                    label='Description'
                                    variant='outlined'
                                    value={description}
                                    onChange={handleFormChange}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField 
                                    name='receivedFrom'
                                    label='Received From'
                                    variant='outlined'
                                    value={receivedFrom}
                                    onChange={handleFormChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {offices && (
                                <Grid item xs={12}>
                                    <MultiSelect 
                                        name='referredTo'
                                        label='Referred To'
                                        selected={referrals}
                                        options={offices.getOffices.map(office => ({
                                            id: parseInt(office.id),
                                            label: office.name
                                        }))}
                                        onChange={handleReferralsChange}
                                    />
                                </Grid>
                            )}

                            {types && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='typeId'
                                        select
                                        label="Document Type"
                                        value={typeId}
                                        onChange={handleFormChange}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    >
                                        {types.getDocumentTypes.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            )}

                            {purposes && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='purposeId'
                                        select
                                        label="Document Purpose"
                                        value={purposeId}
                                        onChange={handleFormChange}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    >
                                        {purposes.getDocumentPurposes.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            )} 
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Stack spacing={3}>
                            {statuses && (
                                <TextField
                                    name='statusId'
                                    select
                                    label="Document Status"
                                    value={statusId}
                                    onChange={handleFormChange}
                                    variant='outlined'
                                    required
                                    fullWidth
                                >
                                    {statuses.getDocumentStatus
                                        .filter(status => status.category === Status.NotStarted || status.category === Status.NotActionable || referenceNum)
                                        .map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}

                            <DatePicker 
                                label='Deadline'
                                value={deadline}
                                onChange={handleDeadlineChange}
                            />

                            <TextField
                                name='tag'
                                select
                                label="Document Tag"
                                variant='outlined'
                                value={tag}
                                onChange={handleFormChange}
                                fullWidth
                            >
                                <MenuItem value="">
                                    None
                                </MenuItem>
                                <MenuItem value="CONFIDENTIAL">
                                    Confidential
                                </MenuItem>
                                <MenuItem value="TOP_PRIORITY">
                                    Top Prioroty
                                </MenuItem>
                                <MenuItem value="FOLLOW_UP">
                                    Follow Up
                                </MenuItem>
                            </TextField>

                            {signatories && (
                                <TextField
                                    name='signatureId'
                                    select
                                    label="Signatory"
                                    value={signatureId}
                                    onChange={handleFormChange}
                                    variant='outlined'
                                    required
                                    fullWidth
                                >
                                    {signatories.getSignatories.map((option) => (
                                        <MenuItem key={option.uuid} value={option.uuid}>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Avatar alt={option.lastName} src={option.avatar} />
                                                <Typography variant="subtitle2" noWrap>
                                                    {`${option.firstName} ${option.lastName}`}
                                                </Typography>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )} 
                        </Stack>
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
            message={officeError?.message || purposeError?.message || createError?.message || updateError?.message ||
                statusError?.message || typesError?.message || referenceError?.message || getError?.message || signatoryError?.message} 
        />

        </>
    );
}