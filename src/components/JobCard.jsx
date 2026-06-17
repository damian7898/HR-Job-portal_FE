import { Card, CardActions, CardContent, Chip, Stack, Typography, Button } from '@mui/material';
import { formatDate } from '../utils/formatters';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

function JobCard({ job }) {
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderColor: 'var(--border-default)',
        backgroundColor: 'var(--card-bg)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            {job.titulo}
          </Typography>
          <Chip
            label={job.estado}
            size="small"
            sx={{
              backgroundColor: job.estado === 'Activo' ? 'rgba(31,111,29,0.15)' : 'var(--bg-muted)',
              color: job.estado === 'Activo' ? '#1a7f37' : 'var(--text-secondary)',
              fontWeight: 700,
            }}
          />
        </Stack>

        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', gutterBottom: 2 }}>
          {job.area} · {job.modalidad} · {job.seniority}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-primary)', mb: 2 }}>
          {job.descripcion}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip label={job.ubicacion} size="small" sx={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }} />
          <Chip label={`Publicada: ${formatDate(job.fechaPublicacion)}`} size="small" sx={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }} />
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button component={RouterLink} to={`/puestos/${job.id}`} size="small" sx={{ color: 'var(--primary)', fontWeight: 700 }}>
          {t('buttons.view')}
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;
