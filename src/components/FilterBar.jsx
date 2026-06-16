import { Box, Grid, MenuItem, TextField } from '@mui/material';
import { areas, modalidades, seniorities } from '../utils/formatters';

function FilterBar({ filters, onChange }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Buscar por palabra clave"
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value, page: 1 })}
            fullWidth
            size="small"
            sx={{ '& .MuiInputLabel-root': { color: 'var(--color-muted)' }, '& .MuiOutlinedInput-root': { backgroundColor: 'var(--color-bg)', '& fieldset': { borderColor: 'var(--color-border)' } } }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Área"
            value={filters.area}
            onChange={(event) => onChange({ ...filters, area: event.target.value, page: 1 })}
            select
            fullWidth
            size="small"
            sx={{ '& .MuiInputLabel-root': { color: 'var(--color-muted)' }, '& .MuiOutlinedInput-root': { backgroundColor: 'var(--color-bg)', '& fieldset': { borderColor: 'var(--color-border)' } } }}
          >
            <MenuItem value="">Todos</MenuItem>
            {areas.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Modalidad"
            value={filters.modalidad}
            onChange={(event) => onChange({ ...filters, modalidad: event.target.value, page: 1 })}
            select
            fullWidth
            size="small"
            sx={{ '& .MuiInputLabel-root': { color: 'var(--color-muted)' }, '& .MuiOutlinedInput-root': { backgroundColor: 'var(--color-bg)', '& fieldset': { borderColor: 'var(--color-border)' } } }}
          >
            <MenuItem value="">Todas</MenuItem>
            {modalidades.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Seniority"
            value={filters.seniority}
            onChange={(event) => onChange({ ...filters, seniority: event.target.value, page: 1 })}
            select
            fullWidth
            size="small"
            sx={{ '& .MuiInputLabel-root': { color: 'var(--color-muted)' }, '& .MuiOutlinedInput-root': { backgroundColor: 'var(--color-bg)', '& fieldset': { borderColor: 'var(--color-border)' } } }}
          >
            <MenuItem value="">Todos</MenuItem>
            {seniorities.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Ordenar por fecha"
            value={filters.sort}
            onChange={(event) => onChange({ ...filters, sort: event.target.value, page: 1 })}
            select
            fullWidth
            size="small"
            sx={{ '& .MuiInputLabel-root': { color: 'var(--color-muted)' }, '& .MuiOutlinedInput-root': { backgroundColor: 'var(--color-bg)', '& fieldset': { borderColor: 'var(--color-border)' } } }}
          >
            <MenuItem value="desc">Más recientes</MenuItem>
            <MenuItem value="asc">Más antiguos</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterBar;
