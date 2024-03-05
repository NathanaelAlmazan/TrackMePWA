import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Label, Iconify, DeleteDialog } from '../../../components';
import { AccountRow } from '.';

import { capitalCase } from 'change-case';

// ----------------------------------------------------------------------

export default function AccountTableRow({
  officer,
  onEdit,
  onDelete,
  onActivate
}: {
  officer: AccountRow,
  onEdit: (event: React.MouseEvent<unknown>, id: string) => void,
  onDelete: (event: React.MouseEvent<unknown>, id: string) => void,
  onActivate: (event: React.MouseEvent<unknown>, id: string, active: boolean) => void
}) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [dialog, setDialog] = useState<boolean>(false);

  const handleEditAccount = (event: React.MouseEvent<unknown>) => {
    onEdit(event, officer.uuid);
    setOpen(null);
  };

  const handleActivateAccount = (event: React.MouseEvent<unknown>) => {
    onActivate(event, officer.uuid, officer.status === "active" ? false : true);
    setOpen(null);
  };

  const handleDeleteAccount = (event: React.MouseEvent<unknown>) => {
    onDelete(event, officer.uuid);
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
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={officer.name} src={officer.avatar} />
            <Typography variant="subtitle2" noWrap>
              {officer.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          {officer.office}
        </TableCell>

        <TableCell>
          {officer.position}
        </TableCell>

        <TableCell>
          {capitalCase(officer.role)}
        </TableCell>

        <TableCell align="right" sx={{ width: 50 }}>
          <Label color={officer.status === "active" ? "success" : "error"}>{capitalCase(officer.status)}</Label>
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
          sx: { width: 200 },
        }}
      >
        <MenuItem onClick={handleActivateAccount}>
          <Iconify icon={officer.status === "active" ? "material-symbols:lock" : "material-symbols:lock-open"} sx={{ mr: 2 }} />
          {officer.status === "active" ? "Deactivate" : "Activate"}
        </MenuItem>

        <MenuItem onClick={handleEditAccount}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => setDialog(true)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <DeleteDialog 
        open={dialog}
        onClose={() => setDialog(false)}
        onDelete={handleDeleteAccount}
      />
    </>
  );
}