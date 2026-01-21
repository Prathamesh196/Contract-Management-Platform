
import React from 'react';
import { Contract, ContractStatus } from '../models/types';
import { getAllowedNextStatuses } from '../utils/lifecycle';
import { useContractStore } from '../store/ContractStore';

interface LifecycleActionsProps {
  contract: Contract;
}

const LifecycleActions: React.FC<LifecycleActionsProps> = ({ contract }) => {
  const { changeContractStatus } = useContractStore();
  const nextStatuses = getAllowedNextStatuses(contract.status);

  if (nextStatuses.length === 0) return null;

  const getActionLabel = (status: ContractStatus) => {
    switch (status) {
      case ContractStatus.APPROVED: return 'Approve Contract';
      case ContractStatus.SENT: return 'Send to Client';
      case ContractStatus.SIGNED: return 'Mark as Signed';
      case ContractStatus.LOCKED: return 'Lock (Finalize)';
      case ContractStatus.REVOKED: return 'Revoke Contract';
      default: return `Transition to ${status}`;
    }
  };

  const getButtonStyles = (status: ContractStatus) => {
    if (status === ContractStatus.REVOKED) return 'bg-red-600 hover:bg-red-700 text-white';
    if (status === ContractStatus.LOCKED) return 'bg-slate-800 hover:bg-slate-900 text-white';
    return 'bg-blue-600 hover:bg-blue-700 text-white';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {nextStatuses.map((status) => (
        <button
          key={status}
          onClick={() => changeContractStatus(contract.id, status)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm ${getButtonStyles(status)}`}
        >
          {getActionLabel(status)}
        </button>
      ))}
    </div>
  );
};

export default LifecycleActions;
