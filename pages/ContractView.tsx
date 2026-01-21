
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
      <div className="py-24 text-center px-6 max-w-md mx-auto">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🔍</div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Record Not Found</h2>
        <p className="text-slate-500 mt-2 font-medium">The requested contract instance does not exist in the current local scope.</p>
        <button 
            onClick={() => navigate('/')} 
            className="mt-8 w-full py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95"
        >
            Return to Dash
        </button>
      </div>
    );
  }

  const isEditable = canEditContract(contract.status);
  const allowFieldInput = contract.status === ContractStatus.CREATED;
  const isRevokedOrLocked = [ContractStatus.REVOKED, ContractStatus.LOCKED].includes(contract.status);

  const handleFieldChange = (fieldId: string, value: string | boolean) => {
    const field = contract.fields.find(f => f.id === fieldId);
    const isSigning = field?.type === 'signature' && contract.status === ContractStatus.SENT;
    
    if (!allowFieldInput && !isSigning) return;

    const updatedFields = contract.fields.map(f => 
      f.id === fieldId ? { ...f, value } : f
    );
    updateContract(contract.id, { fields: updatedFields });
  };

  return (
    <div className="space-y-6 sm:space-y-10 pb-32">
      {/* Dynamic Navigation Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sticky top-16 sm:top-20 bg-slate-50/90 backdrop-blur-md z-40 py-4 sm:py-6 border-b border-slate-200 -mx-4 sm:-mx-8 px-4 sm:px-8">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button 
            onClick={() => navigate('/')} 
            className="text-slate-500 hover:text-slate-900 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center border border-slate-200 bg-white rounded-xl transition-all shadow-sm active:scale-90 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-3 overflow-hidden">
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tighter truncate leading-tight">{contract.name}</h1>
              <div className="shrink-0 scale-90 sm:scale-100"><StatusBadge status={contract.status} /></div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 truncate">
                Origin: <span className="text-slate-900">{contract.blueprintName}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           {isRevokedOrLocked && (
               <div className="flex items-center px-4 py-2 bg-slate-200 rounded-lg border border-slate-300">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Archived</span>
               </div>
           )}
           <LifecycleActions contract={contract} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-xl border border-slate-200 p-6 sm:p-12 md:p-24 relative overflow-hidden transition-all duration-500">
        {/* Massive Status Watermark */}
        {isRevokedOrLocked && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-[0.03] select-none text-center">
                <span className="text-7xl sm:text-[180px] lg:text-[240px] font-black uppercase tracking-tighter leading-none">{contract.status}</span>
            </div>
        )}

        {/* Document Header */}
        <div className="border-b-4 sm:border-b-[12px] border-slate-900 pb-8 sm:pb-16 mb-12 sm:mb-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 sm:gap-0">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-slate-900 uppercase tracking-tighter leading-[0.85]">AGREEMENT</h2>
            <div className="flex items-center space-x-4 mt-6">
                <div className="h-0.5 w-12 bg-blue-600"></div>
                <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em]">Official Execution Instrument</p>
            </div>
          </div>
          <div className="text-left sm:text-right flex flex-col items-start sm:items-end w-full sm:w-auto">
             <div className="bg-slate-900 text-white text-[9px] sm:text-[10px] px-4 py-1.5 font-black uppercase tracking-widest rounded-md mb-4 shadow-lg shadow-slate-900/10">
               {contract.status === ContractStatus.LOCKED ? 'VERIFIED RECORD' : 'ACTIVE INSTANCE'}
             </div>
             <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">REF: {contract.id.split('-')[0].toUpperCase()}</p>
          </div>
        </div>
        
        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 sm:gap-y-16">
           {contract.fields.map((field) => (
             <div key={field.id} className="transition-all hover:translate-y-[-2px]">
               <FieldRenderer 
                 field={field}
                 disabled={!isEditable || (field.type !== 'signature' && !allowFieldInput)}
                 onChange={(val) => handleFieldChange(field.id, val)}
               />
             </div>
           ))}
        </div>

        {contract.fields.length === 0 && (
          <div className="h-64 sm:h-[400px] flex flex-col items-center justify-center text-slate-300 border-4 border-double border-slate-100 rounded-[40px] p-10 text-center">
             <div className="text-5xl mb-6 opacity-30">📜</div>
             <p className="font-serif italic text-lg sm:text-2xl text-slate-400 max-w-sm">This specific instrument does not currently contain designated field modules.</p>
          </div>
        )}
        
        {/* Document Footer */}
        <div className="mt-32 sm:mt-56 pt-12 sm:pt-16 border-t-2 border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">
            <div className="space-y-2 text-center lg:text-left">
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Timestamp</p>
                <p className="text-sm sm:text-base font-mono text-slate-500">{new Date(contract.createdAt).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4 opacity-20 grayscale">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg">C</div>
                <div className="h-8 w-px bg-slate-300"></div>
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">System Authentication</span>
            </div>

            <div className="text-center lg:text-right space-y-2">
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Verification Integrity Hash</p>
                <p className="text-[10px] sm:text-xs font-mono text-slate-400 break-all max-w-[240px] sm:max-w-xs mx-auto lg:ml-auto">
                    SHA-256: {btoa(contract.id + contract.createdAt).slice(0, 48)}...
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContractView;
