
import { ContractStatus } from '../models/types';

const ALLOWED_TRANSITIONS: Record<ContractStatus, ContractStatus[]> = {
  [ContractStatus.CREATED]: [ContractStatus.APPROVED, ContractStatus.REVOKED],
  [ContractStatus.APPROVED]: [ContractStatus.SENT],
  [ContractStatus.SENT]: [ContractStatus.SIGNED, ContractStatus.REVOKED],
  [ContractStatus.SIGNED]: [ContractStatus.LOCKED],
  [ContractStatus.LOCKED]: [],
  [ContractStatus.REVOKED]: [],
};

export const getAllowedNextStatuses = (currentStatus: ContractStatus): ContractStatus[] => {
  return ALLOWED_TRANSITIONS[currentStatus] || [];
};

export const canEditContract = (status: ContractStatus): boolean => {
  // Only editable in CREATED state per standard requirements, 
  // though signatures might be added during SENT.
  return ![ContractStatus.LOCKED, ContractStatus.REVOKED].includes(status);
};

export const getStatusColor = (status: ContractStatus): string => {
  switch (status) {
    case ContractStatus.CREATED: return 'bg-gray-100 text-gray-700 border-gray-200';
    case ContractStatus.APPROVED: return 'bg-blue-100 text-blue-700 border-blue-200';
    case ContractStatus.SENT: return 'bg-orange-100 text-orange-700 border-orange-200';
    case ContractStatus.SIGNED: return 'bg-green-100 text-green-700 border-green-200';
    case ContractStatus.LOCKED: return 'bg-slate-800 text-white border-slate-900';
    case ContractStatus.REVOKED: return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700';
  }
};
