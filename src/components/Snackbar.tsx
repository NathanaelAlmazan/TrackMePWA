import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

export default function SnackbarMessage({
  message,
  severity,
}: {
  message?: string;
  severity: AlertColor;
}) {
  return (
    <Snackbar open={message !== undefined} autoHideDuration={6000}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
