import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import { Iconify } from '../../../components';

export default function DocumentTableToolbar({
  filterName,
  onRefresh,
  onFilter,
  onFilterName 
}: { 
  filterName: string, 
  onRefresh: () => void,
  onFilter: () => void,
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void }
) {
    return (
      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'space-between',
          p: (theme) => theme.spacing(0, 1, 0, 3)
        }}
      >
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
  
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
