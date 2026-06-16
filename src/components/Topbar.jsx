import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Topbar({ drawerWidth }) {
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
            Portal de Talent Acquisition
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            Gestión de puestos y visualización de vacantes.
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
          Nuevo puesto
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
