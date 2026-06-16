import { Card, CardActions, CardContent, Chip, Stack, Typography, Button } from '@mui/material';
import { formatDate } from '../utils/formatters';
import { Link as RouterLink } from 'react-router-dom';
import CandidateStatusChip from './CandidateStatusChip';

function CandidateCard({ candidate }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h6" component="div">
            {candidate.lastName}, {candidate.firstName}
          </Typography>
          <CandidateStatusChip status={candidate.status} />
        </Stack>

        <Typography variant="body2" sx={{ color: 'var(--color-muted)' }} gutterBottom>
          {candidate.currentPosition} · {candidate.workMode} · {candidate.seniority}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {candidate.city}, {candidate.country}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip label={`Alta: ${formatDate(candidate.createdAt)}`} size="small" />
          <Chip label={candidate.dni} size="small" />
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button component={RouterLink} to={`/candidatos/${candidate.id}`} size="small" sx={{ color: 'var(--color-primary)' }}>
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
}

export default CandidateCard;
