import Button from "@mui/material/Button";
import { Iconify, Snackbar } from ".";

import { useLazyQuery } from "@apollo/client";
import { GENERATE_REPORT } from "../graphql/reports";

export default function SpreadsheetExport() {
  const [generate, { error }] = useLazyQuery(GENERATE_REPORT);

  const exportSummary = () => {
    generate()
      .then((res) => {
        if (res.data) {
          window.open(res.data.generateReport, "_blank");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        onClick={exportSummary}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="ant-design:export-outlined" />}
      >
        Export
      </Button>
      {error && <Snackbar severity="error" message={error?.message} />}
    </>
  );
}
