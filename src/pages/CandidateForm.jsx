import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  Typography,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useCandidates } from '../context/CandidateContext';
import { createEmptyCandidate } from '../models/candidate';
import JobFormField from '../components/JobFormField';
import { genders, nationalities, seniorities, workModes, availabilityOptions } from '../utils/formatters';

const ALLOWED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function CandidateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates, createCandidate, updateCandidate, loading } = useCandidates();
  const [candidate, setCandidate] = useState(createEmptyCandidate());
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);

  useEffect(() => {
    if (!id) {
      setCandidate(createEmptyCandidate());
      return;
    }
    const existing = candidates.find((item) => item.id === id);
    if (existing) {
      setCandidate(existing);
    }
  }, [id, candidates]);

  const isEditMode = Boolean(id);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, cvFileUrl: 'Solo se permiten archivos PDF o DOCX.' }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, cvFileUrl: 'El archivo no puede superar 5MB.' }));
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setCandidate((prev) => ({
      ...prev,
      cvFileUrl: fileUrl,
      cvFileName: file.name,
    }));
    setErrors((prev) => ({ ...prev, cvFileUrl: null }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!candidate.firstName) nextErrors.firstName = 'El nombre es requerido.';
    if (!candidate.lastName) nextErrors.lastName = 'El apellido es requerido.';
    if (!candidate.dni) nextErrors.dni = 'El DNI es requerido.';
    if (!candidate.birthDate) nextErrors.birthDate = 'La fecha de nacimiento es requerida.';
    if (!candidate.gender) nextErrors.gender = 'El género es requerido.';
    if (!candidate.nationality) nextErrors.nationality = 'La nacionalidad es requerida.';
    if (!candidate.email) nextErrors.email = 'El email es requerido.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email)) nextErrors.email = 'El email no es válido.';
    if (!candidate.phone) nextErrors.phone = 'El teléfono es requerido.';
    if (!candidate.address) nextErrors.address = 'La dirección es requerida.';
    if (!candidate.city) nextErrors.city = 'La ciudad es requerida.';
    if (!candidate.province) nextErrors.province = 'La provincia es requerida.';
    if (!candidate.country) nextErrors.country = 'El país es requerido.';
    if (!candidate.currentPosition) nextErrors.currentPosition = 'El puesto actual es requerido.';
    if (!candidate.seniority) nextErrors.seniority = 'El seniority es requerido.';
    if (!candidate.expectedSalary || candidate.expectedSalary <= 0) nextErrors.expectedSalary = 'Debes indicar un salario pretendido válido.';
    if (!candidate.workMode) nextErrors.workMode = 'La modalidad preferida es requerida.';
    if (!candidate.availability) nextErrors.availability = 'La disponibilidad es requerida.';
    if (!candidate.cvFileUrl) nextErrors.cvFileUrl = 'Debes cargar el CV en PDF o DOCX.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGlobalError(null);
    if (!validateForm()) return;
    try {
      if (isEditMode) {
        await updateCandidate(id, candidate);
      } else {
        await createCandidate(candidate);
      }
      navigate('/candidatos');
    } catch (err) {
      setGlobalError(err.message || 'Error al guardar el candidato');
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, p: 0 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {isEditMode ? 'Editar candidato' : 'Nuevo candidato'}
            </Typography>
            <Typography color="text.secondary">Registra los datos personales, de contacto y el CV del candidato.</Typography>
          </Box>
        </Stack>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Datos personales
              </Typography>
              <JobFormField
                name="firstName"
                label="Nombre"
                value={candidate.firstName}
                onChange={handleChange}
                error={errors.firstName}
                helperText={errors.firstName}
              />
              <JobFormField
                name="lastName"
                label="Apellido"
                value={candidate.lastName}
                onChange={handleChange}
                error={errors.lastName}
                helperText={errors.lastName}
              />
              <JobFormField
                name="dni"
                label="DNI"
                value={candidate.dni}
                onChange={handleChange}
                error={errors.dni}
                helperText={errors.dni}
              />
              <JobFormField
                name="birthDate"
                label="Fecha de nacimiento"
                type="date"
                value={candidate.birthDate}
                onChange={handleChange}
                error={errors.birthDate}
                helperText={errors.birthDate}
                InputLabelProps={{ shrink: true }}
              />
              <JobFormField
                name="gender"
                label="Género"
                value={candidate.gender}
                onChange={handleChange}
                error={errors.gender}
                helperText={errors.gender}
                select
              >
                {genders.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </JobFormField>
              <JobFormField
                name="nationality"
                label="Nacionalidad"
                value={candidate.nationality}
                onChange={handleChange}
                error={errors.nationality}
                helperText={errors.nationality}
                select
              >
                {nationalities.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </JobFormField>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Datos de contacto
              </Typography>
              <JobFormField
                name="email"
                label="Email"
                type="email"
                value={candidate.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email}
              />
              <JobFormField
                name="phone"
                label="Teléfono"
                value={candidate.phone}
                onChange={handleChange}
                error={errors.phone}
                helperText={errors.phone}
              />
              <JobFormField
                name="address"
                label="Dirección"
                value={candidate.address}
                onChange={handleChange}
                error={errors.address}
                helperText={errors.address}
              />
              <JobFormField
                name="city"
                label="Ciudad"
                value={candidate.city}
                onChange={handleChange}
                error={errors.city}
                helperText={errors.city}
              />
              <JobFormField
                name="province"
                label="Provincia"
                value={candidate.province}
                onChange={handleChange}
                error={errors.province}
                helperText={errors.province}
              />
              <JobFormField
                name="country"
                label="País"
                value={candidate.country}
                onChange={handleChange}
                error={errors.country}
                helperText={errors.country}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Datos profesionales
              </Typography>
              <JobFormField
                name="currentPosition"
                label="Puesto actual"
                value={candidate.currentPosition}
                onChange={handleChange}
                error={errors.currentPosition}
                helperText={errors.currentPosition}
              />
              <JobFormField
                name="seniority"
                label="Seniority"
                value={candidate.seniority}
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
              <JobFormField
                name="expectedSalary"
                label="Salario pretendido"
                type="number"
                value={candidate.expectedSalary}
                onChange={handleChange}
                error={errors.expectedSalary}
                helperText={errors.expectedSalary}
              />
              <JobFormField
                name="workMode"
                label="Modalidad preferida"
                value={candidate.workMode}
                onChange={handleChange}
                error={errors.workMode}
                helperText={errors.workMode}
                select
              >
                {workModes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </JobFormField>
              <JobFormField
                name="availability"
                label="Disponibilidad"
                value={candidate.availability}
                onChange={handleChange}
                error={errors.availability}
                helperText={errors.availability}
                select
              >
                {availabilityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </JobFormField>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Gestión de CV
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Button variant="outlined" component="label">
                  {candidate.cvFileName ? 'Reemplazar CV' : 'Cargar CV'}
                  <input hidden accept=".pdf,.doc,.docx" type="file" onChange={handleFileChange} />
                </Button>
                {candidate.cvFileName ? (
                  <Typography variant="body2">{candidate.cvFileName}</Typography>
                ) : (
                  <Typography color="text.secondary" variant="body2">
                    Selecciona PDF o DOCX (máx. 5MB)
                  </Typography>
                )}
              </Box>
              {errors.cvFileUrl && (
                <FormHelperText error>{errors.cvFileUrl}</FormHelperText>
              )}
              {candidate.cvFileUrl && candidate.cvFileName && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Vista previa de CV
                  </Typography>
                  {candidate.cvFileName?.toLowerCase().endsWith('.pdf') ? (
                    <Box component="iframe" src={candidate.cvFileUrl} width="100%" height={260} title="Vista previa CV" sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }} />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      El CV está cargado. Descarga el archivo para verlo.
                    </Typography>
                  )}
                  <Button
                    href={candidate.cvFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ mt: 1 }}
                    size="small"
                  >
                    Descargar CV
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>

          {globalError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {globalError}
            </Typography>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {isEditMode ? 'Actualizar candidato' : 'Crear candidato'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/candidatos')}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CandidateForm;
