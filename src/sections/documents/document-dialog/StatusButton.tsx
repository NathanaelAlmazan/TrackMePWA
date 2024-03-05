import React, { useState } from 'react';

import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { Iconify, Snackbar } from '../../../components';

import { useMutation, useQuery } from '@apollo/client';
import { GET_STATUSES, UPDATE_DOCUMENT_STATUS } from '../../../graphql/documents';
import { Status } from '../../../__generated__/graphql';

// ----------------------------------------------------------------------

export default function StatusButton({ officeId, status, referenceNum }: { officeId?: number, status?: string, referenceNum: string }) {
  const { data: statuses, error: getError } = useQuery(GET_STATUSES, {
    fetchPolicy: 'no-cache'
  });
  const [updateStatus, { error: updateError }] = useMutation(UPDATE_DOCUMENT_STATUS);

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>(status ? status : "");

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleStatusChange = async (event: React.MouseEvent<unknown>, id: number) => {
    setOpen(null);
    
    const result = await updateStatus({
      variables: {
        referenceNum,
        statusId: id
      }
    })

    if (result.data) setCurrentStatus(result.data.documentUpdateStatus.label);
  }

  return (
    <>
      <Button
        variant='contained'
        onClick={handleOpen}
        endIcon={<Iconify icon='solar:alt-arrow-down-line-duotone' />}
      >
        {currentStatus}
      </Button>
      
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        {statuses && statuses.getDocumentStatus.filter(option => option.category === Status.Ongoing || officeId === undefined).map((option) => (
          <MenuItem key={option.label} onClick={(event) => handleStatusChange(event, parseInt(option.id))}>
            {option.label}
          </MenuItem>
        ))}
      </Popover>

      <Snackbar 
          severity='error' 
          message={getError?.message || updateError?.message} 
      />
    </>
  );
}
