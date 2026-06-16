import { Box, Pagination, Typography } from '@mui/material';

function PaginationControls({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
      <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
        Página {currentPage} de {totalPages}
      </Typography>
      <Pagination
        page={currentPage}
        count={totalPages}
        onChange={(event, page) => onChange(page)}
        sx={{ '& .Mui-selected': { backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' } }}
      />
    </Box>
  );
}

export default PaginationControls;
