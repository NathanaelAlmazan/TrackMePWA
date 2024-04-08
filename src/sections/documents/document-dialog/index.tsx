import { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { Iconify, ReferenceSlip, Snackbar, Label } from "../../../components";
import CommentField from "./CommentField";
import CommentCard from "./CommentCard";
import DocumentDetails from "./DocumentDetails";
import StatusButton from "./StatusButton";

import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_DOCUMENT_BY_ID,
  SUBSCRIBE_DOCUMENT_EVENTS,
} from "../../../graphql/documents";
import { Officers, Role, Status } from "../../../__generated__/graphql";
import { capitalCase } from "change-case";

function statusColor(status: Status) {
  switch (status) {
    case Status.Finished:
      return "success";
    case Status.NotActionable:
      return "info";
    default:
      return "warning";
  }
}

export default function DocumentDialog({
  officerId,
  officeId,
  role,
  referenceNum,
  open,
  onClose,
}: {
  officerId: string;
  officeId?: number;
  role: Role;
  referenceNum: string;
  open: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();
  const [statusList, setStatusList] = useState<HTMLButtonElement | null>(null);

  const {
    data: document,
    error: getError,
    refetch,
  } = useQuery(GET_DOCUMENT_BY_ID, {
    fetchPolicy: "no-cache",
    variables: {
      officerId,
      referenceNum,
    },
  });
  const { data: documentEvents, error: subscribeError } = useSubscription(
    SUBSCRIBE_DOCUMENT_EVENTS,
    {
      fetchPolicy: "no-cache",
      variables: {
        referenceNum,
      },
    }
  );

  useEffect(() => {
    if (documentEvents) refetch();
  }, [documentEvents, refetch]);

  const handleOpenStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStatusList(event.currentTarget);
  };

  const handleCloseStatus = () => {
    setStatusList(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8}>
              <Stack
                spacing={3}
                sx={{
                  maxHeight: { sm: "100%", md: "80vh" },
                  overflow: { sm: "inherit", md: "auto" },
                  p: 2,
                }}
              >
                <Box>
                  <Typography variant="h6">
                    {`#${document?.getDocumentById.referenceNum}`}
                  </Typography>
                  <Typography variant="h3">
                    {document?.getDocumentById.subject}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body1">
                    {document?.getDocumentById.description}
                  </Typography>
                </Box>

                <Divider>Messages</Divider>

                <Stack
                  spacing={2}
                  sx={{
                    backgroundColor: theme.palette.grey[200],
                    p: 2,
                    borderRadius: 3,
                  }}
                >
                  {document &&
                    document.getDocumentById.comments.map((comment) => (
                      <CommentCard
                        key={comment.id}
                        senderName={[
                          comment.sender.firstName,
                          comment.sender.lastName,
                        ].join(" ")}
                        senderId={comment.sender.uuid}
                        recipientName={[
                          comment.recipient.firstName,
                          comment.recipient.lastName,
                        ].join(" ")}
                        recipientId={comment.recipient.uuid}
                        message={comment.message}
                      />
                    ))}

                  {document &&
                    document.getDocumentById.comments.length === 0 && (
                      <Typography variant="subtitle1">
                        No Comment Yet.
                      </Typography>
                    )}
                </Stack>

                <Divider>Compose</Divider>

                {referenceNum && (
                  <CommentField
                    officerId={officerId}
                    documentId={referenceNum}
                    onComment={() => refetch()}
                    recipients={
                      document?.getDocumentById.recipients as Officers[]
                    }
                  />
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ position: "relative" }}>
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {document &&
                      ![Role.Superuser, Role.Director].includes(role) && (
                        <StatusButton
                          role={role}
                          officeId={officeId}
                          status={
                            document.getDocumentById.referredTo.find(
                              (ref) => parseInt(ref.office.id) === officeId
                            )?.status.category
                          }
                          referenceNum={document.getDocumentById.referenceNum}
                          onUpdate={() => refetch()}
                        />
                      )}

                    {document &&
                      [Role.Superuser, Role.Director].includes(role) && (
                        <>
                          <Button
                            onClick={handleOpenStatus}
                            variant="contained"
                            endIcon={
                              <Iconify icon="solar:alt-arrow-down-line-duotone" />
                            }
                          >
                            {document.getDocumentById.status}
                          </Button>

                          <Popover
                            open={!!statusList}
                            anchorEl={statusList}
                            onClose={handleCloseStatus}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            PaperProps={{
                              sx: {
                                p: 0,
                                mt: 1,
                                ml: 0.75,
                                width: 500,
                              },
                            }}
                          >
                            <List>
                              {document.getDocumentById.referredTo.map(
                                (ref) => (
                                  <ListItem key={ref.office.id}>
                                    <ListItemText
                                      primary={ref.office.name}
                                      secondary={
                                        <Label
                                          color={statusColor(
                                            ref.status.category
                                          )}
                                        >
                                          {capitalCase(ref.status.category)}
                                        </Label>
                                      }
                                    />
                                    <ListItemIcon>
                                      <StatusButton
                                        admin
                                        role={role}
                                        status={ref.status.category}
                                        officeId={parseInt(ref.office.id)}
                                        referenceNum={
                                          document.getDocumentById.referenceNum
                                        }
                                        onUpdate={() => refetch()}
                                      />
                                    </ListItemIcon>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Popover>
                        </>
                      )}

                    <PDFDownloadLink
                      document={<ReferenceSlip document={document} />}
                      fileName={`${referenceNum}.pdf`}
                    >
                      {({ url }) =>
                        url && (
                          <Button
                            onClick={() => window.open(url, "_blank")}
                            variant="contained"
                            endIcon={
                              <Iconify icon="ant-design:export-outlined" />
                            }
                          >
                            Export
                          </Button>
                        )
                      }
                    </PDFDownloadLink>
                  </Stack>

                  <IconButton onClick={onClose} sx={{ width: 50, height: 50 }}>
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <DocumentDetails
                  role={role}
                  officeId={officeId}
                  documentId={document?.getDocumentById.referenceNum}
                  receivedFrom={document?.getDocumentById.receivedFrom}
                  referredTo={document?.getDocumentById.referredTo
                    .map((ref) => ref.office.name)
                    .join(", ")}
                  type={document?.getDocumentById.type?.label}
                  purpose={document?.getDocumentById.purpose?.label}
                  dateCreated={document?.getDocumentById.dateCreated}
                  dateDue={document?.getDocumentById.dateDue}
                  tag={document?.getDocumentById.tag}
                  assigned={document?.getDocumentById.assigned
                    .filter((officer) => officer.position?.role !== Role.Chief)
                    .map((officer) => officer.uuid)}
                />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Snackbar
        severity="error"
        message={getError?.message || subscribeError?.message}
      />
    </>
  );
}
