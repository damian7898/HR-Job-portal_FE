import apiClient from './apiClient';
import mockCandidates from '../data/mockCandidates';

const useMock = true;
const API_PATH = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/candidates';

export async function getCandidates() {
  if (useMock) {
    return Promise.resolve([...mockCandidates]);
  }

  const response = await apiClient.get(API_PATH);
  return response.data;
}

export async function getCandidateById(id) {
  if (useMock) {
    const candidate = mockCandidates.find((item) => item.id === id);
    if (!candidate) {
      throw new Error('Candidato no encontrado');
    }
    return { ...candidate };
  }

  const response = await apiClient.get(`${API_PATH}/${id}`);
  return response.data;
}

export async function createCandidate(candidate) {
  if (useMock) {
    const generatedId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `cand-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();
    const created = {
      ...candidate,
      id: generatedId,
      status: candidate.status || 'Disponible',
      createdAt: now,
      updatedAt: now,
    };
    mockCandidates.unshift(created);
    return created;
  }

  const response = await apiClient.post(API_PATH, candidate);
  return response.data;
}

export async function updateCandidate(id, updates) {
  if (useMock) {
    const index = mockCandidates.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Candidato no encontrado');
    }
    mockCandidates[index] = {
      ...mockCandidates[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return { ...mockCandidates[index] };
  }

  const response = await apiClient.put(`${API_PATH}/${id}`, updates);
  return response.data;
}

export async function deleteCandidate(id) {
  if (useMock) {
    const candidate = mockCandidates.find((item) => item.id === id);
    if (!candidate) {
      throw new Error('Candidato no encontrado');
    }
    candidate.status = 'No disponible';
    candidate.updatedAt = new Date().toISOString();
    return { ...candidate };
  }

  const response = await apiClient.delete(`${API_PATH}/${id}`);
  return response.data;
}
