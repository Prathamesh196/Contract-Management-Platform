
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ContractProvider } from './store/ContractStore';
import Dashboard from './pages/Dashboard';
import BlueprintBuilder from './pages/BlueprintBuilder';
import ContractCreator from './pages/ContractCreator';
import ContractView from './pages/ContractView';

const App: React.FC = () => {
  return (
    <ContractProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20 shrink-0">C</div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-xl font-black tracking-tighter text-slate-900 leading-none">
                    Contract Management <span className="text-blue-600">System</span>
                  </span>
                  <span className="hidden xs:block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Enterprise Platform</span>
                </div>
              </Link>
              <nav className="flex items-center space-x-3 sm:space-x-8">
                <Link to="/" className="text-[10px] sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Dash</Link>
                <Link to="/blueprints/new" className="px-3 py-2 sm:px-5 sm:py-2.5 bg-slate-900 text-white rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md active:scale-95 whitespace-nowrap">
                  <span className="hidden sm:inline">New </span>Template
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blueprints/new" element={<BlueprintBuilder />} />
              <Route path="/contracts/new" element={<ContractCreator />} />
              <Route path="/contracts/:id" element={<ContractView />} />
            </Routes>
          </main>

          <footer className="bg-white border-t border-slate-200 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start space-y-2">
                <div className="flex items-center space-x-2 grayscale opacity-50">
                  <div className="w-5 h-5 bg-slate-900 rounded flex items-center justify-center text-white font-black text-[8px]">C</div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Contract Management System</span>
                </div>
                <p className="text-slate-400 text-[10px] sm:text-xs font-medium text-center md:text-left">
                  &copy; 2025 Enterprise Systems. All signatures locally secured.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                {['Terms', 'Privacy', 'Compliance', 'Support'].map(item => (
                  <span key={item} className="text-[10px] sm:text-xs font-bold text-slate-400 hover:text-blue-600 cursor-pointer uppercase tracking-widest transition-colors">{item}</span>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ContractProvider>
  );
};

export default App;
