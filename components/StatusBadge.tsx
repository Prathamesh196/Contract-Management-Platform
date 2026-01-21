
import React from 'react';
import { ContractStatus } from '../models/types';
import { getStatusColor } from '../utils/lifecycle';

interface StatusBadgeProps {
  status: ContractStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = getStatusColor(status);
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
