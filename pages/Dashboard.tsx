
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
    <div className="space-y-10 sm:space-y-16">
      {/* Hero / Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
            <span>Local Database Connected</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">Management Console</h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium max-w-xl">
            Monitor contract progress, manage reusable blueprints, and execute digital signatures.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
          <Link 
            to="/blueprints/new" 
            className="group px-8 py-4 bg-white text-slate-900 rounded-2xl hover:border-blue-600 border-2 border-slate-200 transition-all font-black text-xs uppercase tracking-widest shadow-sm flex items-center justify-center active:scale-95"
          >
            <span className="mr-3 text-xl group-hover:scale-125 transition-transform">+</span> Create Blueprint
          </Link>
          <Link 
            to="/contracts/new" 
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-slate-900 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 flex items-center justify-center active:scale-95"
          >
            <span className="mr-3 text-xl">+</span> New Contract
          </Link>
        </div>
      </div>

      {/* Analytics / Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full opacity-50 transition-transform group-hover:scale-110"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center sm:text-left">Contract Volume</p>
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-3">
             <p className="text-5xl font-black text-slate-900">{contracts.length}</p>
             <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Total Active</span>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full opacity-50 transition-transform group-hover:scale-110"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center sm:text-left">Blueprint Assets</p>
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-3">
             <p className="text-5xl font-black text-slate-900">{blueprints.length}</p>
             <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Saved Templates</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full opacity-50 transition-transform group-hover:scale-110"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center sm:text-left">Completion Hub</p>
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-3">
             <p className="text-5xl font-black text-green-600">
               {contracts.filter(c => [ContractStatus.SIGNED, ContractStatus.LOCKED].includes(c.status)).length}
             </p>
             <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Fully Executed</span>
          </div>
        </div>
      </div>

      {/* Tabbed List Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b-2 border-slate-100 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center">
            <button 
              onClick={() => setActiveTab('CONTRACTS')}
              className={`px-6 sm:px-8 py-6 text-xs font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                activeTab === 'CONTRACTS' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Contract Records
              {activeTab === 'CONTRACTS' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full shadow-[0_-4px_10px_rgba(37,99,235,0.3)]"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('BLUEPRINTS')}
              className={`px-6 sm:px-8 py-6 text-xs font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                activeTab === 'BLUEPRINTS' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Blueprint Library
              {activeTab === 'BLUEPRINTS' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full shadow-[0_-4px_10px_rgba(37,99,235,0.3)]"></div>}
            </button>
          </div>
        </div>

        {activeTab === 'CONTRACTS' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">Filter Status:</span>
                <div className="flex gap-2">
                  {['ALL', 'ACTIVE', 'PENDING', 'SIGNED'].map((f) => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f as any)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border-2 whitespace-nowrap ${
                        filter === f 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                          : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                {filteredContracts.length} Results
              </div>
            </div>
            <ContractTable contracts={filteredContracts} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Templates</h3>
            </div>
            <BlueprintTable blueprints={blueprints} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
