import { Box, Drawer, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const drawerWidth = 280;

function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar drawerWidth={drawerWidth} />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid #e0e0e0' },
        }}
      >
        <Toolbar />
        <Sidebar />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
