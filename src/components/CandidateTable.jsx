import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CandidateStatusChip from './CandidateStatusChip';
import { formatDate } from '../utils/formatters';

function CandidateTable({ candidates, sortField, sortDirection, onSort, loading }) {
  const columns = [
    { label: 'Nombre', field: 'lastName' },
    { label: 'DNI', field: 'dni' },
    { label: 'Email', field: 'email' },
    { label: 'Puesto', field: 'currentPosition' },
    { label: 'Seniority', field: 'seniority' },
    { label: 'Modalidad', field: 'workMode' },
    { label: 'Estado', field: 'status' },
    { label: 'Alta', field: 'createdAt' },
  ];

  if (loading) {
    return <Typography sx={{ color: 'var(--color-muted)' }}>Cargando candidatos...</Typography>;
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 700, color: 'var(--color-text)' }}>
                <TableSortLabel
                  active={sortField === column.field}
                  direction={sortField === column.field ? sortDirection : 'asc'}
                  onClick={() => onSort(column.field)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: 700, color: 'var(--color-text)' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(9,105,218,0.03)' } }}>
              <TableCell sx={{ color: 'var(--color-text)' }}>
                {candidate.lastName}, {candidate.firstName}
              </TableCell>
              <TableCell sx={{ color: 'var(--color-text)' }}>{candidate.dni}</TableCell>
              <TableCell sx={{ color: 'var(--color-text)' }}>{candidate.email}</TableCell>
              <TableCell sx={{ color: 'var(--color-text)' }}>{candidate.currentPosition}</TableCell>
              <TableCell sx={{ color: 'var(--color-text)' }}>{candidate.seniority}</TableCell>
              <TableCell sx={{ color: 'var(--color-text)' }}>{candidate.workMode}</TableCell>
              <TableCell>
                <CandidateStatusChip status={candidate.status} />
              </TableCell>
              <TableCell sx={{ color: 'var(--color-text)' }}>{formatDate(candidate.createdAt)}</TableCell>
              <TableCell>
                <Button component={RouterLink} to={`/candidatos/${candidate.id}`} size="small" sx={{ color: 'var(--color-primary)' }}>
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CandidateTable;
