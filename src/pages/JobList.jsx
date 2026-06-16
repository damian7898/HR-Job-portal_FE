import { useMemo } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import FilterBar from '../components/FilterBar';
import JobCard from '../components/JobCard';
import PaginationControls from '../components/PaginationControls';

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

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Buscador de vacantes
          </Typography>
          <Typography color="text.secondary">
            Encuentra las oportunidades más relevantes por área, modalidad y seniority.
          </Typography>
        </Box>
        <Button component={RouterLink} to="/puestos/nuevo" variant="contained">
          Publicar puesto
        </Button>
      </Stack>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <FilterBar filters={filters} onChange={setFilters} />

        {loading ? (
          <Typography>Cargando vacantes...</Typography>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {filteredJobs.length} vacante(s) disponibles
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
                No se encontraron resultados con esos filtros. Ajusta tu búsqueda y vuelve a intentar.
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
