import { useMemo, useState } from 'react';
import { Box, Button, Grid, Paper, Stack, TextField, MenuItem, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useCandidates } from '../context/CandidateContext';
import CandidateTable from '../components/CandidateTable';
import PaginationControls from '../components/PaginationControls';
import { nationalities, seniorities, workModes, candidateStatuses } from '../utils/formatters';
import { useTranslation } from '../hooks/useTranslation';

function CandidateList() {
  const { candidates, filters, setFilters, loading } = useCandidates();
  const [sortField, setSortField] = useState(filters.sortField);
  const [sortDirection, setSortDirection] = useState(filters.sortDirection);

  const filteredCandidates = useMemo(() => {
    const search = filters.search.toLowerCase();
    return candidates
      .filter((candidate) => {
        const textMatch = [candidate.firstName, candidate.lastName, candidate.dni, candidate.email, candidate.currentPosition]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(search));
        const seniorityMatch = filters.seniority ? candidate.seniority === filters.seniority : true;
        const workModeMatch = filters.workMode ? candidate.workMode === filters.workMode : true;
        const statusMatch = filters.status ? candidate.status === filters.status : true;
        return textMatch && seniorityMatch && workModeMatch && statusMatch;
      })
      .sort((a, b) => {
        const field = sortField;
        const aValue = a[field] || '';
        const bValue = b[field] || '';
        if (field === 'createdAt') {
          return sortDirection === 'asc' ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
        }
        const aText = String(aValue).toLowerCase();
        const bText = String(bValue).toLowerCase();
        if (aText < bText) return sortDirection === 'asc' ? -1 : 1;
        if (aText > bText) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [candidates, filters, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredCandidates.length / filters.perPage));
  const paginatedCandidates = filteredCandidates.slice((filters.page - 1) * filters.perPage, filters.page * filters.perPage);

  const handleSort = (field) => {
    const isSame = sortField === field;
    const nextDirection = isSame && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(nextDirection);
    setFilters({ ...filters, sortField: field, sortDirection: nextDirection, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const { t } = useTranslation();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {t('candidateList.title')}
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)' }}>
            {t('candidateList.subtitle')}
          </Typography>
        </Box>
        <Button component={RouterLink} to="/candidatos/nuevo" variant="contained">
          {t('candidateList.newCandidate')}
        </Button>
      </Stack>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label={t('filters.search')}
              value={filters.search}
              onChange={(event) => setFilters({ ...filters, search: event.target.value, page: 1 })}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label={t('filters.seniority')}
              value={filters.seniority}
              onChange={(event) => setFilters({ ...filters, seniority: event.target.value, page: 1 })}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">{t('filters.all')}</MenuItem>
              {seniorities.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label={t('filters.modalities')}
              value={filters.workMode}
              onChange={(event) => setFilters({ ...filters, workMode: event.target.value, page: 1 })}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">{t('filters.allModalities')}</MenuItem>
              {workModes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label={t('filters.status')}
              value={filters.status}
              onChange={(event) => setFilters({ ...filters, status: event.target.value, page: 1 })}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">{t('filters.all')}</MenuItem>
              {candidateStatuses.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label={t('filters.nationality')}
              value={filters.nationality || ''}
              onChange={(event) => setFilters({ ...filters, nationality: event.target.value, page: 1 })}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="">{t('filters.all')}</MenuItem>
              {nationalities.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <CandidateTable
            candidates={paginatedCandidates}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            loading={loading}
          />
        </Box>

        {filteredCandidates.length === 0 && !loading ? (
          <Typography color="text.secondary" sx={{ mt: 3 }}>
            {t('candidateList.empty')}
          </Typography>
        ) : null}

        <PaginationControls currentPage={filters.page} totalPages={totalPages} onChange={handlePageChange} />
      </Paper>
    </Box>
  );
}

export default CandidateList;
