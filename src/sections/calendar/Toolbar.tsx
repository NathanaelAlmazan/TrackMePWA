import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { Iconify } from '../../components';

export default function DocumentTableToolbar({
  onRefresh,
  onFilter,
}: { 
  onRefresh: () => void,
  onFilter: () => void 
}) {
    return (
      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'flex-end',
          p: (theme) => theme.spacing(0, 1, 0, 3)
        }}
      >
        <Stack direction='row'>
          <Tooltip title="Filter">
            <IconButton onClick={onFilter}>
              <Iconify icon="fluent:filter-20-filled" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Refresh">
            <IconButton onClick={onRefresh}>
              <Iconify icon="mdi:refresh" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    );
}
