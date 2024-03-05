import { useState, useEffect, useMemo, lazy, Suspense } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableEmptyRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import TableToolbar from './Toolbar';
import TableHead from './Head';
import TableRow from './Row';

import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { DELETE_SUBMISSION, GET_SUBMISSIONS } from '../../../graphql/reports';
import { SUBSCRIBE_OFFICE_EVENTS } from '../../../graphql/users';

import { capitalCase } from 'change-case';
import { parseType } from '..';

const Snackbar = lazy(() => import('../../../components/Snackbar'));
const FilterDrawer = lazy(() => import('../../../components/Filter'));

export interface ReportRow {
    id: number;
    name: string;
    basis: string;
    type: string;
    localDue: string;
    nationalDue: string;
    status: string;
    reportId: number;
    pending: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
type Order = 'asc' | 'desc';
  
function getComparator<Key extends keyof ReportRow>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function ReportTable({
    officeId,
    onRefresh,
    onView,
    onEdit
}: {
    officeId?: number,
    onRefresh: () => void,
    onView: (reportId: number) => void,
    onEdit: (reportId: number) => void
}) {
    const { data: reports, error: getError, refetch } = useQuery(GET_SUBMISSIONS, {
        variables: {
            officeId
        }
    });
    const { data: officeEvents, error: subscribeError } = useSubscription(SUBSCRIBE_OFFICE_EVENTS);

    const [drawer, setDrawer] = useState<boolean>(false);
    const [filters, setFilters] = useState<readonly string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof ReportRow>('localDue');
    const [filterName, setFilterName] = useState<string>('');
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [reportList, setReportList] = useState<ReportRow[]>([]);

    const [deleteReport, { error: deleteError }] = useMutation(DELETE_SUBMISSION);

    useEffect(() => {
        if (reports) {
            setReportList(reports.getSubmittedReports.map(report => ({
                id: parseInt(report.id),
                name: report.report.name,
                basis: report.report.basis,
                type: parseType(report.report.type),
                localDue: report.localDue,
                nationalDue: report.nationalDue,
                status: capitalCase(report.status),
                reportId: parseInt(report.report.id),
                pending: report.pending
            })));
        }
    }, [reports]);

    useEffect(() => {
        if (officeEvents) refetch();
    }, [officeEvents, refetch]);

    const visibleRows = useMemo(
        () =>
          stableSort<ReportRow>(reportList.filter(report => 
                (report.name.includes(filterName) || report.basis.includes(filterName) || filterName.length === 0) &&
                    (filters.includes(report.type) || filterName.includes(report.status) || filters.length === 0)
            ), getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          ),
        [reportList, filterName, order, orderBy, page, rowsPerPage, filters],
    );

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
        setPage(page);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    
    const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ReportRow,
      ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleView = (event: React.MouseEvent<unknown>, id: number) => onView(id);
    const handleEdit = (event: React.MouseEvent<unknown>, id: number) => onEdit(id);
    
    const handleDelete = async (event: React.MouseEvent<unknown>, reportId: number) => {
        await deleteReport({
            variables: {
                id: reportId
            }
        });

        await refetch();
    }

    const handleFilter = (value: string) => {
        const selectedIndex = filters.indexOf(value);
        let newFilters: readonly string[] = [];
    
        if (selectedIndex === -1) {
            newFilters = newFilters.concat(filters, value);
        } else if (selectedIndex === 0) {
            newFilters = newFilters.concat(filters.slice(1));
        } else if (selectedIndex === filters.length - 1) {
            newFilters = newFilters.concat(filters.slice(0, -1));
        } else if (selectedIndex > 0) {
            newFilters = newFilters.concat(
            filters.slice(0, selectedIndex),
            filters.slice(selectedIndex + 1),
          );
        }

        setFilters(newFilters);
        setPage(0);
    };

    const handleRefresh = async () => {
        await refetch();
        onRefresh();
    }

    return (
        <>
        <Card>
            <TableToolbar 
                filterName={filterName}
                onRefresh={handleRefresh}
                onFilterName={handleFilterByName}
                onFilter={() => setDrawer(!drawer)}
            />

           <Box sx={{ overflow: 'auto' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 900 }}>
                        <TableHead
                            order={order}
                            orderBy={orderBy}
                            officeId={officeId}
                            onRequestSort={handleRequestSort}
                            headLabel={[
                                { id: 'name', label: 'Name', width: 250 },
                                { id: 'basis', label: 'Basis' },
                                { id: 'type', label: 'Type' },
                                { id: 'localDue', label: 'Regional Deadline', align: "right" },
                                { id: 'nationalDue', label: 'National Deadline', align: "right" },
                                { id: 'status', label: 'Status', align: "right" },
                                { id: 'id', align: "right", width: 20 }
                            ]}
                        />

                        <TableBody>
                            {visibleRows.map(report => 
                                <TableRow 
                                    key={report.id}
                                    report={report}
                                    officeId={officeId}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            )}

                            {visibleRows.length === 0 &&
                                <TableEmptyRow sx={{ height: 80 }}>
                                    <TableCell align="center" colSpan={6}>
                                        No results found.
                                    </TableCell>
                                </TableEmptyRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
           </Box>

            <TablePagination
                page={page}
                component="div"
                count={reportList.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[10, 25, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>

        <Suspense>
            <FilterDrawer
                open={drawer}
                selected={filters}
                onFilter={handleFilter}
                onClose={() => setDrawer(!drawer)}
                onClear={() => setFilters([])}
                filters={[
                    {
                        name: 'Types',
                        options: Array.from(new Set(reportList.map(report => report.type))).map(type => ({
                            value: type,
                            label: capitalCase(type)
                        }))
                    },
                    {
                        name: 'Status',
                        options: Array.from(new Set(reportList.map(report => report.status))).map(status => ({
                            value: status,
                            label: capitalCase(status)
                        }))
                    }
                ]}
            />
        </Suspense>

        <Suspense>
            <Snackbar 
                severity='error' 
                message={getError?.message || subscribeError?.message || deleteError?.message} 
            />
        </Suspense>
        </>
    )
}