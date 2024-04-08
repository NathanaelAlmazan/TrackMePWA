import { useState } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { DocumentRow } from '.';
import { Label, Iconify, DeleteDialog } from '../../../components';
import { capitalCase } from 'change-case';

// ----------------------------------------------------------------------

function statusColor(status: string) {
  const category = status.toLowerCase();
  if (category.includes("ongoing") || category.includes("referred")) return "warning";
  else if (category.includes("finished")) return "success";
  else return "info";
}

export default function DocumentTableRow({
  officeId,
  document,
  onView,
  onEdit,
  onDelete
}: {
  officeId?: number,
  document: DocumentRow,
  onView: (event: React.MouseEvent<unknown>, id: string) => void,
  onEdit: (event: React.MouseEvent<unknown>, id: string) => void,
  onDelete: (event: React.MouseEvent<unknown>, id: string) => void
}) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [dialog, setDialog] = useState<boolean>(false);

  const handleViewDocument = (event: React.MouseEvent<unknown>) => {
    onView(event, document.referenceNum);
    setOpen(null);
  };

  const handleEditDocument = (event: React.MouseEvent<unknown>) => {
    onEdit(event, document.referenceNum);
    setOpen(null);
  };

  const handleDeleteDocument = (event: React.MouseEvent<unknown>) => {
    onDelete(event, document.referenceNum);
    setOpen(null);
    setDialog(false);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">

        <TableCell component="th" scope="row">
          <Typography variant="subtitle2" noWrap>
            {`#${document.referenceNum}`}
          </Typography>
        </TableCell>

        <TableCell sx={{ minWidth: 250 }}>
          <Typography variant="body2">
            {document.subject}
          </Typography>
          {document.tag && (
            <Label color="info">{document.tag}</Label>
          )}
        </TableCell>

        <TableCell align="right" sx={{ minWidth: 150 }}>
          {document.dateCreated}
        </TableCell>

        <TableCell align="right">
          {document.receivedFrom}
        </TableCell>

        <TableCell align="right" sx={{ maxWidth: 200 }}>
          {document.referredTo}
        </TableCell>

        <TableCell align="right" sx={{ width: 50 }}>
          <Label color={statusColor(document.status)}>{capitalCase(document.status)}</Label>
        </TableCell>

        <TableCell align="right" sx={{ width: 30 }}>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleViewDocument}>
          <Iconify icon="fluent-mdl2:review-solid" sx={{ mr: 2 }} />
          View
        </MenuItem>

        {officeId === undefined && (
          <MenuItem onClick={handleEditDocument}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        )}

        {officeId === undefined && (
          <MenuItem onClick={() => setDialog(true)} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        )}
      </Popover>

      <DeleteDialog 
        open={dialog}
        onClose={() => setDialog(false)}
        onDelete={handleDeleteDocument}
      />
    </>
  );
}