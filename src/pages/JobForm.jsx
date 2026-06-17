import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { areas, modalidades, seniorities } from '../utils/formatters';
import { createEmptyJob } from '../models/jobPosition';
import { useJobs } from '../context/JobContext';
import JobFormField from '../components/JobFormField';
import { useTranslation } from '../hooks/useTranslation';

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

    if (!job.titulo) nextErrors.titulo = t('errors.jobTitleRequired');
    if (!job.area) nextErrors.area = t('errors.jobAreaRequired');
    if (!job.modalidad) nextErrors.modalidad = t('errors.jobModalityRequired');
    if (!job.seniority) nextErrors.seniority = t('errors.jobSeniorityRequired');
    if (!job.descripcion) nextErrors.descripcion = t('errors.jobDescriptionRequired');
    if (!job.ubicacion) nextErrors.ubicacion = t('errors.jobLocationRequired');
    if (job.salarioMinimo <= 0) nextErrors.salarioMinimo = t('errors.minSalaryInvalid');
    if (job.salarioMaximo <= 0) nextErrors.salarioMaximo = t('errors.maxSalaryInvalid');
    if (job.salarioMaximo < job.salarioMinimo) nextErrors.salarioMaximo = t('errors.maxSalaryLessThanMin');
    if (!job.requisitos || job.requisitos.length === 0) nextErrors.requisitos = t('errors.requirementsRequired');

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
      setGlobalError(err.message || t('errors.saveJobFailed'));
    }
  };

  const requisitosText = useMemo(() => job.requisitos.join('\n'), [job.requisitos]);

  const { t } = useTranslation();

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, p: 0 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {isEditMode ? t('forms.updateJob') : t('forms.newJob')}
            </Typography>
            <Typography color="text.secondary">
              {t('forms.jobSubtitle')}
            </Typography>
          </Box>
        </Stack>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <JobFormField
                name="titulo"
                label={t('forms.title')}
                value={job.titulo}
                onChange={handleChange}
                error={errors.titulo}
                helperText={errors.titulo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <JobFormField
                name="area"
                label={t('forms.area')}
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
                label={t('forms.modality')}
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
                label={t('forms.seniority')}
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
                label={t('forms.location')}
                value={job.ubicacion}
                onChange={handleChange}
                error={errors.ubicacion}
                helperText={errors.ubicacion}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <JobFormField
                name="salarioMinimo"
                label={t('forms.minSalary')}
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
                label={t('forms.maxSalary')}
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
                label={t('forms.description')}
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
                label={t('forms.requirements')}
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
              {isEditMode ? t('forms.updateJobButton') : t('forms.createJobButton')}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/puestos')}>
              {t('forms.cancel')}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JobForm;
