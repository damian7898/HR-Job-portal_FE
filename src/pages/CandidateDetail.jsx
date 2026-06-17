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
import { useTranslation } from '../hooks/useTranslation';

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

  const { t } = useTranslation();

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
    return <Typography>{t('candidateDetail.loading')}</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!candidate) {
    return <Typography>{t('candidateDetail.notFound')}</Typography>;
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {candidate.firstName} {candidate.lastName}
          </Typography>
          <Typography color="text.secondary">{t('candidateDetail.subtitle')}</Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="outlined" onClick={() => navigate(`/candidatos/${candidate.id}/editar`)}>
            {t('candidateDetail.edit')}
          </Button>
          <CandidateStatusChip status={candidate.status} />
        </Stack>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {t('candidateDetail.personalInfo')}
            </Typography>
            <Typography>{t('candidateDetail.name')}: {candidate.firstName} {candidate.lastName}</Typography>
            <Typography>{t('candidateDetail.dni')}: {candidate.dni}</Typography>
            <Typography>{t('candidateDetail.birthDate')}: {formatDate(candidate.birthDate)}</Typography>
            <Typography>{t('candidateDetail.gender')}: {candidate.gender}</Typography>
            <Typography>{t('candidateDetail.nationality')}: {candidate.nationality}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {t('candidateDetail.contactInfo')}
            </Typography>
            <Typography>{t('candidateDetail.email')}: {candidate.email}</Typography>
            <Typography>{t('candidateDetail.phone')}: {candidate.phone}</Typography>
            <Typography>{t('candidateDetail.address')}: {candidate.address}</Typography>
            <Typography>{t('candidateDetail.city')}: {candidate.city}</Typography>
            <Typography>{t('candidateDetail.province')}: {candidate.province}</Typography>
            <Typography>{t('candidateDetail.country')}: {candidate.country}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {t('candidateDetail.professionalInfo')}
            </Typography>
            <Typography>{t('candidateDetail.currentPosition')}: {candidate.currentPosition}</Typography>
            <Typography>{t('candidateDetail.seniority')}: {candidate.seniority}</Typography>
            <Typography>{t('candidateDetail.expectedSalary')}: {candidate.expectedSalary.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })}</Typography>
            <Typography>{t('candidateDetail.workMode')}: {candidate.workMode}</Typography>
            <Typography>{t('candidateDetail.availability')}: {candidate.availability}</Typography>
            <Typography>{t('candidateDetail.linkedin')}: {candidate.linkedinUrl || t('candidateDetail.notAvailable')}</Typography>
            <Typography>{t('candidateDetail.portfolio')}: {candidate.portfolioUrl || t('candidateDetail.notAvailable')}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {t('candidateDetail.candidateStatus')}
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel id="status-select-label">{t('candidateDetail.status')}</InputLabel>
              <Select
                labelId="status-select-label"
                value={candidate.status}
                label={t('candidateDetail.status')}
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
                {t('candidateDetail.cvAttached')}
              </Typography>
              {candidate.cvFileUrl ? (
                <>
                  <Button href={candidate.cvFileUrl} target="_blank" rel="noreferrer" size="small">
                    {t('candidateDetail.downloadCv')}
                  </Button>
                  {candidate.cvFileName?.toLowerCase().endsWith('.pdf') ? (
                    <Box component="iframe" src={candidate.cvFileUrl} width="100%" height={280} title={t('candidateDetail.cvPreviewTitle')} sx={{ mt: 2, borderRadius: 2, border: '1px solid #e0e0e0' }} />
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      {t('candidateDetail.noCv')}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t('candidateDetail.noCv')}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Typography>{t('candidateDetail.createdAt')} {formatDate(candidate.createdAt)}</Typography>
              <Typography>{t('candidateDetail.updatedAt')} {formatDate(candidate.updatedAt)}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default CandidateDetail;
