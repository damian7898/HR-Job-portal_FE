import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { useJobs } from '../context/JobContext';
import { formatCurrency, formatDate } from '../utils/formatters';

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, getJobById, deleteJob, loading } = useJobs();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const existing = jobs.find((item) => item.id === id);
    if (existing) {
      setJob(existing);
      return;
    }

    getJobById(id)
      .then(setJob)
      .catch((err) => setError(err.message));
  }, [id, jobs, getJobById]);

  const handleDelete = async () => {
    try {
      await deleteJob(id);
      navigate('/puestos');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading && !job) {
    return <Typography>Cargando detalles del puesto...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!job) {
    return <Typography>No se encontró el puesto solicitado.</Typography>;
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {job.titulo}
          </Typography>
          <Typography color="text.secondary">Detalle completo del puesto y estado de búsqueda.</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => navigate(`/puestos/${job.id}/editar`)}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Marcar inactivo
          </Button>
        </Stack>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                Área
              </Typography>
              <Typography>{job.area}</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                Modalidad
              </Typography>
              <Typography>{job.modalidad}</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                Seniority
              </Typography>
              <Typography>{job.seniority}</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                Ubicación
              </Typography>
              <Typography>{job.ubicacion}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            <Chip label={`Estado: ${job.estado}`} color={job.estado === 'Activo' ? 'success' : 'default'} />
            <Chip label={`Publicado: ${formatDate(job.fechaPublicacion)}`} />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>
            Descripción del puesto
          </Typography>
          <Typography sx={{ mb: 2 }}>{job.descripcion}</Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            Requisitos
          </Typography>
          <Stack component="ul" sx={{ pl: 3, mb: 2 }}>
            {job.requisitos.map((requirement, index) => (
              <Typography component="li" key={`${job.id}-req-${index}`}>
                {requirement}
              </Typography>
            ))}
          </Stack>

          <Typography variant="h6" sx={{ mb: 1 }}>
            Rango salarial
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {formatCurrency(job.salarioMinimo)} - {formatCurrency(job.salarioMaximo)}
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            Detalles adicionales
          </Typography>
          <Typography>La búsqueda se mantiene abierta hasta su cierre o actualización de estado.</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default JobDetail;
