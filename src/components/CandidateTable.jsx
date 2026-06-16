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
    return <Typography>Cargando candidatos...</Typography>;
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 700 }}>
                <TableSortLabel
                  active={sortField === column.field}
                  direction={sortField === column.field ? sortDirection : 'asc'}
                  onClick={() => onSort(column.field)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: 700 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id} hover>
              <TableCell>
                {candidate.lastName}, {candidate.firstName}
              </TableCell>
              <TableCell>{candidate.dni}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.currentPosition}</TableCell>
              <TableCell>{candidate.seniority}</TableCell>
              <TableCell>{candidate.workMode}</TableCell>
              <TableCell>
                <CandidateStatusChip status={candidate.status} />
              </TableCell>
              <TableCell>{formatDate(candidate.createdAt)}</TableCell>
              <TableCell>
                <Button component={RouterLink} to={`/candidatos/${candidate.id}`} size="small">
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
