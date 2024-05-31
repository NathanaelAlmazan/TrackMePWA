import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { MultiSelect, Snackbar } from "../../../components";

import { capitalCase } from "change-case";
import { Role } from "../../../__generated__/graphql";
import { useQuery, useMutation } from "@apollo/client";
import { GET_OFFICERS } from "../../../graphql/users";
import { ASSIGN_OFFICERS } from "../../../graphql/documents";

export default function DocumentDetails({
  role,
  officeId,
  documentId,
  receivedFrom,
  dateCreated,
  dateDue,
  referredTo,
  type,
  purpose,
  tag,
  directorAssigned,
  chiefAssigned,
}: {
  role?: Role;
  officeId?: number;
  documentId?: string;
  receivedFrom?: string;
  dateCreated?: string;
  dateDue?: string | null;
  referredTo?: string;
  type?: string;
  purpose?: string;
  tag?: string | null;
  directorAssigned?: {
    uuid: string;
    firstName: string;
    lastName: string;
    position?: string;
  }[];
  chiefAssigned?: {
    uuid: string;
    firstName: string;
    lastName: string;
    position?: string;
  }[];
}) {
  const [referrals, setReferrals] = useState<string[]>([]);
  const { data: officers, error: getError } = useQuery(GET_OFFICERS, {
    variables: {
      officeId: officeId ? [officeId] : [],
    },
  });
  const [assignOfficers, { error: assignError }] = useMutation(ASSIGN_OFFICERS);

  const handleReferralsChange = (selected: string[]) => {
    setReferrals(selected);

    if (documentId) {
      assignOfficers({
        variables: {
          documentId,
          officerIds: selected,
        },
      });
    }
  };

  useEffect(() => {
    if (
      role === Role.Chief &&
      directorAssigned?.length === 0 &&
      chiefAssigned &&
      officeId
    ) {
      setReferrals(chiefAssigned.map((officer) => officer.uuid));
    }
  }, [role, directorAssigned, chiefAssigned, officeId]);

  return (
    <>
      <Card variant="outlined">
        <CardHeader title="Details" />
        <Box
          sx={{
            maxHeight: { sm: "100%", md: "80vh" },
            overflowY: { sm: "inherit", md: "auto" },
          }}
        >
          <TableContainer>
            <Table size="small" aria-label="dense table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{type}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                      Purpose
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{purpose}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                      Tag
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {tag ? capitalCase(tag) : "None"}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                      Received From
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{receivedFrom}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                      Referred To
                    </Typography>
                  </TableCell>
                  {directorAssigned && directorAssigned.length !== 0 ? (
                    <TableCell>
                      {directorAssigned &&
                        directorAssigned.map((officer) => (
                          <Box key={officer.uuid}>
                            <Typography variant="body2">
                              {officer.firstName} {officer.lastName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {officer.position || ""}
                            </Typography>
                          </Box>
                        ))}
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Typography variant="body2">{referredTo}</Typography>
                    </TableCell>
                  )}
                </TableRow>

                {role === Role.Chief && directorAssigned?.length === 0 && (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle2" noWrap>
                        Assigned To
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {officers && (
                        <MultiSelect
                          name="assignedTo"
                          label="Assigned To"
                          selected={referrals}
                          required={false}
                          options={officers.getOfficers
                            .filter(
                              (officer) => officer.position?.role !== Role.Chief
                            )
                            .map((officer) => ({
                              id: officer.uuid,
                              label: officer.firstName + " " + officer.lastName,
                              description: officer.position?.label,
                            }))}
                          onChange={handleReferralsChange}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                      Date Received
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {dateCreated &&
                        new Date(dateCreated).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          weekday: "short",
                        })}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                      Date Due
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {dateDue
                        ? new Date(dateDue).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            weekday: "short",
                          })
                        : "None"}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      <Snackbar
        severity="error"
        message={getError?.message || assignError?.message}
      />
    </>
  );
}
