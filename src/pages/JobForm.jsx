import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { areas, modalidades, seniorities } from '../utils/formatters';
import { createEmptyJob } from '../models/jobPosition';
import { useJobs } from '../context/JobContext';
import JobFormField from '../components/JobFormField';

function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, createJob, updateJob, loading } = useJobs();
  const [job, setJob] = useState(createEmptyJob());
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);

  useEffect(() => {
    if (!id) {
      setJob(createEmptyJob());
      return;
    }

    const existing = jobs.find((item) => item.id === id);
    if (existing) {
      setJob(existing);
    }
  }, [id, jobs]);

  const isEditMode = Boolean(id);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequisitosChange = (event) => {
    const lines = event.target.value.split('\n').map((item) => item.trim()).filter(Boolean);
    setJob((prev) => ({ ...prev, requisitos: lines }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!job.titulo) nextErrors.titulo = 'El título es requerido.';
    if (!job.area) nextErrors.area = 'El área es requerida.';
    if (!job.modalidad) nextErrors.modalidad = 'La modalidad es requerida.';
    if (!job.seniority) nextErrors.seniority = 'El seniority es requerido.';
    if (!job.descripcion) nextErrors.descripcion = 'La descripción es requerida.';
    if (!job.ubicacion) nextErrors.ubicacion = 'La ubicación es requerida.';
    if (job.salarioMinimo <= 0) nextErrors.salarioMinimo = 'El salario mínimo debe ser mayor a 0.';
    if (job.salarioMaximo <= 0) nextErrors.salarioMaximo = 'El salario máximo debe ser mayor a 0.';
    if (job.salarioMaximo < job.salarioMinimo) nextErrors.salarioMaximo = 'El salario máximo debe ser mayor o igual al mínimo.';
    if (!job.requisitos || job.requisitos.length === 0) nextErrors.requisitos = 'Incluye al menos un requisito.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGlobalError(null);

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditMode) {
        await updateJob(id, job);
      } else {
        await createJob(job);
      }
      navigate('/puestos');
    } catch (err) {
      setGlobalError(err.message || 'Error al guardar el puesto');
    }
  };

  const requisitosText = useMemo(() => job.requisitos.join('\n'), [job.requisitos]);

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, p: 0 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {isEditMode ? 'Actualizar puesto laboral' : 'Nueva vacante laboral'}
            </Typography>
            <Typography color="text.secondary">
              Completa los campos para publicar o actualizar un puesto.
            </Typography>
          </Box>
        </Stack>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <JobFormField
                name="titulo"
                label="Título"
                value={job.titulo}
                onChange={handleChange}
                error={errors.titulo}
                helperText={errors.titulo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <JobFormField
                name="area"
                label="Área"
                value={job.area}
                onChange={handleChange}
                error={errors.area}
                helperText={errors.area}
                select
              >
                {areas.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </JobFormField>
            </Grid>
            <Grid item xs={12} md={4}>
              <JobFormField
                name="modalidad"
                label="Modalidad"
                value={job.modalidad}
                onChange={handleChange}
                error={errors.modalidad}
                helperText={errors.modalidad}
                select
              >
                {modalidades.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </JobFormField>
            </Grid>
            <Grid item xs={12} md={4}>
              <JobFormField
                name="seniority"
                label="Seniority"
                value={job.seniority}
                onChange={handleChange}
                error={errors.seniority}
                helperText={errors.seniority}
                select
              >
                {seniorities.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </JobFormField>
            </Grid>
            <Grid item xs={12} md={4}>
              <JobFormField
                name="ubicacion"
                label="Ubicación"
                value={job.ubicacion}
                onChange={handleChange}
                error={errors.ubicacion}
                helperText={errors.ubicacion}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <JobFormField
                name="salarioMinimo"
                label="Salario mínimo"
                type="number"
                value={job.salarioMinimo}
                onChange={handleChange}
                error={errors.salarioMinimo}
                helperText={errors.salarioMinimo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <JobFormField
                name="salarioMaximo"
                label="Salario máximo"
                type="number"
                value={job.salarioMaximo}
                onChange={handleChange}
                error={errors.salarioMaximo}
                helperText={errors.salarioMaximo}
              />
            </Grid>
            <Grid item xs={12}>
              <JobFormField
                name="descripcion"
                label="Descripción"
                value={job.descripcion}
                onChange={handleChange}
                error={errors.descripcion}
                helperText={errors.descripcion}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <JobFormField
                name="requisitos"
                label="Requisitos (una línea por requisito)"
                value={requisitosText}
                onChange={handleRequisitosChange}
                error={errors.requisitos}
                helperText={errors.requisitos}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          {globalError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {globalError}
            </Typography>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {isEditMode ? 'Actualizar puesto' : 'Crear puesto'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/puestos')}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JobForm;
