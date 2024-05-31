import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id: any, selected: readonly any[], theme: Theme) {
  return {
    fontWeight:
      selected.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface SelectProps {
  name: string;
  label: string;
  selected: readonly any[];
  options: { id: any; label: string; description?: string }[];
  helperText?: string;
  required: boolean;
  onChange: (selected: any[]) => void;
}

export default function MultipleSelectChip(props: SelectProps) {
  const { name, label, selected, options, helperText, required, onChange } =
    props;

  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== "string") onChange(value as any[]);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          multiple
          value={selected}
          onChange={handleChange}
          required={required}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={options?.find((option) => option.id === value)?.label}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              style={getStyles(option.id, selected, theme)}
            >
              <Typography component="div" variant="body1">
                {option.label}

                {option.description && (
                  <Typography
                    component="p"
                    variant="caption"
                    color="textSecondary"
                  >
                    {option.description}
                  </Typography>
                )}
              </Typography>
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
}
