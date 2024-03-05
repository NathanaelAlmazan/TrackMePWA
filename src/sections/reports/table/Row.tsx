import { useState, lazy, Suspense } from 'react';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Label, Iconify, DeleteDialog } from '../../../components';
import { ReportRow } from '.';

const CollapseTable = lazy(() => import('./Collapse'));

// ----------------------------------------------------------------------

export function statusColor(status: string) {
  switch (status) {
    case 'Ongoing':
      return 'warning';
    case 'Finished':
      return'success';
    case 'Not Started':
      return 'error';
    default:
      return 'info';
  }
}

export default function ReportTableRow({
  officeId,
  report,
  onView,
  onEdit,
  onDelete
}: {
  officeId?: number,
  report: ReportRow,
  onView: (event: React.MouseEvent<unknown>, id: number) => void,
  onEdit: (event: React.MouseEvent<unknown>, id: number) => void,
  onDelete: (event: React.MouseEvent<unknown>, id: number) => void
}) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [dialog, setDialog] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<boolean>(false);

  const handleViewReport = (event: React.MouseEvent<unknown>) => {
    onView(event, report.id);
    setOpen(null);
  };

  const handleEditReport = (event: React.MouseEvent<unknown>) => {
    onEdit(event, report.id);
    setOpen(null);
  };

  const handleDeleteReport = (event: React.MouseEvent<unknown>) => {
    onDelete(event, report.id);
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
        {officeId === undefined && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setCollapse(!collapse)}
            >
              {collapse ? <Iconify icon="ic:baseline-expand-less" /> : <Iconify icon="material-symbols:expand-more" />}
            </IconButton>
          </TableCell>
        )}
        

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2">
              {report.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell sx={{ minWidth: 150 }}>
          {report.basis}
        </TableCell>

        <TableCell>
          {report.type}
        </TableCell>

        <TableCell align="right" sx={{ width: 120 }}>
          {new Date(report.localDue).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </TableCell>

        <TableCell align="right" sx={{ width: 120 }}>
          {new Date(report.nationalDue).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </TableCell>

        {officeId === undefined ? (
          <TableCell align="right" sx={{ width: 50 }}>
            <Label color={report.pending > 0 ? "warning" : "success"}>
              {report.pending > 0 ? `${report.pending} Pending` : "Complied"}
            </Label>
          </TableCell>
        ) : (
          <TableCell align="right" sx={{ width: 50 }}>
            <Label color={statusColor(report.status)}>{report.status}</Label>
          </TableCell>
        )}

        <TableCell align="right" sx={{ width: 30 }}>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      
      {officeId === undefined && (
        <Suspense>
          <CollapseTable 
            collapse={collapse}
            reportId={report.id} 
            onView={onView}
          />
        </Suspense>
      )}

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
        {officeId && (
          <MenuItem onClick={handleViewReport}>
            <Iconify icon="fluent-mdl2:review-solid" sx={{ mr: 2 }} />
              Submit
          </MenuItem>
        )}

        {officeId === undefined && (
          <MenuItem onClick={handleEditReport}>
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
        onDelete={handleDeleteReport}
      />
    </>
  );
}