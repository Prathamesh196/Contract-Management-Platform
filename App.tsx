
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
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">C</div>
                <span className="text-xl font-bold tracking-tight text-slate-900">Contract Management <span className="text-blue-600">Platform</span></span>
              </Link>
              <nav className="flex space-x-8">
                <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Dashboard</Link>
                <Link to="/blueprints/new" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Templates</Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blueprints/new" element={<BlueprintBuilder />} />
              <Route path="/contracts/new" element={<ContractCreator />} />
              <Route path="/contracts/:id" element={<ContractView />} />
            </Routes>
          </main>

          <footer className="bg-slate-50 border-t border-slate-200 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
              <p>&copy; 2024 Contract Management Platform. Local Storage Persistence Enabled.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="hover:text-slate-600 cursor-default">Privacy</span>
                <span className="hover:text-slate-600 cursor-default">Security</span>
                <span className="hover:text-slate-600 cursor-default">Help Center</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ContractProvider>
  );
};

export default App;