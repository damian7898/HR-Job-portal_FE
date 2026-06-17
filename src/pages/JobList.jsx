import { useMemo } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import FilterBar from '../components/FilterBar';
import JobCard from '../components/JobCard';
import PaginationControls from '../components/PaginationControls';
import { useTranslation } from '../hooks/useTranslation';

function JobList() {
  const { jobs, filters, setFilters, loading } = useJobs();

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) =>
        job.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.descripcion.toLowerCase().includes(filters.search.toLowerCase())
      )
      .filter((job) => (filters.area ? job.area === filters.area : true))
      .filter((job) => (filters.modalidad ? job.modalidad === filters.modalidad : true))
      .filter((job) => (filters.seniority ? job.seniority === filters.seniority : true))
      .sort((a, b) => {
        if (filters.sort === 'asc') {
          return new Date(a.fechaPublicacion) - new Date(b.fechaPublicacion);
        }
        return new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion);
      });
  }, [jobs, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / filters.perPage));
  const paginatedJobs = filteredJobs.slice((filters.page - 1) * filters.perPage, filters.page * filters.perPage);

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const { t } = useTranslation();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {t('jobList.title')}
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)' }}>
            {t('jobList.subtitle')}
          </Typography>
        </Box>
        <Button component={RouterLink} to="/puestos/nuevo" variant="contained">
          {t('jobList.publishJob')}
        </Button>
      </Stack>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <FilterBar filters={filters} onChange={setFilters} />

        {loading ? (
          <Typography>{t('jobList.loading')}</Typography>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {t('jobList.resultsCount', `${filteredJobs.length} vacante(s) disponibles`).replace('{count}', filteredJobs.length)}
            </Typography>
            <Grid container spacing={2}>
              {paginatedJobs.map((job) => (
                <Grid item xs={12} md={6} lg={4} key={job.id}>
                  <JobCard job={job} />
                </Grid>
              ))}
            </Grid>
            {filteredJobs.length === 0 && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
                {t('jobList.empty')}
              </Typography>
            )}
            <PaginationControls currentPage={filters.page} totalPages={totalPages} onChange={handlePageChange} />
          </>
        )}
      </Paper>
    </Box>
  );
}

export default JobList;
