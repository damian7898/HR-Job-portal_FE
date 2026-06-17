import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import JobList from '../pages/JobList';
import JobDetail from '../pages/JobDetail';
import JobForm from '../pages/JobForm';
import CandidateList from '../pages/CandidateList';
import CandidateForm from '../pages/CandidateForm';
import CandidateDetail from '../pages/CandidateDetail';
import Settings from '../pages/Settings';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="puestos" element={<JobList />} />
        <Route path="puestos/nuevo" element={<JobForm />} />
        <Route path="puestos/:id/editar" element={<JobForm />} />
        <Route path="puestos/:id" element={<JobDetail />} />
        <Route path="candidatos" element={<CandidateList />} />
        <Route path="candidatos/nuevo" element={<CandidateForm />} />
        <Route path="candidatos/:id/editar" element={<CandidateForm />} />
        <Route path="candidatos/:id" element={<CandidateDetail />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
