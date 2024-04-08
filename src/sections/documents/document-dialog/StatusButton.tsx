import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { Iconify, Snackbar } from "../../../components";

import { useMutation, useQuery } from "@apollo/client";
import {
  GET_STATUSES,
  UPDATE_DOCUMENT_STATUS,
} from "../../../graphql/documents";
import { Role, Status } from "../../../__generated__/graphql";

// ----------------------------------------------------------------------

export default function StatusButton({
  officeId,
  status,
  referenceNum,
  role,
  onUpdate,
  admin,
}: {
  officeId?: number;
  status?: Status;
  referenceNum: string;
  role: Role;
  onUpdate: () => void;
  admin?: boolean;
}) {
  const { data: statuses, error: getError } = useQuery(GET_STATUSES, {
    fetchPolicy: "no-cache",
  });
  const [updateStatus, { error: updateError }] = useMutation(
    UPDATE_DOCUMENT_STATUS
  );

  const [error, setError] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<Status>(Status.Referred);

  useEffect(() => {
    if (status) setCurrentStatus(status);
  }, [status]);

  const handleStatusChange = async (
    event: React.MouseEvent<unknown>,
    category: Status
  ) => {
    if (!officeId) return;

    const statusId = statuses?.getDocumentStatus.find(
      (status) => status.category === category
    )?.id;

    if (!statusId) {
      setError("Status not found");
      return;
    }

    const result = await updateStatus({
      variables: {
        officeId,
        referenceNum,
        statusId: parseInt(statusId),
      },
    });

    if (result.data) setCurrentStatus(category);

    onUpdate();
  };

  return (
    <>
      {(role === Role.Superuser || role === Role.Director) && (
        <Button
          variant={admin ? "outlined" : "contained"}
          onClick={(event) =>
            handleStatusChange(
              event,
              currentStatus === Status.Finished
                ? Status.Referred
                : Status.Finished
            )
          }
          disabled={currentStatus === Status.NotActionable}
          endIcon={admin ? undefined : <Iconify icon="formkit:submit" />}
        >
          {currentStatus === Status.Finished ? "Reopen" : "Close"}
        </Button>
      )}

      {role === Role.Chief && (
        <Button
          variant={admin ? "outlined" : "contained"}
          onClick={(event) =>
            handleStatusChange(
              event,
              currentStatus === Status.Submitted
                ? Status.Referred
                : Status.Submitted
            )
          }
          disabled={currentStatus === Status.Finished || currentStatus === Status.NotActionable}
          endIcon={admin ? undefined : <Iconify icon="formkit:submit" />}
        >
          {currentStatus === Status.Submitted ? "Withdraw" : "Submit"}
        </Button>
      )}

      <Snackbar
        severity="error"
        message={error || getError?.message || updateError?.message}
      />
    </>
  );
}
