import React, { lazy, useEffect, Suspense } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { ChartSummary, Iconify, Snackbar } from '../../components';
import ReportTable from './table';

import { useQuery, useSubscription } from '@apollo/client';
import { SUBSCRIBE_OFFICE_EVENTS } from '../../graphql/users';
import { GET_REPORT_STATISTICS } from '../../graphql/reports';
import { ReportType, Role } from '../../__generated__/graphql';

import { useAppSelector } from '../../hooks';

const FormDialog = lazy(() => import('./form-dialog'));
const ViewDialog = lazy(() => import('./report-dialog'));

function authorize(role?: Role, office?: string) {
    if (!office) return undefined;

    if (role && [Role.Superuser, Role.Director, Role.HrAdmin].includes(role)) return undefined;
    else return parseInt(office);
}

export function parseType(type?: ReportType): string {
    switch (type) {
        case ReportType.Hr:
            return 'Human Resource Report';
        case ReportType.Admin:
            return 'Administrative Report';
        default:
            return '';
    }
}

export default function DeocumentsPage() {
    const { office, role } = useAppSelector((state) => state.auth);

    const { data: statistics, error: getError, refetch } = useQuery(GET_REPORT_STATISTICS, {
        variables: {
            officeId: authorize(role, office)
        }
    }); 
    const { data: officeEvents, error: subscribeError } = useSubscription(SUBSCRIBE_OFFICE_EVENTS);

    useEffect(() => {
        if (officeEvents) refetch();
    }, [officeEvents, refetch]);

    const [form, setForm] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<number | null>(null);
    const [submission, setSubmission] = React.useState<number | null>(null);

    const handleForm = () => {
        setForm(!form);
        setSelected(null);
    };

    const handleViewReport = (reportId: number) => {
        setSubmission(reportId);
    };

    const handleEditReport = (reportId: number) => {
        setSelected(reportId);
        setForm(true);
    };

    return (    
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Reports</Typography>

                {authorize(role, office) === undefined && (
                    <Button onClick={handleForm} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                        Create
                    </Button>
                )}
            </Stack>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <ChartSummary 
                        title="Total Reports"
                        total={statistics ? statistics.getReportStatistics.total : 0}
                        color="success"
                        icon={<Iconify icon='line-md:document-report-twotone' sx={{ width: 64, height: 64 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ChartSummary 
                        title="Submitted"
                        total={statistics ? statistics.getReportStatistics.submitted : 0}
                        color="success"
                        icon={<Iconify icon='ep:finished' sx={{ width: 64, height: 64 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ChartSummary 
                        title="Pending"
                        total={statistics ? statistics.getReportStatistics.pending : 0}
                        color="success"
                        icon={<Iconify icon='fluent-mdl2:processing' sx={{ width: 64, height: 64 }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ChartSummary 
                        title="Overdue"
                        total={statistics ? statistics.getReportStatistics.overdue : 0}
                        color="success"
                        icon={<Iconify icon='ic:twotone-warning' sx={{ width: 64, height: 64 }} />}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ReportTable 
                        officeId={authorize(role, office)}
                        onRefresh={() => refetch()} 
                        onView={handleViewReport}
                        onEdit={handleEditReport} 
                    />
                </Grid>
            </Grid>

            <Suspense>
                <FormDialog reportId={selected} open={form} onClose={handleForm} />
            </Suspense>
            
            {submission && (
                <Suspense>
                    <ViewDialog 
                        open={submission !== null} 
                        reportId={submission}
                        onClose={() => setSubmission(null)}  
                    />
                </Suspense>
            )}

            <Snackbar 
                severity='error' 
                message={getError?.message || subscribeError?.message} 
            />
        </Container>
    );
}