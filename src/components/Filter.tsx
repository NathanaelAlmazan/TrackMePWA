import React from "react";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Iconify } from ".";

export default function FilterDrawer({
  open,
  selected,
  filters,
  onFilter,
  onClose,
  onClear,
}: {
  open: boolean;
  selected: readonly string[];
  filters: { name: string; options: { value: string; label: string }[] }[];
  onFilter: (value: string) => void;
  onClose: () => void;
  onClear: () => void;
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ position: "relative" }}
    >
      <Stack spacing={3} sx={{ width: 250, p: 3 }}>
        <Typography variant="h5">Filters</Typography>

        <Divider />

        {filters
          .filter((filter) => filter.options.length > 0)
          .map((filter) => (
            <React.Fragment key={filter.name}>
              <FormControl>
                <FormLabel sx={{ mb: 2 }}>{filter.name}</FormLabel>
                <FormGroup>
                  {filter.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={selected.includes(option.value)}
                          onChange={(event) => onFilter(option.value)}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <Divider />
            </React.Fragment>
          ))}
      </Stack>

      <Stack sx={{ position: "absolute", bottom: 0, right: 0, left: 0, p: 2 }}>
        <Button
          onClick={onClear}
          variant="outlined"
          startIcon={<Iconify icon="ic:round-clear-all" />}
        >
          Clear Filters
        </Button>
      </Stack>
    </Drawer>
  );
}
