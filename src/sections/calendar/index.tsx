import { useState, lazy, useEffect, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Toolbar from './Toolbar';
import { Iconify, Calendar, Snackbar, PdfCalendar, Loader } from '../../components';

import { Events, Role } from '../../__generated__/graphql';
import { useAppSelector, useResponsive } from '../../hooks';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_EVENT, GET_EVENTS } from '../../graphql/reports';

const FormDialog = lazy(() => import('./form-dialog'));
const FilterDrawer = lazy(() => import('../../components/Filter'));

function authorize(role?: Role, office?: string) {
    if (!office) return undefined;

    if (role && [Role.Superuser, Role.Director].includes(role)) return undefined;
    else return parseInt(office);
}

export default function CalendarPage() {
    const upLg = useResponsive('up', 'lg', 'xl');
    const { office, role } = useAppSelector((state) => state.auth);
    
    const [form, setForm] = useState<boolean>(false);
    const [drawer, setDrawer] = useState<boolean>(false);
    const [filters, setFilters] = useState<readonly string[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [currentDate, setCurrenttDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const { data: events, error: getError, refetch } = useQuery(GET_EVENTS, {
        variables: {
            officeId: authorize(role, office),
            date: new Date(currentDate).toISOString()
        }
    }); 
    
    const [deleteEvent, { error: deleteError }] = useMutation(DELETE_EVENT);

    useEffect(() => {
        refetch({
            officeId: authorize(role, office),
            date: new Date(currentDate).toISOString()
        });
    }, [currentDate, role, office, refetch]);

    const visibleEvents: Events[] = useMemo(
        () => 
            events ? events.getEvents.filter(event => (event.type && filters.includes(event.type)) || filters.length === 0) : [], 
        [events, filters]);

    const handleNextMonth = (event: React.MouseEvent<unknown>) => {
        const next = new Date(currentDate);
        next.setMonth(next.getMonth() + 1);

        setCurrenttDate(next);
    }

    const handlePreviousMonth = (event: React.MouseEvent<unknown>) => {
        const previous = new Date(currentDate);
        previous.setMonth(previous.getMonth() - 1);

        setCurrenttDate(previous);
    };

    const handleForm = () => {
        setForm(!form)
        setSelected(null);
        refetch({
            officeId: authorize(role, office),
            date: new Date(currentDate).toISOString()
        });
    };

    const handleEdit = (event: React.MouseEvent<unknown>, id: number) => {
        setSelected(id);
        setForm(true);
    };

    const handleDelete = async (event: React.MouseEvent<unknown>, id: number) => {
        await deleteEvent({
            variables: { id }
        });

        refetch({
            officeId: authorize(role, office),
            date: new Date(currentDate).toISOString()
        });
    };

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
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Stack direction="row" alignItems="center" justifyContent="start">

                    <IconButton onClick={handlePreviousMonth}>
                        <Iconify icon="uil:arrow-left"  />
                    </IconButton>

                    <Typography variant="h4">
                        {new Date(currentDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }).toUpperCase()}
                    </Typography>

                    <IconButton onClick={handleNextMonth} >
                        <Iconify icon="uil:arrow-right" />
                    </IconButton>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    {authorize(role, office) === undefined && (
                        <Button onClick={handleForm} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                            Create
                        </Button>
                    )}

                    <PDFDownloadLink 
                        document={<PdfCalendar events={visibleEvents} currentDate={currentDate} />} 
                        fileName={`${new Date(currentDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }).toUpperCase()}.pdf`}
                    >
                        {({ url }) => url && (
                           upLg ? (
                            <Button 
                                variant="outlined" 
                                onClick={() => window.open(url, '_blank')} 
                                startIcon={<Iconify icon='ant-design:export-outlined' />} 
                                sx={{ color: 'black', borderColor: 'black' }}
                            >
                                Export
                            </Button>
                        ) : (
                            <Button 
                                variant="outlined"
                                onClick={() => window.open(url, '_blank')}  
                                sx={{ color: 'black', borderColor: 'black' }}
                            >
                                <Iconify icon='ant-design:export-outlined' />
                            </Button>
                        )
                        )}
                    </PDFDownloadLink>
                </Stack>
                
            </Stack>

            <Card>
                <Toolbar 
                    onRefresh={() => refetch()}
                    onFilter={() => setDrawer(!drawer)}
                />

                <Calendar  
                    events={visibleEvents}
                    officeId={authorize(role, office)}
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onSelectDate={(date) => setSelectedDate(date)}
                    onEditEvent={handleEdit}
                    onDeleteEvent={handleDelete}
                />
            </Card>

            <Loader>
                <FilterDrawer
                    open={drawer}
                    selected={filters}
                    onFilter={handleFilter}
                    onClose={() => setDrawer(!drawer)}
                    onClear={() => setFilters([])}
                    filters={[
                        {
                            name: 'Types',
                            options: [
                                {
                                    label: 'Event',
                                    value: 'EVENT'
                                },
                                {
                                    label: 'HR Report',
                                    value: 'HR_REPORT'
                                },
                                {
                                    label: 'Admin Report',
                                    value: 'ADMIN_REPORT'
                                },
                                {
                                    label: 'Document',
                                    value: 'DOCUMENT'
                                }
                            ]
                        }
                    ]}
                />
            </Loader>
            
            <Loader>
                <FormDialog 
                    eventId={selected}
                    selectedDate={selectedDate}
                    open={form}
                    onClose={handleForm}
                />
            </Loader>

            <Snackbar 
                severity='error' 
                message={getError?.message || deleteError?.message} 
            />
        </Container>
    );
}