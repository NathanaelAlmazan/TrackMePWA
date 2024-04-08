import React, { lazy, useEffect, Suspense } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { ChartSummary, Iconify, Snackbar } from "../../components";

import { useQuery, useSubscription } from "@apollo/client";
import { GET_DOCUMENT_STATISTICS } from "../../graphql/documents";
import { SUBSCRIBE_OFFICE_EVENTS } from "../../graphql/users";
import { Role } from "../../__generated__/graphql";

import { useAppSelector } from "../../hooks";

const FormDialog = lazy(() => import("./form-dialog"));
const ViewDialog = lazy(() => import("./document-dialog"));
const DocumentTable = lazy(() => import("./table"));

function authorize(role?: Role, office?: string) {
  if (!office) return undefined;

  if (role && [Role.Superuser, Role.Director].includes(role)) return undefined;
  else return parseInt(office);
}

export default function DeocumentsPage() {
  const { uuid, office, role } = useAppSelector((state) => state.auth);

  const {
    data: statistics,
    error: getError,
    refetch,
  } = useQuery(GET_DOCUMENT_STATISTICS, {
    variables: {
      officeId: authorize(role, office),
    },
  });
  const { data: officeEvents, error: subscribeError } = useSubscription(
    SUBSCRIBE_OFFICE_EVENTS
  );

  useEffect(() => {
    if (officeEvents) refetch();
  }, [officeEvents, refetch]);

  const [form, setForm] = React.useState<boolean>(false);
  const [view, setView] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleFormDocument = () => {
    setForm(!form);
    setSelected(null);
  };

  const handleViewDocument = (referenceNum: string) => {
    setSelected(referenceNum);
    setView(!view);
  };

  const handleEditDocument = (referenceNum: string) => {
    setSelected(referenceNum);
    setForm(true);
  };

  const handleCloseView = () => {
    setView(false);
    setSelected(null);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Documents</Typography>

        {authorize(role, office) === undefined && (
          <Button
            onClick={handleFormDocument}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create
          </Button>
        )}
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <ChartSummary
            title="Referred"
            total={statistics ? statistics.getDocumentStatistics.referred : 0}
            color="success"
            icon={
              <Iconify
                icon="ic:twotone-forward-to-inbox"
                sx={{ width: 64, height: 64 }}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ChartSummary
            title="Closed"
            total={statistics ? statistics.getDocumentStatistics.closed : 0}
            color="success"
            icon={<Iconify icon="ep:finished" sx={{ width: 64, height: 64 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ChartSummary
            title="Ongoing"
            total={statistics ? statistics.getDocumentStatistics.ongoing : 0}
            color="success"
            icon={
              <Iconify
                icon="fluent-mdl2:processing"
                sx={{ width: 64, height: 64 }}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ChartSummary
            title="No Action"
            total={statistics ? statistics.getDocumentStatistics.noaction : 0}
            color="success"
            icon={
              <Iconify
                icon="ic:twotone-sticky-note-2"
                sx={{ width: 64, height: 64 }}
              />
            }
          />
        </Grid>

        {uuid && (
          <Grid item xs={12}>
            <DocumentTable
              officerId={uuid}
              officeId={authorize(role, office)}
              onRefresh={() => refetch()}
              onView={handleViewDocument}
              onEdit={handleEditDocument}
            />
          </Grid>
        )}
      </Grid>

      <Suspense>
        {form && uuid && (
          <FormDialog
            open={form}
            officerId={uuid}
            referenceNum={selected}
            onClose={handleFormDocument}
          />
        )}
      </Suspense>

      {selected && uuid && role && (
        <Suspense>
          <ViewDialog
            open={view}
            role={role}
            officerId={uuid}
            referenceNum={selected}
            onClose={handleCloseView}
            officeId={authorize(role, office)}
          />
        </Suspense>
      )}

      <Snackbar
        severity="error"
        message={getError?.message || subscribeError?.message}
      />
    </Container>
  );
}
