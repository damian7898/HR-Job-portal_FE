import { Card, CardContent, Typography } from '@mui/material';

function StatCard({ title, subtitle, value }) {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 2, minHeight: 130, borderColor: 'var(--border-default)', backgroundColor: 'var(--card-bg)', boxShadow: 'var(--shadow-sm)' }}
    >
      <CardContent>
        <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }} gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: 'var(--text-primary)' }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
