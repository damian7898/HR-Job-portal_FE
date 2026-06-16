import { Card, CardActions, CardContent, Chip, Stack, Typography, Button } from '@mui/material';
import { formatDate } from '../utils/formatters';
import { Link as RouterLink } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h6" component="div">
            {job.titulo}
          </Typography>
          <Chip label={job.estado} color={job.estado === 'Activo' ? 'success' : 'default'} size="small" />
        </Stack>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {job.area} · {job.modalidad} · {job.seniority}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {job.descripcion}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip label={job.ubicacion} size="small" />
          <Chip label={`Publicada: ${formatDate(job.fechaPublicacion)}`} size="small" />
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button component={RouterLink} to={`/puestos/${job.id}`} size="small">
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;
