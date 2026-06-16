import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as jobService from '../services/jobService';

const JobContext = createContext(null);

export function useJobs() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    area: '',
    modalidad: '',
    seniority: '',
    sort: 'desc',
    page: 1,
    perPage: 6,
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await jobService.getJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los puestos');
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (job) => {
    setLoading(true);
    setError(null);

    try {
      const created = await jobService.createJob(job);
      setJobs((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err.message || 'Error al crear el puesto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, updates) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await jobService.updateJob(id, updates);
      setJobs((prev) => prev.map((job) => (job.id === id ? updated : job)));
      return updated;
    } catch (err) {
      setError(err.message || 'Error al actualizar el puesto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const deleted = await jobService.deleteJob(id);
      setJobs((prev) => prev.map((job) => (job.id === id ? deleted : job)));
      return deleted;
    } catch (err) {
      setError(err.message || 'Error al eliminar el puesto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const job = await jobService.getJobById(id);
      return job;
    } catch (err) {
      setError(err.message || 'Puesto no encontrado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      jobs,
      loading,
      error,
      filters,
      setFilters,
      loadJobs,
      createJob,
      updateJob,
      deleteJob,
      getJobById,
    }),
    [jobs, loading, error, filters]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}
