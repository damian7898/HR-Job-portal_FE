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
import { useTranslation } from '../hooks/useTranslation';

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
      setErrors((prev) => ({ ...prev, cvFileUrl: t('errors.cvFileTypeInvalid') }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, cvFileUrl: t('errors.cvFileSizeInvalid') }));
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
    if (!candidate.firstName) nextErrors.firstName = t('errors.firstNameRequired');
    if (!candidate.lastName) nextErrors.lastName = t('errors.lastNameRequired');
    if (!candidate.dni) nextErrors.dni = t('errors.dniRequired');
    if (!candidate.birthDate) nextErrors.birthDate = t('errors.birthDateRequired');
    if (!candidate.gender) nextErrors.gender = t('errors.genderRequired');
    if (!candidate.nationality) nextErrors.nationality = t('errors.nationalityRequired');
    if (!candidate.email) nextErrors.email = t('errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email)) nextErrors.email = t('errors.emailInvalid');
    if (!candidate.phone) nextErrors.phone = t('errors.phoneRequired');
    if (!candidate.address) nextErrors.address = t('errors.addressRequired');
    if (!candidate.city) nextErrors.city = t('errors.cityRequired');
    if (!candidate.province) nextErrors.province = t('errors.provinceRequired');
    if (!candidate.country) nextErrors.country = t('errors.countryRequired');
    if (!candidate.currentPosition) nextErrors.currentPosition = t('errors.currentPositionRequired');
    if (!candidate.seniority) nextErrors.seniority = t('errors.seniorityRequired');
    if (!candidate.expectedSalary || candidate.expectedSalary <= 0) nextErrors.expectedSalary = t('errors.expectedSalaryInvalid');
    if (!candidate.workMode) nextErrors.workMode = t('errors.workModeRequired');
    if (!candidate.availability) nextErrors.availability = t('errors.availabilityRequired');
    if (!candidate.cvFileUrl) nextErrors.cvFileUrl = t('errors.cvRequired');

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
      setGlobalError(err.message || t('errors.saveCandidateFailed'));
    }
  };

  const { t } = useTranslation();

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, p: 0 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {isEditMode ? t('forms.editCandidate') : t('forms.newCandidate')}
            </Typography>
            <Typography color="text.secondary">{t('forms.candidateSubtitle')}</Typography>
          </Box>
        </Stack>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t('forms.personalData')}
              </Typography>
              <JobFormField
                name="firstName"
                label={t('forms.firstName')}
                value={candidate.firstName}
                onChange={handleChange}
                error={errors.firstName}
                helperText={errors.firstName}
              />
              <JobFormField
                name="lastName"
                label={t('forms.lastName')}
                value={candidate.lastName}
                onChange={handleChange}
                error={errors.lastName}
                helperText={errors.lastName}
              />
              <JobFormField
                name="dni"
                label={t('forms.dni')}
                value={candidate.dni}
                onChange={handleChange}
                error={errors.dni}
                helperText={errors.dni}
              />
              <JobFormField
                name="birthDate"
                label={t('forms.birthDate')}
                type="date"
                value={candidate.birthDate}
                onChange={handleChange}
                error={errors.birthDate}
                helperText={errors.birthDate}
                InputLabelProps={{ shrink: true }}
              />
              <JobFormField
                name="gender"
                label={t('forms.gender')}
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
                label={t('forms.nationality')}
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
                {t('forms.contactData')}
              </Typography>
              <JobFormField
                name="email"
                label={t('forms.email')}
                type="email"
                value={candidate.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email}
              />
              <JobFormField
                name="phone"
                label={t('forms.phone')}
                value={candidate.phone}
                onChange={handleChange}
                error={errors.phone}
                helperText={errors.phone}
              />
              <JobFormField
                name="address"
                label={t('forms.address')}
                value={candidate.address}
                onChange={handleChange}
                error={errors.address}
                helperText={errors.address}
              />
              <JobFormField
                name="city"
                label={t('forms.city')}
                value={candidate.city}
                onChange={handleChange}
                error={errors.city}
                helperText={errors.city}
              />
              <JobFormField
                name="province"
                label={t('forms.province')}
                value={candidate.province}
                onChange={handleChange}
                error={errors.province}
                helperText={errors.province}
              />
              <JobFormField
                name="country"
                label={t('forms.country')}
                value={candidate.country}
                onChange={handleChange}
                error={errors.country}
                helperText={errors.country}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t('forms.professionalData')}
              </Typography>
              <JobFormField
                name="currentPosition"
                label={t('forms.currentPosition')}
                value={candidate.currentPosition}
                onChange={handleChange}
                error={errors.currentPosition}
                helperText={errors.currentPosition}
              />
              <JobFormField
                name="seniority"
                label={t('forms.seniority')}
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
                label={t('forms.expectedSalary')}
                type="number"
                value={candidate.expectedSalary}
                onChange={handleChange}
                error={errors.expectedSalary}
                helperText={errors.expectedSalary}
              />
              <JobFormField
                name="workMode"
                label={t('forms.preferredWorkMode')}
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
                label={t('forms.availability')}
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
                {t('forms.cvManagement')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Button variant="outlined" component="label">
                  {candidate.cvFileName ? t('forms.replaceCv') : t('forms.uploadCv')}
                  <input hidden accept=".pdf,.doc,.docx" type="file" onChange={handleFileChange} />
                </Button>
                {candidate.cvFileName ? (
                  <Typography variant="body2">{candidate.cvFileName}</Typography>
                ) : (
                  <Typography color="text.secondary" variant="body2">
                    {t('forms.uploadInstructions')}
                  </Typography>
                )}
              </Box>
              {errors.cvFileUrl && (
                <FormHelperText error>{errors.cvFileUrl}</FormHelperText>
              )}
              {candidate.cvFileUrl && candidate.cvFileName && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {t('forms.cvPreviewTitle')}
                  </Typography>
                  {candidate.cvFileName?.toLowerCase().endsWith('.pdf') ? (
                    <Box component="iframe" src={candidate.cvFileUrl} width="100%" height={260} title={t('forms.cvPreviewTitle')} sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }} />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {t('forms.cvUploadedInstruction')}
                    </Typography>
                  )}
                  <Button
                    href={candidate.cvFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ mt: 1 }}
                    size="small"
                  >
                    {t('forms.downloadCv')}
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
              {isEditMode ? t('forms.updateCandidateButton') : t('forms.createCandidateButton')}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/candidatos')}>
              {t('forms.cancel')}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CandidateForm;
