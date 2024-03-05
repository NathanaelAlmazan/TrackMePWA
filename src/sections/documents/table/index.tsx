import { useState, useEffect, useMemo, lazy, Suspense } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableEmptyRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableToolbar from './Toolbar';
import TableHead from './Head';
import TableRow from './Row';

import { capitalCase } from 'change-case';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_DOCUMENTS, DELETE_DOCUMENT } from '../../../graphql/documents';
import { SUBSCRIBE_OFFICE_EVENTS } from '../../../graphql/users';

const Snackbar = lazy(() => import('../../../components/Snackbar'));
const FilterDrawer = lazy(() => import('../../../components/Filter'));

export interface DocumentRow {
    referenceNum: string;
    subject: string;
    receivedFrom: string;
    status: string;
    refferedTo: string;
    dateCreated: string;
    tag: string;
}

export function formatReferrals(offices: string[]): string {
    return offices.map(office => {
        return office.split(' ').map(word => {
            if (isNaN(parseInt(word))) 
                return word.charAt(0).toUpperCase();
            else
                return `-${parseInt(word).toString()}`;
        }).join('');
    }).join(', ');
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
  
function getComparator<Key extends keyof DocumentRow>(
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

export default function DocumentTable({
    officeId,
    onRefresh,
    onView,
    onEdit
}: {
    officeId?: number,
    onRefresh: () => void,
    onView: (referenceNum: string) => void,
    onEdit: (referenceNum: string) => void
}) {
    const { data: documents, error: getError, refetch } = useQuery(GET_DOCUMENTS, {
        variables: {
            officeId
        }
    }); 
    const { data: officeEvents, error: subscribeError } = useSubscription(SUBSCRIBE_OFFICE_EVENTS);

    const [drawer, setDrawer] = useState<boolean>(false);
    const [filters, setFilters] = useState<readonly string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof DocumentRow>('referenceNum');
    const [filterName, setFilterName] = useState<string>('');
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [documentList, setDocumentList] = useState<DocumentRow[]>([]);

    const [deleteDocument, { error: deleteError }] = useMutation(DELETE_DOCUMENT);

    useEffect(() => {
        if (documents) {
            setDocumentList(documents.getDocuments.map(doc => ({
                referenceNum: doc.referenceNum,
                subject: doc.subject,
                receivedFrom: doc.receivedFrom,
                refferedTo: formatReferrals(doc.refferedTo.map(office => office.name)),
                dateCreated: new Date(doc.dateCreated).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
                status: doc.status ? `${capitalCase(doc.status.category)}_${capitalCase(doc.status.label)}` : "",
                tag: doc.tag ? capitalCase(doc.tag) : ""
            })));
        }
    }, [documents]);

    useEffect(() => {
        if (officeEvents) refetch();
    }, [officeEvents, refetch]);

    const visibleRows = useMemo(
        () =>
          stableSort<DocumentRow>(documentList.filter(document => 
                (document.referenceNum.includes(filterName) || document.subject.includes(filterName) || filterName.length === 0) &&
                (filters.includes(document.status) || filters.includes(document.tag) || filters.length  === 0)
            ), getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          ),
        [documentList, filterName, order, orderBy, page, rowsPerPage, filters],
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
        property: keyof DocumentRow,
      ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleView = (event: React.MouseEvent<unknown>, id: string) => onView(id);
    const handleEdit = (event: React.MouseEvent<unknown>, id: string) => onEdit(id);
    
    const handleDelete = async (event: React.MouseEvent<unknown>, id: string) => {
        await deleteDocument({
            variables: {
                referenceNum: id
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
                            onRequestSort={handleRequestSort}
                            headLabel={[
                                { id: 'referenceNum', label: 'Reference' },
                                { id: 'subject', label: 'Subject', width: 250 },
                                { id: 'dateCreated', label: 'Date', align: "right" },
                                { id: 'receivedFrom', label: 'Received From', align: "right" },
                                { id: 'refferedTo', label: 'Referred To', align: "right" },
                                { id: 'status', label: 'Status', align: "right", width: 50 },
                                { id: 'tag', align: "right", width: 20 }
                            ]}
                        />

                        <TableBody>
                            {visibleRows.map(document => 
                                <TableRow 
                                    key={document.referenceNum}
                                    officeId={officeId}
                                    document={document}
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
                count={documentList.length}
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
                        name: 'Status',
                        options: Array.from(new Set(documentList.map(doc => doc.status))).map(status => ({
                            value: status,
                            label: capitalCase(status.split('_')[0])
                        }))
                    },
                    {
                        name: 'Tags',
                        options: Array.from(new Set(documentList.filter(doc => doc.tag).map(doc => doc.tag))).map(tag => ({
                            value: tag,
                            label: capitalCase(tag)
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