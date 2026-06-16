import { Chip } from '@mui/material';

const statusProps = {
  Disponible: { color: 'success' },
  'En proceso': { color: 'warning' },
  Contratado: { color: 'primary' },
  'No disponible': { color: 'default' },
};

function CandidateStatusChip({ status }) {
  const props = statusProps[status] || { color: 'default' };
  return <Chip label={status} size="small" {...props} />;
}

export default CandidateStatusChip;
