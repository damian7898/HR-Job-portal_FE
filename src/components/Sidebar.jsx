import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const menu = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { label: 'Vacantes', path: '/puestos', icon: <WorkOutlineIcon /> },
    { label: 'Candidatos', path: '/candidatos', icon: <PeopleAltIcon /> },
    { label: 'Nuevo puesto', path: '/puestos/nuevo', icon: <AddCircleOutlineIcon /> },
  ];

  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
      // ignore
    }
  }, [isDark]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6" component="div" gutterBottom sx={{ display: 'inline-flex', alignItems: 'center' }}>
          HR Job Portal
        </Typography>
        <IconButton size="small" onClick={() => setIsDark((s) => !s)} aria-label="toggle theme">
          {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Box>
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
