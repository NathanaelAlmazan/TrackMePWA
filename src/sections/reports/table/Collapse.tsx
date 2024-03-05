import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { Label, Iconify } from '../../../components';
import { statusColor } from './Row';
import { capitalCase } from 'change-case';

import { useQuery } from '@apollo/client';
import { GET_OFFICE_SUBMISSIONS } from '../../../graphql/reports';


export default function CollapseTable({
    collapse,
    reportId,
    onView
}: {
    collapse: boolean
    reportId: number,
    onView: (event: React.MouseEvent<unknown>, id: number) => void
}) {
    const { data: reports } = useQuery(GET_OFFICE_SUBMISSIONS, {
        variables: {
            id: reportId
        }
    });

    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={collapse} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1, maxHeight: 500, overflowY: 'auto' }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Submissions
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell>Office</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {reports && reports.getOfficeSubmissions.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle1" noWrap>
                                        {report.office.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Label color={statusColor(capitalCase(report.status))}>{capitalCase(report.status)}</Label>
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="View">
                                        <IconButton onClick={(event) => onView(event, parseInt(report.id))}>
                                            <Iconify icon="fluent:open-20-filled" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
            </TableCell>
      </TableRow>
    );
}