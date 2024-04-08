import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooptip from "@mui/material/Tooltip";
import { useTheme, alpha } from "@mui/material/styles";

import { Iconify, Label } from "../components";

import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { GET_REPORT_STATUS } from "../graphql/reports";
import { Events, Frequency } from "../__generated__/graphql";
import { GET_DOCUMENT_BY_ID_STATUS } from "../graphql/documents";

import { capitalCase } from "change-case";

export function convertTo2DArray(array: Date[]) {
  const result = [];
  const numRows = 5;
  const numCols = 7;

  for (let i = 0; i < numRows; i++) {
    result.push(array.slice(i * numCols, (i + 1) * numCols));
  }

  return result;
}

export function generateDates(startDate: Date, endDate: Date) {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return convertTo2DArray(dates);
}

export function filterEvents(events: Events[], date: Date) {
  return events.filter((event) => {
    const dateDue = event.dateDue ? new Date(event.dateDue) : null;

    if (event.frequency === Frequency.Monthly)
      return (
        new Date(event.date).getDate() === date.getDate() ||
        dateDue?.getDate() === date.getDate()
      );
    return (
      (new Date(event.date).getMonth() === date.getMonth() ||
        dateDue?.getMonth() === date.getMonth()) &&
      (new Date(event.date).getDate() === date.getDate() ||
        dateDue?.getDate() === date.getDate())
    );
  });
}

export default function Calendar({
  events,
  officeId,
  currentDate,
  selectedDate,
  onSelectDate,
  onEditEvent,
  onDeleteEvent,
}: {
  events: Events[];
  officeId?: number;
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onEditEvent: (event: React.MouseEvent<unknown>, id: number) => void;
  onDeleteEvent: (event: React.MouseEvent<unknown>, id: number) => void;
}) {
  const [dates, setDates] = useState<Date[][]>([]);

  useEffect(() => {
    const firstDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    firstDate.setDate(firstDate.getDate() - firstDate.getDay());

    const lastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    lastDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

    setDates(generateDates(firstDate, lastDate));
  }, [currentDate]);

  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed", width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">SUN</TableCell>
            <TableCell align="left">MON</TableCell>
            <TableCell align="left">TUE</TableCell>
            <TableCell align="left">WED</TableCell>
            <TableCell align="left">THU</TableCell>
            <TableCell align="left">FRI</TableCell>
            <TableCell align="left">SAT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dates.map((week, index) => (
            <TableRow key={index}>
              {week.map((day) => (
                <TableCell
                  key={day.getDay()}
                  align="center"
                  sx={{
                    width: `${100 / 7}%`,
                    verticalAlign: "top",
                  }}
                >
                  <Stack spacing={1} sx={{ minHeight: 80 }}>
                    {day.toDateString() === selectedDate.toDateString() ? (
                      <Box sx={{ mb: 2 }}>
                        <Avatar sx={{ bgcolor: "black" }}>
                          {day.getDate()}
                        </Avatar>
                      </Box>
                    ) : (
                      <Typography
                        onClick={() => onSelectDate(day)}
                        component="div"
                        variant="h5"
                        align="left"
                        sx={{
                          mb: 2,
                          cursor: "pointer",
                          opacity:
                            day.getMonth() === currentDate.getMonth() ? 1 : 0.5,
                        }}
                      >
                        {day.getDate()}
                      </Typography>
                    )}

                    {events &&
                      filterEvents(events, day).map((event) => (
                        <EventLabel
                          key={event.subject}
                          date={day}
                          event={event}
                          officeId={officeId}
                          onEdit={onEditEvent}
                          onDelete={onDeleteEvent}
                        />
                      ))}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function EventLabel({
  event,
  date,
  officeId,
  onEdit,
  onDelete,
}: {
  date: Date;
  event: Events;
  officeId?: number;
  onEdit: (event: React.MouseEvent<unknown>, id: number) => void;
  onDelete: (event: React.MouseEvent<unknown>, id: number) => void;
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<string | null>(null);

  const [getDocumentStatus] = useLazyQuery(GET_DOCUMENT_BY_ID_STATUS);
  const [getReportStatus] = useLazyQuery(GET_REPORT_STATUS);

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    switch (event.type) {
      case "DOCUMENT":
        getDocumentStatus({ variables: { referenceNum: event.id } }).then(
          ({ data }) => {
            if (data && data.getDocumentById) {
              setStatus(data.getDocumentById.status || null);
              setCompleted(data.getDocumentById.status === "Finished");
              setRedirect("/documents");
            }
          }
        );
        break;
      case "ADMIN_REPORT":
      case "HR_REPORT":
        if (event.id === event.subject) {
          if (date.getTime() < new Date(event.date).getTime()) {
            setStatus("Completed");
            setCompleted(true);
          } else {
            setStatus("Not Yet Submitted");
            setCompleted(false);
          }
        } else {
          getReportStatus({ variables: { id: parseInt(event.id) } }).then(
            ({ data }) => {
              if (data && data.getSubmittedReportById) {
                const pending = data.getSubmittedReportById.pending;

                setStatus(pending > 0 ? `${pending} Pending` : "Completed");
                setCompleted(pending === 0);
                setRedirect("/reports");
              }
            }
          );
        }
        break;
      default:
        setStatus(null);
    }
  }, [event, date, getDocumentStatus, getReportStatus]);

  return (
    <>
      <Typography
        onClick={handleOpen}
        component="div"
        variant="subtitle2"
        sx={{
          textAlign: "left",
          bgcolor: status
            ? completed
              ? alpha(theme.palette.success.light, 0.5)
              : alpha(theme.palette.warning.light, 0.5)
            : alpha(theme.palette.primary.light, 0.5),
          color: status
            ? completed
              ? theme.palette.success.dark
              : theme.palette.warning.dark
            : theme.palette.primary.dark,
          borderRadius: "10px",
          px: "8px",
          py: "5px",
          cursor: "pointer",
        }}
        noWrap
      >
        {event.subject}
      </Typography>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 250,
            maxHeight: 500,
            overflowY: "auto",
          },
        }}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          {event.image && (
            <Box component="img" alt="event_img" src={event.image} />
          )}

          <Box>
            <Typography variant="subtitle1">{event.subject}</Typography>
            {status && (
              <Label color={completed ? "success" : "warning"}>{status}</Label>
            )}
          </Box>

          <Typography component="div" variant="body2">
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="subtitle2"
            >
              {capitalCase(event.type as string)}
            </Typography>
            {` — ${event.description}`}
          </Typography>

          {redirect && (
            <Box
              onClick={() => navigate(redirect)}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button endIcon={<Iconify icon="uil:arrow-right" />}>
                See More
              </Button>
            </Box>
          )}

          {event.type === "EVENT" && officeId === undefined && (
            <Stack direction="row" justifyContent="end">
              <Tooptip title="Edit">
                <IconButton onClick={(e) => onEdit(e, parseInt(event.id))}>
                  <Iconify icon="eva:edit-fill" />
                </IconButton>
              </Tooptip>
              <Tooptip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e) => onDelete(e, parseInt(event.id))}
                >
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooptip>
            </Stack>
          )}
        </Stack>
      </Popover>
    </>
  );
}
