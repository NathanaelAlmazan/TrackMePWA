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
  assigned,
}: {
  role?: Role;
  officeId?: number;
  documentId?: string;
  receivedFrom?: string;
  dateCreated?: string;
  dateDue?: string;
  referredTo?: string;
  type?: string;
  purpose?: string;
  tag?: string | null;
  assigned?: string[];
}) {
  const [referrals, setReferrals] = useState<string[]>([]);
  const { data: officers, error: getError } = useQuery(GET_OFFICERS, {
    variables: {
      officeId: officeId,
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
    if (role === Role.Chief && assigned && officeId) {
      setReferrals(assigned);
    }
  }, [role, assigned, officeId]);

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
                  <TableCell>
                    <Typography variant="body2">{referredTo}</Typography>
                  </TableCell>
                </TableRow>

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
                      {dateDue &&
                        new Date(dateDue).toLocaleDateString(undefined, {
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
                      Document Type
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

                {role === Role.Chief && (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle2" noWrap>
                        Assigned
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {officers && (
                        <MultiSelect
                          name="assignedTo"
                          label="Assigned To"
                          selected={referrals}
                          options={officers.getOfficers
                            .filter(
                              (officer) => officer.position?.role !== Role.Chief
                            )
                            .map((officer) => ({
                              id: officer.uuid,
                              label: officer.firstName + " " + officer.lastName,
                            }))}
                          onChange={handleReferralsChange}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )}
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
