import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

function Topbar({ drawerWidth }) {
  const { t } = useTranslation();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-primary)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            {t('topbar.title')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            {t('topbar.subtitle')}
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to="/puestos/nuevo"
          variant="contained"
          size="small"
          sx={{
            backgroundColor: 'var(--button-primary)',
            color: 'white',
            '&:hover': { backgroundColor: 'var(--button-primary-hover)' },
          }}
        >
          {t('topbar.newJob')}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
