import { useMemo } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/JobCard';

function Dashboard() {
  const { jobs, loading } = useJobs();

  const summary = useMemo(() => {
    const activos = jobs.filter((job) => job.estado === 'Activo').length;
    const inactivos = jobs.filter((job) => job.estado === 'Inactivo').length;
    const remoto = jobs.filter((job) => job.modalidad === 'Remoto').length;
    return {
      total: jobs.length,
      activos,
      inactivos,
      remoto,
    };
  }, [jobs]);

  const recentJobs = useMemo(() => {
    return [...jobs]
      .sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion))
      .slice(0, 3);
  }, [jobs]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Bienvenido al panel de RR.HH.
          </Typography>
          <Typography color="text.secondary">
            Resumen de puestos, vacantes activas y oportunidades publicadas.
          </Typography>
        </Box>
        <Button component={RouterLink} to="/puestos" variant="contained">
          Ver vacantes
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard title="Total de puestos" value={summary.total} subtitle="Todas las búsquedas activas e inactivas." />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Activos" value={summary.activos} subtitle="Puestos disponibles para publicar." />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Inactivos" value={summary.inactivos} subtitle="Puestos desactivados o cerrados." />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Remoto" value={summary.remoto} subtitle="Vacantes con modalidad remota." />
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Últimas vacantes publicadas
          </Typography>
          <Typography color="text.secondary">Actualizado automáticamente</Typography>
        </Stack>

        {loading ? (
          <Typography>Cargando vacantes...</Typography>
        ) : (
          <Grid container spacing={2}>
            {recentJobs.map((job) => (
              <Grid item xs={12} md={4} key={job.id}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

export default Dashboard;
