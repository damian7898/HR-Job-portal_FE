import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import JobList from '../pages/JobList';
import JobDetail from '../pages/JobDetail';
import JobForm from '../pages/JobForm';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="puestos" element={<JobList />} />
        <Route path="puestos/nuevo" element={<JobForm />} />
        <Route path="puestos/:id/editar" element={<JobForm />} />
        <Route path="puestos/:id" element={<JobDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
