import { Card, CardActions, CardContent, Chip, Stack, Typography, Button } from '@mui/material';
import { formatDate } from '../utils/formatters';
import { Link as RouterLink } from 'react-router-dom';
import CandidateStatusChip from './CandidateStatusChip';
import { useTranslation } from '../hooks/useTranslation';

function CandidateCard({ candidate }) {
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderColor: 'var(--border-default)',
        backgroundColor: 'var(--card-bg)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            {candidate.lastName}, {candidate.firstName}
          </Typography>
          <CandidateStatusChip status={candidate.status} />
        </Stack>

        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 1.5 }}>
          {candidate.currentPosition} · {candidate.workMode} · {candidate.seniority}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 2 }}>
          {candidate.city}, {candidate.country}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip label={`${t('candidateCard.hiredAt')} ${formatDate(candidate.createdAt)}`} size="small" sx={{ borderRadius: 1, backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }} />
          <Chip label={candidate.dni} size="small" sx={{ borderRadius: 1, backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }} />
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button component={RouterLink} to={`/candidatos/${candidate.id}`} size="small" sx={{ color: 'var(--primary)', fontWeight: 700 }}>
          {t('buttons.view')}
        </Button>
      </CardActions>
    </Card>
  );
}

export default CandidateCard;
