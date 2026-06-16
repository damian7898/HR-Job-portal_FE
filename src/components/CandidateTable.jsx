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
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ borderRadius: 3, backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-default)' }}
    >
      <Table className="github-table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 700, color: 'var(--text-primary)', py: 1.5, px: 2 }}>
                <TableSortLabel
                  active={sortField === column.field}
                  direction={sortField === column.field ? sortDirection : 'asc'}
                  onClick={() => onSort(column.field)}
                  sx={{ color: 'var(--text-primary)' }}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: 700, color: 'var(--text-primary)', py: 1.5, px: 2 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id} hover sx={{ '&:hover': { backgroundColor: 'var(--bg-muted)' } }}>
              <TableCell sx={{ color: 'var(--text-primary)', py: 1.5, px: 2 }}>
                {candidate.lastName}, {candidate.firstName}
              </TableCell>
              <TableCell sx={{ color: 'var(--text-primary)', py: 1.5, px: 2 }}>{candidate.dni}</TableCell>
              <TableCell sx={{ color: 'var(--text-primary)', py: 1.5, px: 2 }}>{candidate.email}</TableCell>
              <TableCell sx={{ color: 'var(--text-primary)', py: 1.5, px: 2 }}>{candidate.currentPosition}</TableCell>
              <TableCell sx={{ color: 'var(--text-primary)', py: 1.5, px: 2 }}>{candidate.seniority}</TableCell>
              <TableCell sx={{ color: 'var(--text-primary)', py: 1.5, px: 2 }}>{candidate.workMode}</TableCell>
              <TableCell sx={{ py: 1.5, px: 2 }}>
                <CandidateStatusChip status={candidate.status} />
              </TableCell>
              <TableCell sx={{ color: 'var(--text-primary)', py: 1.5, px: 2 }}>{formatDate(candidate.createdAt)}</TableCell>
              <TableCell sx={{ py: 1.5, px: 2 }}>
                <Button component={RouterLink} to={`/candidatos/${candidate.id}`} size="small" sx={{ color: 'var(--primary)', fontWeight: 700 }}>
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
