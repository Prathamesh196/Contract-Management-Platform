
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContractStore } from '../store/ContractStore';
import { Field, FieldType } from '../models/types';
import FieldPalette from '../components/FieldPalette';
import BlueprintCanvas from '../components/BlueprintCanvas';

const BlueprintBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { addBlueprint } = useContractStore();
  const [name, setName] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  const handleAddField = (type: FieldType) => {
    const newField: Field = {
      id: crypto.randomUUID(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      position: { x: 0, y: 0 },
    };
    setFields([...fields, newField]);
    setShowMobilePalette(false);
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please provide a name for this blueprint.');
      return;
    }
    if (fields.length === 0) {
      alert('Templates require at least one field component.');
      return;
    }
    
    addBlueprint(name, fields);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-64px)] sm:h-[calc(100vh-128px)] flex flex-col -m-4 sm:-m-8 relative">
      {/* Success Notification Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-500 p-6">
          <div className="bg-white w-full max-w-sm p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-300 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Success!</h2>
            <p className="text-slate-600 font-medium mt-2">Template created successfully.</p>
            <div className="mt-6 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      )}

      {/* Builder Toolbar */}
      <div className="bg-slate-900 px-4 sm:px-8 py-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between shadow-lg z-30 gap-4 sm:gap-0">
        <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-slate-400 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Exit
          </button>
          <div className="hidden sm:block h-6 w-px bg-slate-700"></div>
          <div className="flex flex-col flex-1 sm:flex-none ml-4 sm:ml-0">
            <span className="text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Blueprint Title</span>
            <input
              type="text"
              placeholder="Enter Template Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm sm:text-lg font-bold text-white border-none p-0 focus:ring-0 placeholder-slate-600 bg-transparent w-full sm:w-80"
              autoFocus
            />
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4">
           <button
            onClick={() => setShowMobilePalette(!showMobilePalette)}
            className="lg:hidden px-4 py-2 bg-slate-800 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest border border-slate-700"
           >
            {showMobilePalette ? 'Close Tools' : 'Show Tools'}
           </button>
           <button
            onClick={handleSave}
            disabled={showSuccess}
            className={`px-6 sm:px-8 py-2.5 bg-blue-600 text-white rounded-full transition-all font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-xl active:scale-95 ${showSuccess ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 shadow-blue-500/20'}`}
          >
            {showSuccess ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative flex-col lg:flex-row">
        {/* Responsive Palette Overlay/Sidebar */}
        <div className={`
          fixed lg:relative inset-0 lg:inset-auto z-40 transition-transform duration-300 lg:translate-x-0
          ${showMobilePalette ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-full sm:w-72 lg:w-72 h-full bg-white
        `}>
          <FieldPalette onAddField={handleAddField} />
          <button 
            onClick={() => setShowMobilePalette(false)}
            className="lg:hidden absolute top-4 right-4 text-slate-400 p-2"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto flex flex-col bg-slate-100">
          <BlueprintCanvas 
            fields={fields} 
            onUpdateField={updateField} 
            onRemoveField={removeField} 
          />
        </div>
      </div>
    </div>
  );
};

export default BlueprintBuilder;
