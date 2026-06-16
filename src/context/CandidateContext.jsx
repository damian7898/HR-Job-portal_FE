import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as candidateService from '../services/candidateService';

const CandidateContext = createContext(null);

export function useCandidates() {
  return useContext(CandidateContext);
}

export function CandidateProvider({ children }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    seniority: '',
    workMode: '',
    status: '',
    nationality: '',
    sortField: 'createdAt',
    sortDirection: 'desc',
    page: 1,
    perPage: 6,
  });

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await candidateService.getCandidates();
      setCandidates(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los candidatos');
    } finally {
      setLoading(false);
    }
  };

  const createCandidate = async (candidate) => {
    setLoading(true);
    setError(null);
    try {
      const created = await candidateService.createCandidate(candidate);
      setCandidates((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err.message || 'Error al crear el candidato');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await candidateService.updateCandidate(id, updates);
      setCandidates((prev) => prev.map((item) => (item.id === id ? updated : item)));
      return updated;
    } catch (err) {
      setError(err.message || 'Error al actualizar el candidato');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const deleted = await candidateService.deleteCandidate(id);
      setCandidates((prev) => prev.map((item) => (item.id === id ? deleted : item)));
      return deleted;
    } catch (err) {
      setError(err.message || 'Error al eliminar el candidato');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCandidateById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const candidate = await candidateService.getCandidateById(id);
      return candidate;
    } catch (err) {
      setError(err.message || 'Candidato no encontrado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      candidates,
      loading,
      error,
      filters,
      setFilters,
      loadCandidates,
      createCandidate,
      updateCandidate,
      deleteCandidate,
      getCandidateById,
    }),
    [candidates, loading, error, filters]
  );

  return <CandidateContext.Provider value={value}>{children}</CandidateContext.Provider>;
}
