
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContractStore } from '../store/ContractStore';
import ContractTable from '../components/ContractTable';
import BlueprintTable from '../components/BlueprintTable';
import { ContractStatus } from '../models/types';

const Dashboard: React.FC = () => {
  const { contracts, blueprints } = useContractStore();
  const [activeTab, setActiveTab] = useState<'CONTRACTS' | 'BLUEPRINTS'>('CONTRACTS');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING' | 'SIGNED'>('ALL');

  const filteredContracts = contracts.filter(c => {
    if (filter === 'ALL') return true;
    if (filter === 'ACTIVE') return [ContractStatus.CREATED, ContractStatus.APPROVED].includes(c.status);
    if (filter === 'PENDING') return c.status === ContractStatus.SENT;
    if (filter === 'SIGNED') return c.status === ContractStatus.SIGNED;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Management Console</h1>
          <p className="text-slate-500 text-sm">Orchestrate your legal document workflows and templates.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/blueprints/new" 
            className="px-5 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold text-xs uppercase tracking-widest border border-slate-200 shadow-sm flex items-center"
          >
            <span className="mr-2 text-lg">+</span> Design Blueprint
          </Link>
          <Link 
            to="/contracts/new" 
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 flex items-center"
          >
            <span className="mr-2 text-lg">+</span> New Contract
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-colors">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Contracts</p>
          <p className="text-4xl font-black text-slate-900 mt-2">{contracts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-colors">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Template Library</p>
          <p className="text-4xl font-black text-slate-900 mt-2">{blueprints.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-green-200 transition-colors">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Finalized</p>
          <p className="text-4xl font-black text-green-600 mt-2">
            {contracts.filter(c => c.status === ContractStatus.SIGNED || c.status === ContractStatus.LOCKED).length}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Tab Selection */}
        <div className="flex items-center border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('CONTRACTS')}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
              activeTab === 'CONTRACTS' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Contract Instances
            {activeTab === 'CONTRACTS' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('BLUEPRINTS')}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
              activeTab === 'BLUEPRINTS' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Document Blueprints
            {activeTab === 'BLUEPRINTS' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
          </button>
        </div>

        {activeTab === 'CONTRACTS' ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Filter Status:</span>
              {['ALL', 'ACTIVE', 'PENDING', 'SIGNED'].map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all border ${
                    filter === f 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <ContractTable contracts={filteredContracts} />
          </div>
        ) : (
          <BlueprintTable blueprints={blueprints} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
