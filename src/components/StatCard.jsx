import { Card, CardContent, Typography } from '@mui/material';

function StatCard({ title, subtitle, value }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, minHeight: 130 }}>
      <CardContent>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
