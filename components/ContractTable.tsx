
import React from 'react';
import { Link } from 'react-router-dom';
import { Contract } from '../models/types';
import StatusBadge from './StatusBadge';

interface ContractTableProps {
  contracts: Contract[];
}

const ContractTable: React.FC<ContractTableProps> = ({ contracts }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contract Title</th>
              <th className="hidden md:table-cell px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Template</th>
              <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="hidden lg:table-cell px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Created</th>
              <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-4">📂</span>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Queue is Empty</p>
                  </div>
                </td>
              </tr>
            ) : (
              contracts.map((contract) => (
                <tr key={contract.id} className="group hover:bg-slate-50/80 transition-all">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{contract.name}</span>
                      <span className="md:hidden text-[10px] text-slate-400 font-medium mt-0.5">{contract.blueprintName}</span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-500">
                    {contract.blueprintName}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <StatusBadge status={contract.status} />
                  </td>
                  <td className="hidden lg:table-cell px-6 py-5 whitespace-nowrap text-sm font-mono text-slate-400">
                    {new Date(contract.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <Link 
                      to={`/contracts/${contract.id}`} 
                      className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="md:hidden p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">← Swipe horizontally for more details →</p>
      </div>
    </div>
  );
};

export default ContractTable;
