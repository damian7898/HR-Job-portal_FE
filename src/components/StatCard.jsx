import { Card, CardContent, Typography } from '@mui/material';

function StatCard({ title, subtitle, value }) {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 2, minHeight: 130, borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
    >
      <CardContent>
        <Typography variant="caption" sx={{ color: 'var(--color-muted)' }} gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: 'var(--color-text)' }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
