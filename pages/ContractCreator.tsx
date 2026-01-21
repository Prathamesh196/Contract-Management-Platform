
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContractStore } from '../store/ContractStore';

const ContractCreator: React.FC = () => {
  const navigate = useNavigate();
  const { blueprints, addContract } = useContractStore();
  const [name, setName] = useState('');
  const [blueprintId, setBlueprintId] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const blueprint = blueprints.find(b => b.id === blueprintId);
    if (!name || !blueprint) return;

    addContract(name, blueprint);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Dark Header for Contrast */}
        <div className="bg-slate-900 p-8">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-1">Create New Contract</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Initialize a fresh document instance</p>
        </div>

        <form onSubmit={handleCreate} className="p-8 space-y-8">
          {/* Contract Title with White Text on Dark Background Style */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-inner">
            <label className="block text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3">Contract Instance Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q3 Sales Agreement - Acme Corp"
              className="w-full bg-transparent border-none p-0 text-xl font-bold text-white placeholder-slate-600 focus:ring-0 outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Select Template (Blueprint)</label>
            <div className="relative">
              <select
                required
                value={blueprintId}
                onChange={(e) => setBlueprintId(e.target.value)}
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
              >
                <option value="">Choose a blueprint...</option>
                {blueprints.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            {blueprints.length === 0 && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg flex items-center">
                <span className="text-lg mr-2">⚠️</span>
                <p className="text-xs text-orange-700 font-bold uppercase tracking-tight">No blueprints available. Create one first.</p>
              </div>
            )}
          </div>

          <div className="pt-6 flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name || !blueprintId}
              className="px-10 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-30 disabled:grayscale transition-all font-black text-xs uppercase tracking-[0.15em] shadow-lg shadow-blue-500/30 active:scale-95"
            >
              Generate Contract
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Secure Lifecycle Environment</p>
      </div>
    </div>
  );
};

export default ContractCreator;
