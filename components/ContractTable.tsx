
import React from 'react';
import { Link } from 'react-router-dom';
import { Contract } from '../models/types';
import StatusBadge from './StatusBadge';

interface ContractTableProps {
  contracts: Contract[];
}

const ContractTable: React.FC<ContractTableProps> = ({ contracts }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contract Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Blueprint</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Created Date</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {contracts.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-slate-400">No contracts found.</td>
            </tr>
          ) : (
            contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{contract.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{contract.blueprintName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={contract.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(contract.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/contracts/${contract.id}`} className="text-blue-600 hover:text-blue-900">View & Manage</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;
