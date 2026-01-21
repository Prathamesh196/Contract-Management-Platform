
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Blueprint } from '../models/types';
import { useContractStore } from '../store/ContractStore';

interface BlueprintTableProps {
  blueprints: Blueprint[];
}

const BlueprintTable: React.FC<BlueprintTableProps> = ({ blueprints }) => {
  const navigate = useNavigate();
  const { addContract } = useContractStore();

  const handleQuickCreate = (blueprint: Blueprint) => {
    const name = `New ${blueprint.name} - ${new Date().toLocaleDateString()}`;
    addContract(name, blueprint);
    navigate('/');
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Template Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Field Count</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID Ref</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {blueprints.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium">
                No blueprints designed yet. Click "Design Blueprint" to start.
              </td>
            </tr>
          ) : (
            blueprints.map((blueprint) => (
              <tr key={blueprint.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center mr-3 font-bold text-xs">
                      TP
                    </div>
                    <span className="text-sm font-bold text-slate-900">{blueprint.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {blueprint.fields.length} component{blueprint.fields.length !== 1 ? 's' : ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-400">
                  {blueprint.id.split('-')[0].toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleQuickCreate(blueprint)}
                    className="text-blue-600 hover:text-blue-900 font-bold"
                  >
                    Generate Contract
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlueprintTable;
