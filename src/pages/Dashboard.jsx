import { useMemo } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { useJobs } from '../context/JobContext';
import { useCandidates } from '../context/CandidateContext';
import JobCard from '../components/JobCard';
import CandidateCard from '../components/CandidateCard';
import { useTranslation } from '../hooks/useTranslation';

function Dashboard() {
  const { jobs, loading: jobsLoading } = useJobs();
  const { candidates, loading: candidatesLoading } = useCandidates();

  const jobsSummary = useMemo(() => {
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

  const candidateSummary = useMemo(() => {
    const disponibles = candidates.filter((candidate) => candidate.status === 'Disponible').length;
    const enProceso = candidates.filter((candidate) => candidate.status === 'En proceso').length;
    const contratados = candidates.filter((candidate) => candidate.status === 'Contratado').length;
    return {
      total: candidates.length,
      disponibles,
      enProceso,
      contratados,
    };
  }, [candidates]);

  const recentJobs = useMemo(() => {
    return [...jobs]
      .sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion))
      .slice(0, 3);
  }, [jobs]);

  const recentCandidates = useMemo(() => {
    return [...candidates]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [candidates]);

  const { t } = useTranslation();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {t('dashboard.welcomeTitle')}
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)' }}>
            {t('dashboard.welcomeSubtitle')}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button component={RouterLink} to="/puestos" variant="contained">
            {t('dashboard.viewJobs')}
          </Button>
          <Button component={RouterLink} to="/candidatos" variant="contained">
            {t('dashboard.viewCandidates')}
          </Button>
        </Stack>
      </Stack>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {t('dashboard.vacanciesSummary')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard title={t('dashboard.cards.totalJobs.title')} value={jobsSummary.total} subtitle={t('dashboard.cards.totalJobs.subtitle')} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title={t('dashboard.cards.activeJobs.title')} value={jobsSummary.activos} subtitle={t('dashboard.cards.activeJobs.subtitle')} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title={t('dashboard.cards.inactiveJobs.title')} value={jobsSummary.inactivos} subtitle={t('dashboard.cards.inactiveJobs.subtitle')} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title={t('dashboard.cards.remoteJobs.title')} value={jobsSummary.remoto} subtitle={t('dashboard.cards.remoteJobs.subtitle')} />
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {t('dashboard.latestJobs')}
          </Typography>
          <Typography color="text.secondary">{t('dashboard.autoUpdated')}</Typography>
        </Stack>

        {jobsLoading ? (
          <Typography>{t('dashboard.loadingJobs')}</Typography>
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

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, mt: 5 }}>
        {t('dashboard.candidatesSummary')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard title="Total de candidatos" value={candidateSummary.total} subtitle="Todos los candidatos registrados." />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Disponibles" value={candidateSummary.disponibles} subtitle="Candidatos listos para entrevistar." />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="En proceso" value={candidateSummary.enProceso} subtitle="Candidatos en evaluación activa." />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Contratados" value={candidateSummary.contratados} subtitle="Candidatos con oferta aceptada." />
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {t('dashboard.latestCandidates')}
          </Typography>
          <Typography color="text.secondary">{t('dashboard.autoUpdated')}</Typography>
        </Stack>

        {candidatesLoading ? (
          <Typography>{t('dashboard.loadingCandidates')}</Typography>
        ) : (
          <Grid container spacing={2}>
            {recentCandidates.map((candidate) => (
              <Grid item xs={12} md={4} key={candidate.id}>
                <CandidateCard candidate={candidate} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

export default Dashboard;
