import { TextField } from '@mui/material';

function JobFormField({ name, label, value, onChange, type = 'text', error, helperText, multiline = false, rows = 1, select, children, ...props }) {
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
      sx={{
        '& .MuiInputLabel-root': { color: 'var(--color-muted)' },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'var(--color-bg)',
          '& fieldset': { borderColor: 'var(--color-border)' },
          '&:hover fieldset': { borderColor: 'var(--color-primary)' },
          '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
        },
      }}
      {...props}
    >
      {children}
    </TextField>
  );
}

export default JobFormField;
