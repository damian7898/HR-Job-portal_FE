import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Topbar({ drawerWidth }) {
  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: '#ffffff',
        color: '#111827',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Portal de Talent Acquisition
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestión de puestos y visualización de vacantes.
          </Typography>
        </Box>
        <Button component={RouterLink} to="/puestos/nuevo" variant="contained" size="small">
          Nuevo puesto
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
