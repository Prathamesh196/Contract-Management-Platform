
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContractStore } from '../store/ContractStore';
import { canEditContract } from '../utils/lifecycle';
import FieldRenderer from '../components/FieldRenderer';
import StatusBadge from '../components/StatusBadge';
import LifecycleActions from '../components/LifecycleActions';
import { ContractStatus } from '../models/types';

const ContractView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contracts, updateContract } = useContractStore();
  
  const contract = contracts.find(c => c.id === id);

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  if (!contract) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-2xl font-bold text-slate-900">Contract Not Found</h2>
        <p className="text-slate-500 mt-2">The document you're looking for doesn't exist or has been removed.</p>
        <button 
            onClick={() => navigate('/')} 
            className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-700 transition-colors"
        >
            Back to Dashboard
        </button>
      </div>
    );
  }

  const isEditable = canEditContract(contract.status);
  // Special rule: Even if canEditContract is true, we only allow typing in fields during CREATED state.
  // Once APPROVED or SENT, values are usually locked unless we are 'signing'.
  const allowFieldInput = contract.status === ContractStatus.CREATED;
  const isRevokedOrLocked = [ContractStatus.REVOKED, ContractStatus.LOCKED].includes(contract.status);

  const handleFieldChange = (fieldId: string, value: string | boolean) => {
    // We allow signature updates during SENT phase
    const field = contract.fields.find(f => f.id === fieldId);
    const isSigning = field?.type === 'signature' && contract.status === ContractStatus.SENT;
    
    if (!allowFieldInput && !isSigning) return;

    const updatedFields = contract.fields.map(f => 
      f.id === fieldId ? { ...f, value } : f
    );
    updateContract(contract.id, { fields: updatedFields });
  };

  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-16 bg-slate-50/95 backdrop-blur-sm z-30 py-6 border-b border-slate-200 -mx-8 px-8">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => navigate('/')} 
            className="text-slate-400 hover:text-slate-900 h-10 w-10 flex items-center justify-center border border-slate-200 bg-white rounded-full transition-all shadow-sm active:scale-95"
          >
            ←
          </button>
          <div className="flex flex-col">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">{contract.name}</h1>
              <StatusBadge status={contract.status} />
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                Based on Template: <span className="text-slate-900">{contract.blueprintName}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           {isRevokedOrLocked && (
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                   Workflow Concluded
               </span>
           )}
           <LifecycleActions contract={contract} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white min-h-[1200px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-sm border border-slate-200 p-24 relative overflow-hidden">
        {/* Status Watermark */}
        {isRevokedOrLocked && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none opacity-[0.03] select-none">
                <span className="text-[200px] font-black uppercase tracking-tighter">{contract.status}</span>
            </div>
        )}

        <div className="border-b-8 border-slate-900 pb-12 mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-5xl font-serif font-black text-slate-900 uppercase tracking-tighter">Agreement</h2>
            <p className="text-slate-400 text-xs mt-4 font-bold uppercase tracking-[0.3em]">Legally Binding Document Instance</p>
          </div>
          <div className="text-right flex flex-col items-end">
             <div className="bg-slate-900 text-white text-[9px] px-3 py-1 font-black uppercase tracking-widest rounded mb-3">
               {contract.status === ContractStatus.LOCKED ? 'Final Record' : 'Active Document'}
             </div>
             <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">Doc ID: {contract.id.toUpperCase()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
           {contract.fields.map((field) => (
             <FieldRenderer 
               key={field.id}
               field={field}
               disabled={!isEditable || (field.type !== 'signature' && !allowFieldInput)}
               onChange={(val) => handleFieldChange(field.id, val)}
             />
           ))}
        </div>

        {contract.fields.length === 0 && (
          <div className="h-96 flex flex-col items-center justify-center text-slate-300 border-4 border-double border-slate-100 rounded-3xl">
             <p className="font-serif italic text-lg">This template contains no specific provisions.</p>
          </div>
        )}
        
        <div className="mt-48 pt-12 border-t-2 border-slate-100 flex justify-between items-center">
            <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Effective Date</p>
                <p className="text-sm font-mono text-slate-500">{new Date(contract.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
            </div>
            <div className="flex items-center space-x-2 opacity-30 grayscale">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-xs">C</div>
                <span className="text-xs font-black text-slate-900 uppercase tracking-tighter">Contract Management</span>
            </div>
            <div className="text-right space-y-1">
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Hash Verification</p>
                <p className="text-[10px] font-mono text-slate-400 truncate w-32">{btoa(contract.id).slice(0, 24)}...</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContractView;