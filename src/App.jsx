import { Box, CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--color-surface)' }}>
      <CssBaseline />
      <AppRoutes />
    </Box>
  );
}

export default App;
