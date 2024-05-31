import { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { Snackbar } from "../../../components";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CREATE_OFFICER,
  GET_OFFICER_BY_ID,
  GET_OFFICES,
  GET_POSITIONS,
  UPDATE_OFFICER,
} from "../../../graphql/users";
import { Positions, Role } from "../../../__generated__/graphql";

interface OfficerInput {
  firstName: string;
  lastName: string;
  positionId: string;
  officeId: string;
}

function filterPositions(office: string, positions: Positions[]) {
  if (office.includes("Regional Director")) {
    return positions.filter(
      (pos) => pos.role === Role.Director || pos.role === Role.Officer
    );
  } else if (office.includes("Division")) {
    return positions.filter(
      (pos) =>
        (pos.role === Role.Chief &&
        pos.label.includes("Chief")) ||
        pos.role === Role.Officer
    );
  } else if (office.includes("Revenue District Office")) {
    return positions.filter(
      (pos) =>
        (pos.role === Role.Chief &&
        pos.label.includes("District Officer")) ||
        pos.role === Role.Officer
    );
  } else {
    return positions.filter((pos) => pos.role === Role.Officer);
  }
}

const formDefaults = {
  firstName: "",
  lastName: "",
  positionId: "",
  officeId: "",
};

export default function AccountDialog({
  open,
  onClose,
  officerId,
}: {
  open: boolean;
  onClose: () => void;
  officerId?: string | null;
}) {
  const [error, setError] = useState<string>();
  const [formData, setFormData] = useState<OfficerInput>(formDefaults);
  const [filteredPositions, setFilteredPositions] = useState<Positions[]>([]);

  const { firstName, lastName, positionId, officeId } = formData;

  const { data: positions, error: positionError } = useQuery(GET_POSITIONS);

  const { data: offices, error: officeError } = useQuery(GET_OFFICES);

  const [getOfficerById, { data: officer, error: officerError }] = useLazyQuery(
    GET_OFFICER_BY_ID,
    { fetchPolicy: "no-cache" }
  );

  const [createOfficer, { error: createError }] = useMutation(CREATE_OFFICER);
  const [updateOfficer, { error: updateError }] = useMutation(UPDATE_OFFICER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (formData.officeId && positions?.getPositions && offices?.getOffices) {
      const office = offices.getOffices.find(
        (office) => office.id === formData.officeId
      );

      if (office) {
        setFilteredPositions(
          filterPositions(
            office.name,
            positions.getPositions.map((pos) => ({
              id: pos.id,
              label: pos.label,
              role: pos.role,
            }))
          )
        );
      }
    }
  }, [formData.officeId, offices, positions]);

  useEffect(() => {
    if (officerId) {
      getOfficerById({ variables: { uuid: officerId } }).then(({ data }) => {
        if (data && data.getOfficerById) {
          setFormData({
            firstName: data.getOfficerById.firstName,
            lastName: data.getOfficerById.lastName,
            positionId: data.getOfficerById.position?.id.toString() || "",
            officeId: data.getOfficerById.office?.id.toString() || "",
          });
        }
      });
    }
  }, [officerId, getOfficerById]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (officerId) {
      const officer = await updateOfficer({
        variables: {
          uuid: officerId,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          positionId: parseInt(positionId),
          officeId: parseInt(officeId),
        },
      });

      if (officer.data && officer.data.updateOfficer) onClose();
      else setError("Failed to update account.");
    } else {
      const officer = await createOfficer({
        variables: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          positionId: parseInt(positionId),
          officeId: parseInt(officeId),
        },
      });

      if (officer.data && officer.data.createOfficer) onClose();
      else setError("Account already exists.");
    }

    setFormData(formDefaults); // reset form
  };

  const handleClose = () => {
    setFormData(formDefaults);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {officer
            ? `Edit ${
                officer.getOfficerById?.firstName +
                " " +
                officer.getOfficerById?.lastName
              } Profile`
            : "Create Officer"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2} sx={{ mb: 3 }}>
              <TextField
                name="firstName"
                label="First Name"
                value={firstName}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={handleChange}
                required
                fullWidth
              />

              {offices && (
                <TextField
                  name="officeId"
                  select
                  label="Office"
                  value={officeId}
                  onChange={handleChange}
                  required
                  fullWidth
                >
                  {offices.getOffices.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {positions && (
                <TextField
                  name="positionId"
                  select
                  label="Position"
                  value={positionId}
                  onChange={handleChange}
                  required
                  fullWidth
                >
                  {filteredPositions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="inherit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        severity="error"
        message={
          positionError?.message ||
          officeError?.message ||
          officerError?.message ||
          createError?.message ||
          error ||
          updateError?.message
        }
      />
    </>
  );
}
