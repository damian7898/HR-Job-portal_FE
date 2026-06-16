import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const menu = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { label: 'Vacantes', path: '/puestos', icon: <WorkOutlineIcon /> },
    { label: 'Nuevo puesto', path: '/puestos/nuevo', icon: <AddCircleOutlineIcon /> },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="div" gutterBottom>
        HR Job Portal
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{ borderRadius: 1, mb: 1 }}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
