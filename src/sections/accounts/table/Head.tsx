import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { AccountRow } from '.';

// ----------------------------------------------------------------------

export default function AccountTableHead({
    order,
    orderBy,
    headLabel,
    onRequestSort,
}: {
    order: "asc" | "desc",
    orderBy: string,
    headLabel: { 
        id: keyof AccountRow, 
        label?: string, 
        width?: number,
        minWidth?: number,
        align?: "center" | "left" | "right" | "justify" | "inherit" 
    }[],
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof AccountRow) => void
}) {
  const createSortHandler =
  (property: keyof AccountRow) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{
                    border: 0,
                    margin: -1,
                    padding: 0,
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    clip: 'rect(0 0 0 0)',
                }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}