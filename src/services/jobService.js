import apiClient from './apiClient';
import mockJobs from '../data/mockJobs';

const useMock = true;

export async function getJobs() {
  if (useMock) {
    return Promise.resolve([...mockJobs]);
  }

  const response = await apiClient.get('/');
  return response.data;
}

export async function getJobById(id) {
  if (useMock) {
    const job = mockJobs.find((item) => item.id === id);
    if (!job) {
      throw new Error('Puesto no encontrado');
    }
    return { ...job };
  }

  const response = await apiClient.get(`/${id}`);
  return response.data;
}

export async function createJob(job) {
  if (useMock) {
    const generatedId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const created = {
      ...job,
      id: generatedId,
      fechaPublicacion: new Date().toISOString(),
      estado: 'Activo',
    };
    mockJobs.unshift(created);
    return created;
  }

  const response = await apiClient.post('/', job);
  return response.data;
}

export async function updateJob(id, updates) {
  if (useMock) {
    const index = mockJobs.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Puesto no encontrado');
    }
    mockJobs[index] = { ...mockJobs[index], ...updates };
    return { ...mockJobs[index] };
  }

  const response = await apiClient.put(`/${id}`, updates);
  return response.data;
}

export async function deleteJob(id) {
  if (useMock) {
    const job = mockJobs.find((item) => item.id === id);
    if (!job) {
      throw new Error('Puesto no encontrado');
    }
    job.estado = 'Inactivo';
    return { ...job };
  }

  const response = await apiClient.delete(`/${id}`);
  return response.data;
}
