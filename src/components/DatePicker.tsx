import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerValue({
  value,
  label,
  disable = false,
  onChange,
}: {
  value: Dayjs | null;
  label: string;
  disable?: boolean;
  onChange: (value: Dayjs | null) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        disabled={disable}
        onChange={(newValue) => onChange(newValue)}
      />
    </LocalizationProvider>
  );
}
