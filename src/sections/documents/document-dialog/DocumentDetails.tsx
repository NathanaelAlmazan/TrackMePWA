import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { capitalCase } from 'change-case';

export default function DocumentDetails({
    receivedFrom,
    dateCreated,
    dateDue,
    refferedTo,
    type,
    purpose,
    tag,
}: {
    receivedFrom?: string;
    dateCreated?: string;
    dateDue?: string;
    refferedTo?: string;
    type?: string;
    purpose?: string;
    tag?: string | null;
}) {
    return (
        <Card variant='outlined'>
            <CardHeader title='Details' />
            <Box sx={{ maxHeight: { sm: '100%', md: '80vh' }, overflowY: { sm: 'inherit', md: 'auto' } }}>
                <TableContainer>
                    <Table size="small" aria-label="dense table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        Received From
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {receivedFrom}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        Referred To
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {refferedTo}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        Date Received
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {dateCreated && new Date(dateCreated).toLocaleDateString(undefined, {
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
                                        Date Due
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {dateDue && new Date(dateDue).toLocaleDateString(undefined, {
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
                                        Document Type
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {type}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        Purpose
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {purpose}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                        Tag
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {tag ? capitalCase(tag) : "None"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Card>
    );
}