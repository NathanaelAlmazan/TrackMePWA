import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Snackbar, Spreadsheet } from "../../components";
import BarChart from "./charts";

import { useQuery, useSubscription } from "@apollo/client";
import { SUBSCRIBE_OFFICE_EVENTS } from "../../graphql/users";
import { GET_REPORT_SUMMARY } from "../../graphql/reports";
import { GET_DOCUMENT_SUMMARY } from "../../graphql/documents";

interface ChartData {
  name: string;
  data: number[];
}

function formatOfficeAbbr(offices: string[]): string[] {
  return offices.map((office) => {
    return office
      .split(" ")
      .filter((word) => !["of", "the"].includes(word.toLowerCase()))
      .map((word) => {
        if (isNaN(parseInt(word))) return word.charAt(0).toUpperCase();
        else return `-${parseInt(word).toString()}`;
      })
      .join("");
  });
}

export default function DashboardPage() {
  const {
    data: documents,
    error: documentsError,
    refetch: refetchDocuments,
  } = useQuery(GET_DOCUMENT_SUMMARY);
  const {
    data: reports,
    error: reportsError,
    refetch: refetchReports,
  } = useQuery(GET_REPORT_SUMMARY);
  const { data: officeEvents, error: subscribeError } = useSubscription(
    SUBSCRIBE_OFFICE_EVENTS
  );

  const [offices, setOffices] = useState<string[]>([]);
  const [documentStats, setDocumentStats] = useState<ChartData[]>([]);
  const [reportStats, setReportStats] = useState<ChartData[]>([]);

  useEffect(() => {
    if (documents) {
      setOffices(
        formatOfficeAbbr(
          documents.getDocumentSummary.map((stat) => stat.office)
        )
      );
    }
  }, [documents]);

  useEffect(() => {
    if (documents) {
      setDocumentStats([
        {
          name: "Ongoing",
          data: documents.getDocumentSummary.map((stat) => stat.ongoing),
        },
        {
          name: "Closed",
          data: documents.getDocumentSummary.map((stat) => stat.closed),
        },
        {
          name: "Not Actionable",
          data: documents.getDocumentSummary.map((stat) => stat.noaction),
        },
      ]);
    }
  }, [documents]);

  useEffect(() => {
    if (reports) {
      setReportStats([
        {
          name: "Ongoing",
          data: reports.getReportSummary.map((stat) => stat.pending),
        },
        {
          name: "Submitted",
          data: reports.getReportSummary.map((stat) => stat.submitted),
        },
      ]);
    }
  }, [reports]);

  useEffect(() => {
    if (officeEvents) {
      refetchDocuments();
      refetchReports();
    }
  }, [officeEvents, refetchDocuments, refetchReports]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Good Day 👋</Typography>

            <Spreadsheet />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <BarChart
            title="Documents"
            subheader="Summary from January 01, 2024 to March 31, 2024"
            labels={offices}
            series={documentStats}
          />
        </Grid>

        <Grid item xs={12}>
          <BarChart
            title="Reports"
            subheader="Summary from January 01, 2024 to March 31, 2024"
            labels={offices}
            series={reportStats}
          />
        </Grid>
      </Grid>

      <Snackbar
        severity="error"
        message={
          documentsError?.message ||
          subscribeError?.message ||
          reportsError?.message
        }
      />
    </Container>
  );
}
