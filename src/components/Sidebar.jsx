import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

function Sidebar() {
  const { t } = useTranslation();

  const menu = [
    { label: t('menu.dashboard'), path: '/', icon: <DashboardIcon /> },
    { label: t('menu.vacancies'), path: '/puestos', icon: <WorkOutlineIcon /> },
    { label: t('menu.candidates'), path: '/candidatos', icon: <PeopleAltIcon /> },
    { label: t('menu.settings'), path: '/settings', icon: <SettingsIcon /> },
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
    <Box sx={{ p: 3, backgroundColor: 'var(--sidebar-bg)', minHeight: '100%', borderRight: '1px solid var(--border-default)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, gap: 1 }}>
        <Box>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ fontWeight: 700, color: 'var(--text-primary)' }}
          >
            HR Job Portal
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            Tablero / Vacantes / Candidatos
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => setIsDark((s) => !s)}
          aria-label="toggle theme"
          sx={{ backgroundColor: 'var(--bg-muted)', '&:hover': { backgroundColor: 'var(--bg-default)' } }}
        >
          {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2, borderColor: 'var(--border-default)' }} />
      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              py: 1.25,
              px: 1.5,
              color: 'var(--text-primary)',
              '& .MuiListItemIcon-root': { color: 'var(--text-secondary)' },
              '&:hover': { backgroundColor: 'rgba(9,105,218,0.06)' },
            }}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
