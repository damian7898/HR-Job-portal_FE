import { TextField } from '@mui/material';

function JobFormField({ name, label, value, onChange, type = 'text', error, helperText, multiline = false, rows = 1, select, children }) {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      error={Boolean(error)}
      helperText={helperText}
      fullWidth
      multiline={multiline}
      rows={rows}
      select={select}
      margin="normal"
      size="small"
    >
      {children}
    </TextField>
  );
}

export default JobFormField;
