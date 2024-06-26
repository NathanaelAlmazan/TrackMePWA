import { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import dayjs, { Dayjs } from "dayjs";

import { MultiSelect, DatePicker, Snackbar } from "../../../components";
import {
  GET_OFFICERS,
  GET_OFFICES,
  GET_SIGNATORIES,
} from "../../../graphql/users";
import {
  GET_PURPOSES,
  GET_STATUSES,
  GET_TYPES,
  GET_TEMP_REF_NUM,
  CREATE_DOCUMENT,
  GET_DOCUMENT_BY_ID,
  UPDATE_DOCUMENT,
} from "../../../graphql/documents";
import { Status, Tags } from "../../../__generated__/graphql";

interface DocumentForm {
  subject: string;
  description: string;
  receivedFrom: string;
  typeId: string;
  purposeIds: string;
  statusId: string;
  signatureId: string;
  tag: string;
}

const formDefaults = {
  subject: "",
  description: "",
  receivedFrom: "",
  typeId: "",
  purposeIds: "",
  statusId: "",
  signatureId: "",
  tag: "",
};

export const BIN_OFFICE = 20;

const filter = createFilterOptions<any>();

export default function FormDialog({
  referenceNum,
  officerId,
  open,
  onClose,
}: {
  referenceNum: string | null;
  officerId: string;
  open: boolean;
  onClose: () => void;
}) {
  // fetch options
  const { data: offices, error: officeError } = useQuery(GET_OFFICES, {
    fetchPolicy: "no-cache",
  });
  const { data: purposes, error: purposeError } = useQuery(GET_PURPOSES, {
    fetchPolicy: "no-cache",
  });
  const { data: statuses, error: statusError } = useQuery(GET_STATUSES, {
    fetchPolicy: "no-cache",
  });
  const { data: types, error: typesError } = useQuery(GET_TYPES, {
    fetchPolicy: "no-cache",
  });
  const { data: signatories, error: signatoryError } = useQuery(
    GET_SIGNATORIES,
    {
      fetchPolicy: "no-cache",
    }
  );
  const {
    data: reference,
    error: referenceError,
    refetch,
  } = useQuery(GET_TEMP_REF_NUM, {
    fetchPolicy: "no-cache",
  });

  const [getDocumentById, { error: getError }] = useLazyQuery(
    GET_DOCUMENT_BY_ID,
    {
      fetchPolicy: "no-cache",
    }
  );
  const [getOfficers, { error: officersError }] = useLazyQuery(GET_OFFICERS, {
    fetchPolicy: "no-cache",
  });

  const [createDocument, { error: createError }] = useMutation(CREATE_DOCUMENT);
  const [updateDocument, { error: updateError }] = useMutation(UPDATE_DOCUMENT);

  const [referrals, setReferrals] = useState<number[]>([]);
  const [deadline, setDeadline] = useState<Dayjs>(dayjs(new Date()));
  const [disableDeadline, setDisableDeadline] = useState(false);
  const [formData, setFormData] = useState<DocumentForm>(formDefaults);
  const [officers, setOfficers] = useState<
    { uuid: string; firstName: string; lastName: string; position?: string }[]
  >([]);
  const [assigned, setAssigned] = useState<
    {
      id: string;
      label: string;
      description: string | undefined;
    }[]
  >([]);

  const {
    subject,
    description,
    receivedFrom,
    typeId,
    purposeIds,
    statusId,
    signatureId,
    tag,
  } = formData;

  useEffect(() => {
    if (referenceNum) {
      getDocumentById({ variables: { referenceNum, officerId } }).then(
        ({ data }) => {
          if (data) {
            setFormData({
              subject: data.getDocumentById.subject,
              description: data.getDocumentById.description,
              receivedFrom: data.getDocumentById.receivedFrom,
              typeId: data.getDocumentById.type
                ? data.getDocumentById.type.id.toString()
                : "",
              purposeIds: data.getDocumentById.purpose
                ? data.getDocumentById.purpose.map((p) => p.id).join(",")
                : "",
              tag: data.getDocumentById.tag ? data.getDocumentById.tag : "",
              signatureId: data.getDocumentById.signatory.uuid,
              statusId: "",
            });

            if (data.getDocumentById.dateDue) {
              setDeadline(dayjs(new Date(data.getDocumentById.dateDue)));
            }
            setReferrals(
              data.getDocumentById.referredTo.map((ref) =>
                parseInt(ref.office.id)
              )
            );
            setAssigned(
              data.getDocumentById.directorAssigned.map((officer) => ({
                id: officer.uuid,
                label: `${officer.firstName} ${officer.lastName}`,
                description:
                  officer.office?.name + " / " + officer.position?.label,
              }))
            );
            setDisableDeadline(data.getDocumentById.dateDue ? false : true);
          }
        }
      );
    } else {
      setFormData(formDefaults);
      setDeadline(dayjs(new Date()));
      setReferrals([]);
    }
  }, [referenceNum, officerId, getDocumentById]);

  useEffect(() => {
    if (referrals.length > 0) {
      getOfficers({
        variables: {
          officeId: referrals,
        },
      })
        .then(({ data }) => {
          if (data) {
            setOfficers(
              data.getOfficers.map((officer) => ({
                uuid: officer.uuid,
                firstName: officer.firstName,
                lastName: officer.lastName,
                position:
                  officer.office?.name + " / " + officer.position?.label,
              }))
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [referrals, getOfficers]);

  const handleReferralsChange = (selected: number[]) => {
    setReferrals(selected);
  };

  const handleAssignedChange = (selected: any[]) => {
    setAssigned(selected);
  };

  const handlePurposeChange = (selected: string[]) => {
    setFormData({
      ...formData,
      purposeIds: selected.filter((p) => p !== "").join(","),
    });
  };

  const handleDeadlineChange = (newValue: Dayjs | null) => {
    if (!newValue) return;
    setDeadline(newValue);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisableDeadline(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (referenceNum) {
      await updateDocument({
        variables: {
          referenceNum: referenceNum,
          subject,
          purposeIds,
          description,
          receivedFrom,
          typeId: parseInt(typeId),
          signatureId: signatureId,
          tag: tag.length === 0 ? null : (tag as Tags),
          dateDue: disableDeadline ? null : deadline.toISOString(),
          assignedTo: assigned.map((officer) => officer.id),
        },
      });
    } else {
      const referredTo = referrals;

      // include BIN office if there are outsourced officers
      if (referredTo.length === 0 && assigned.filter(officer => officer.id.includes("Add")).length > 0) {
        referredTo.push(BIN_OFFICE);
      }

      await createDocument({
        variables: {
          subject,
          description,
          purposeIds,
          receivedFrom,
          typeId: parseInt(typeId),
          signatureId: signatureId,
          tag: tag.length === 0 ? null : (tag as Tags),
          referredTo: referredTo.map((office) => ({
            officeId: office,
            statusId: parseInt(statusId),
          })),
          dateDue: disableDeadline ? null : deadline.toISOString(),
          assignedTo: assigned.map((officer) => officer.id),
        },
      });
    }

    // clear form data
    setFormData(formDefaults);
    setDeadline(dayjs(new Date()));
    setReferrals([]);

    await refetch(); // get new reference number
    onClose(); // close dialog
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {reference && (
                  <Typography variant="h6">
                    {`#${
                      referenceNum
                        ? referenceNum
                        : reference.getTempReferenceNum
                    }`}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="subject"
                      label="Subject"
                      variant="outlined"
                      value={subject}
                      onChange={handleFormChange}
                      multiline
                      rows={referenceNum ? 5 : 4}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Remarks"
                      variant="outlined"
                      value={description}
                      onChange={handleFormChange}
                      multiline
                      rows={referenceNum ? 4 : 3}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="receivedFrom"
                      label="Received From"
                      variant="outlined"
                      value={receivedFrom}
                      onChange={handleFormChange}
                      fullWidth
                      required
                    />
                  </Grid>

                  {offices && !referenceNum && (
                    <Grid item xs={12}>
                      <MultiSelect
                        name="referredTo"
                        label="Referred To"
                        selected={referrals}
                        required={assigned.length === 0}
                        options={offices.getOffices.map((office) => ({
                          id: parseInt(office.id),
                          label: office.name,
                        }))}
                        onChange={handleReferralsChange}
                      />
                    </Grid>
                  )}

                  {!referenceNum && (
                    <Grid item xs={12}>
                      <Autocomplete
                        multiple
                        options={officers.map((officer) => ({
                          id: officer.uuid,
                          label: `${officer.firstName} ${officer.lastName}`,
                          description: officer.position,
                        }))}
                        value={assigned}
                        onChange={(_, newValue) => {
                          const outsourced = newValue.filter(
                            (obj) =>
                              obj.id.includes("Add") &&
                              !officers.find(
                                (officer) => officer.uuid === obj.id
                              )
                          );
                          if (outsourced.length > 0) {
                            setOfficers([
                              ...officers,
                              ...outsourced.map((obj) => ({
                                uuid: obj.id,
                                firstName: obj.label.split(" ", 2)[0],
                                lastName: obj.label.split(" ", 2)[1],
                                position: "",
                              })),
                            ]);
                          }

                          handleAssignedChange(newValue);
                        }}
                        getOptionKey={(option) => option.id}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => {
                          return option.id === value.id;
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              id: `Add ${params.inputValue}`,
                              label: `"${params.inputValue}"`,
                              description: "",
                            });
                          }

                          return filtered;
                        }}
                        renderOption={(props, option) => (
                          <Box component="li" {...props}>
                            <Box
                              component="div"
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography variant="body1">
                                {option.label}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {option.description}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Assigned To"
                          />
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Stack spacing={2}>
                  {types && (
                    <TextField
                      name="typeId"
                      select
                      label="Document Type"
                      value={typeId}
                      onChange={handleFormChange}
                      variant="outlined"
                      required
                      fullWidth
                    >
                      {types.getDocumentTypes.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  {purposes && (
                    <MultiSelect
                      name="purposeIds"
                      label="Document Purpose"
                      required={true}
                      selected={purposeIds.split(",").filter((p) => p !== "")}
                      options={purposes.getDocumentPurposes.map((purpose) => ({
                        id: purpose.id,
                        label: purpose.label,
                      }))}
                      onChange={handlePurposeChange}
                    />
                  )}

                  {statuses && !referenceNum && (
                    <TextField
                      name="statusId"
                      select
                      label="Document Status"
                      value={statusId}
                      onChange={handleFormChange}
                      variant="outlined"
                      required
                      fullWidth
                    >
                      {statuses.getDocumentStatus
                        .filter(
                          (status) =>
                            status.category === Status.Referred ||
                            status.category === Status.NotActionable ||
                            referenceNum
                        )
                        .map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}

                  <TextField
                    name="tag"
                    select
                    label="Document Tag"
                    variant="outlined"
                    value={tag}
                    onChange={handleFormChange}
                    fullWidth
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="CONFIDENTIAL">Confidential</MenuItem>
                    <MenuItem value="TOP_PRIORITY">Top Priority</MenuItem>
                    <MenuItem value="FOLLOW_UP">Follow Up</MenuItem>
                  </TextField>

                  <Stack>
                    <DatePicker
                      label="Deadline"
                      value={deadline}
                      disable={disableDeadline}
                      onChange={handleDeadlineChange}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={disableDeadline}
                          onChange={handleEnableChange}
                        />
                      }
                      label="No Deadline"
                    />
                  </Stack>

                  {signatories && (
                    <TextField
                      name="signatureId"
                      select
                      label="Signatory"
                      value={signatureId}
                      onChange={handleFormChange}
                      variant="outlined"
                      required
                      fullWidth
                    >
                      {signatories.getSignatories.map((option) => (
                        <MenuItem key={option.uuid} value={option.uuid}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={option.lastName} src={option.avatar} />
                            <Typography variant="subtitle2" noWrap>
                              {`${option.firstName} ${option.lastName}`}
                            </Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button variant="contained" color="inherit" type="submit">
                Save
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        severity="error"
        message={
          officeError?.message ||
          purposeError?.message ||
          createError?.message ||
          updateError?.message ||
          statusError?.message ||
          typesError?.message ||
          referenceError?.message ||
          getError?.message ||
          signatoryError?.message ||
          officersError?.message
        }
      />
    </>
  );
}
