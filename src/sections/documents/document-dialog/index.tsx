import { useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { Iconify, ReferenceSlip, Snackbar } from '../../../components';
import CommentCard from './CommentCard';
import CommentField from './CommentField';
import DocumentDetails from './DocumentDetails';
import StatusButton from './StatusButton';

import { useQuery, useSubscription } from '@apollo/client';
import { GET_DOCUMENT_BY_ID, SUBSCRIBE_DOCUMENT_EVENTS } from '../../../graphql/documents';

export default function DocumentDialog({ officeId, referenceNum, open, onClose }: { officeId?: number, referenceNum: string, open: boolean, onClose: () => void }) {
    const theme = useTheme();
    const { data: document, error: getError, refetch } = useQuery(GET_DOCUMENT_BY_ID, {
        fetchPolicy: 'no-cache',
        variables: {
            referenceNum
        }
    });
    const { data: documentEvents, error: subscribeError } = useSubscription(SUBSCRIBE_DOCUMENT_EVENTS, {
        fetchPolicy: 'no-cache',
        variables: {
            referenceNum
        }
    });

    useEffect(() => {
        if (documentEvents) refetch();
    }, [documentEvents, refetch]);

    return (
        <>
        <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth>
            <DialogContent>
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={12} md={8} sx={{ position: 'relative' }}>
                        <Stack spacing={3} sx={{ maxHeight: { sm: '100%', md: '80vh' }, overflow: { sm: 'inherit', md: 'auto' }, p: 2, pb: 10 }}>
                            <Box>
                                <Typography variant='h6'>
                                    {`#${document?.getDocumentById.referenceNum}`}
                                </Typography>
                                <Typography variant='h3'>
                                    {document?.getDocumentById.subject}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant='body1'>
                                    {document?.getDocumentById.description}
                                </Typography>
                            </Box>

                            <Stack spacing={2} sx={{ backgroundColor: theme.palette.grey[200], p: 2, borderRadius: 3 }}>
                                {document && document.getDocumentById.comments.map((comment) => (
                                    <CommentCard 
                                        key={comment.id}
                                        senderName={[comment.sender.firstName, comment.sender.lastName].join(' ')}
                                        senderId={comment.sender.uuid} 
                                        message={comment.message}
                                        files={comment.files}
                                        avatar={comment.sender.avatar}
                                    />
                                ))}

                                {document && document.getDocumentById.comments.length === 0 && (
                                    <Typography variant='subtitle1'>
                                        No Comment Yet.
                                    </Typography>
                                )} 
                            </Stack>
                        </Stack>

                        <CommentField referenceNum={referenceNum} onComment={() => refetch()} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} sx={{ position: 'relative' }}>
                        <Stack spacing={3}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Stack direction='row' alignItems='center' spacing={2}>
                                    {document && (
                                        <StatusButton 
                                            officeId={officeId}
                                            status={document.getDocumentById.status?.label} 
                                            referenceNum={document.getDocumentById.referenceNum} 
                                        />
                                    )}

                                    <PDFDownloadLink document={<ReferenceSlip document={document} />} fileName={`${referenceNum}.pdf`}>
                                        {({ url }) => url && (
                                            <Button
                                                onClick={() => window.open(url, '_blank')}
                                                variant='contained'
                                                endIcon={<Iconify icon='ant-design:export-outlined' />}
                                            >
                                                Export
                                            </Button>
                                        )}
                                    </PDFDownloadLink>
                                </Stack>
                                

                                <IconButton onClick={onClose} sx={{ width: 50, height: 50 }}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>

                            <DocumentDetails 
                                receivedFrom={document?.getDocumentById.receivedFrom}
                                refferedTo={document?.getDocumentById.refferedTo.map(office => office.name).join(', ')}
                                type={document?.getDocumentById.type?.label}
                                purpose={document?.getDocumentById.purpose?.label}
                                dateCreated={document?.getDocumentById.dateCreated}
                                dateDue={document?.getDocumentById.dateDue}
                                tag={document?.getDocumentById.tag}
                            />
                        </Stack>
                    </Grid>

                </Grid>
            </DialogContent>
        </Dialog>

        <Snackbar 
            severity='error' 
            message={getError?.message || subscribeError?.message} 
        />
        </>
    );
}