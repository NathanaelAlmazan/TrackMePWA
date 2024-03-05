import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import SubmissionCard from './SubmissionCard';
import SubmissionField from './SubmissionField';
import { Snackbar } from '../../../components';

import { useQuery } from '@apollo/client';
import { GET_SUBMISSION_BY_ID } from '../../../graphql/reports';
import { parseType } from '..';
import { useEffect, useState } from 'react';

export default function ReportDialog({ reportId, open, onClose }: { reportId: number, open: boolean, onClose: () => void }) {
    const [edit, setEdit] = useState<boolean>(true);
    const { data: report, error: getError, refetch } = useQuery(GET_SUBMISSION_BY_ID, {
        fetchPolicy: 'no-cache',
        variables: {
            id: reportId
        }
    });

    useEffect(() => {
        if (report && !report.getSubmittedReportById.message) setEdit(true);
        else setEdit(false);
    }, [report]);
    
    return (
        <>
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle component='div'>
                <Typography variant='h4'>
                    {report?.getSubmittedReportById.report.name}
                </Typography>
                <Typography variant='body1'>
                    {parseType(report?.getSubmittedReportById.report.type)}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table size="small" aria-label="dense table" sx={{ mb: 2 }}>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        Report Basis
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {report?.getSubmittedReportById.report.basis}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        Report Office
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {report?.getSubmittedReportById.office.name}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        Regional Deadline
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {report && new Date(report.getSubmittedReportById.localDue).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            weekday: 'short'
                                        })}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        National Deadline
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {report && new Date(report.getSubmittedReportById.nationalDue).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            weekday: 'short'
                                        })}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {(report && edit) ? (
                    <SubmissionField 
                        content={report.getSubmittedReportById.message}
                        reportId={parseInt(report.getSubmittedReportById.id)} 
                        onReport={() => refetch()} 
                        onCancel={() => onClose()}
                    />
                ) : (
                    <SubmissionCard 
                        message={report?.getSubmittedReportById.message}
                        files={report?.getSubmittedReportById.files}
                        onEdit={() => setEdit(!edit)}
                        onClose={() => onClose()}
                    />
                )}
            </DialogContent>
        </Dialog>

        <Snackbar 
            severity='error' 
            message={getError?.message} 
        />
        </>
    );
}