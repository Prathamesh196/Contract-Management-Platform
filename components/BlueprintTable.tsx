
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
    const name = `Draft: ${blueprint.name} - ${new Date().toLocaleDateString()}`;
    addContract(name, blueprint);
    navigate('/');
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Template Title</th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Field count</th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Template ID</th>
            <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {blueprints.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                <div className="flex flex-col items-center">
                   <span className="text-3xl mb-4">🎨</span>
                   <p className="font-bold text-xs uppercase tracking-widest">Blueprint Library Empty</p>
                   <p className="text-[11px] mt-1 font-medium">Design your first document template to get started.</p>
                </div>
              </td>
            </tr>
          ) : (
            blueprints.map((blueprint) => (
              <tr key={blueprint.id} className="group hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-4 font-black text-[10px] shadow-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      BP
                    </div>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{blueprint.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-slate-500">
                  {blueprint.fields.length} {blueprint.fields.length === 1 ? 'Variable' : 'Variables'}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-[10px] font-mono font-bold text-slate-300">
                  #{blueprint.id.split('-')[0].toUpperCase()}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <button 
                    onClick={() => handleQuickCreate(blueprint)}
                    className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                  >
                    Use Template
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
