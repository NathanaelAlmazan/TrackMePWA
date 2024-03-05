import { useState, useEffect, useMemo } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableEmptyRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import TableHead from './Head';
import TableToolbar from './Toolbar';
import TableRow from './Row';
import { Snackbar } from '../../../components';

import { useMutation, useQuery } from '@apollo/client';
import { ACTIVATE_OFFICER, DELETE_OFFICER, GET_OFFICERS } from '../../../graphql/users';

export interface AccountRow {
    uuid: string;
    name: string;
    position: string;
    role: string;
    office: string;
    status: string;
    avatar: string;
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
  
function getComparator<Key extends keyof AccountRow>(
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

export default function AccountTable({
    refresh,
    onEdit
}: {
    refresh: boolean,
    onEdit: (uuid: string) => void
}) {
    const { data: officers, error: getError, refetch } = useQuery(GET_OFFICERS);

    const [page, setPage] = useState<number>(0);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof AccountRow>('name');
    const [filterName, setFilterName] = useState<string>('');
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [officerList, setOfficerList] = useState<AccountRow[]>([]);

    const [deleteOfficer, { error: deleteError }] = useMutation(DELETE_OFFICER);
    const [activateOfficer, { error: activateError }] = useMutation(ACTIVATE_OFFICER);

    useEffect(() => {
        if (officers) {
            setOfficerList(officers.getOfficers.map(officer => ({
                uuid: officer.uuid,
                name: officer.firstName + " " + officer.lastName,
                position: officer.position?.label || "",
                role: officer.position?.role || "",
                office: officer.office?.name || "",
                status: officer.active ? "active" : "inactive",
                avatar: officer.avatar
            })));
        }
    }, [officers]);

    useEffect(() => { refetch() }, [refresh, refetch]);

    const visibleRows = useMemo(
        () =>
          stableSort<AccountRow>(officerList.filter(officer => 
                officer.name.includes(filterName) || officer.office.includes(filterName) || officer.position.includes(filterName) || filterName.length === 0
            ), getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          ),
        [officerList, filterName, order, orderBy, page, rowsPerPage],
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
        property: keyof AccountRow,
      ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleEdit = (event: React.MouseEvent<unknown>, uuid: string) => onEdit(uuid);
    
    const handleActivate = async (event: React.MouseEvent<unknown>, uuid: string, active: boolean) => {
        await activateOfficer({
            variables: {
                uuid: uuid,
                active: active
            }
        });

        await refetch();
    }

    const handleDelete = async (event: React.MouseEvent<unknown>, uuid: string) => {
        await deleteOfficer({
            variables: {
                uuid: uuid
            }
        });

        await refetch();
    };

    const handleRefresh = async () => {
        await refetch();
    };

    return (
        <>
            <Card>
                <TableToolbar 
                    filterName={filterName}
                    onRefresh={handleRefresh}
                    onFilterName={handleFilterByName}
                />
                <Box sx={{ overflow: 'auto' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 900 }}>
                            <TableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                headLabel={[
                                    { id: 'name', label: 'Name', width: 250 },
                                    { id: 'office', label: 'Office' },
                                    { id: 'position', label: 'Position' },
                                    { id: 'role', label: 'Role' },
                                    { id: 'status', label: 'Status', align: "right" },
                                    { id: 'uuid', align: "right", width: 20 }
                                ]}
                            />

                            <TableBody>
                                {visibleRows.map(officer => 
                                    <TableRow 
                                        key={officer.uuid}
                                        officer={officer}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onActivate={handleActivate}
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
                    count={officerList.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[10, 25, 50]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            <Snackbar 
                severity='error' 
                message={getError?.message || deleteError?.message || activateError?.message} 
            />
        </>
    );
}   