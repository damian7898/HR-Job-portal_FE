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
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useCandidates } from '../context/CandidateContext';
import CandidateStatusChip from '../components/CandidateStatusChip';
import { candidateStatuses, formatDate } from '../utils/formatters';

function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates, getCandidateById, updateCandidate, loading } = useCandidates();
  const [candidate, setCandidate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const existing = candidates.find((item) => item.id === id);
    if (existing) {
      setCandidate(existing);
      return;
    }
    getCandidateById(id)
      .then(setCandidate)
      .catch((err) => setError(err.message));
  }, [id, candidates, getCandidateById]);

  const handleStatusChange = async (event) => {
    if (!candidate) return;
    const nextStatus = event.target.value;
    try {
      const updated = await updateCandidate(candidate.id, { ...candidate, status: nextStatus });
      setCandidate(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading && !candidate) {
    return <Typography>Cargando candidato...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!candidate) {
    return <Typography>No se encontró el candidato solicitado.</Typography>;
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {candidate.firstName} {candidate.lastName}
          </Typography>
          <Typography color="text.secondary">Detalle completo del candidato y su CV.</Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="outlined" onClick={() => navigate(`/candidatos/${candidate.id}/editar`)}>
            Editar
          </Button>
          <CandidateStatusChip status={candidate.status} />
        </Stack>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Información personal
            </Typography>
            <Typography>Nombre: {candidate.firstName} {candidate.lastName}</Typography>
            <Typography>DNI: {candidate.dni}</Typography>
            <Typography>Fecha de nacimiento: {formatDate(candidate.birthDate)}</Typography>
            <Typography>Género: {candidate.gender}</Typography>
            <Typography>Nacionalidad: {candidate.nationality}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Información de contacto
            </Typography>
            <Typography>Email: {candidate.email}</Typography>
            <Typography>Teléfono: {candidate.phone}</Typography>
            <Typography>Dirección: {candidate.address}</Typography>
            <Typography>Ciudad: {candidate.city}</Typography>
            <Typography>Provincia: {candidate.province}</Typography>
            <Typography>País: {candidate.country}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Información profesional
            </Typography>
            <Typography>Puesto actual: {candidate.currentPosition}</Typography>
            <Typography>Seniority: {candidate.seniority}</Typography>
            <Typography>Salario pretendido: {candidate.expectedSalary.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })}</Typography>
            <Typography>Modalidad: {candidate.workMode}</Typography>
            <Typography>Disponibilidad: {candidate.availability}</Typography>
            <Typography>LinkedIn: {candidate.linkedinUrl || 'No disponible'}</Typography>
            <Typography>Portfolio: {candidate.portfolioUrl || 'No disponible'}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Estado del candidato
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel id="status-select-label">Estado</InputLabel>
              <Select
                labelId="status-select-label"
                value={candidate.status}
                label="Estado"
                onChange={handleStatusChange}
              >
                {candidateStatuses.map((statusOption) => (
                  <MenuItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                CV adjunto
              </Typography>
              {candidate.cvFileUrl ? (
                <>
                  <Button href={candidate.cvFileUrl} target="_blank" rel="noreferrer" size="small">
                    Descargar CV
                  </Button>
                  {candidate.cvFileName?.toLowerCase().endsWith('.pdf') ? (
                    <Box component="iframe" src={candidate.cvFileUrl} width="100%" height={280} title="CV del candidato" sx={{ mt: 2, borderRadius: 2, border: '1px solid #e0e0e0' }} />
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Se trata de un archivo DOCX. Descarga para visualizarlo.
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No se ha cargado un CV para este candidato.
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Typography>Fecha de alta: {formatDate(candidate.createdAt)}</Typography>
              <Typography>Última actualización: {formatDate(candidate.updatedAt)}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default CandidateDetail;
