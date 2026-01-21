
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

  const handleAddField = (type: FieldType) => {
    const newField: Field = {
      id: crypto.randomUUID(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      position: { x: 0, y: 0 },
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    // 1. Validate Input
    if (!name.trim()) {
      alert('Please provide a name for this blueprint.');
      return;
    }
    if (fields.length === 0) {
      alert('Templates require at least one field component.');
      return;
    }
    
    // 2. Add to Global Store
    addBlueprint(name, fields);
    
    // 3. Show Success Message
    setShowSuccess(true);
    
    // 4. Redirect after user sees the confirmation
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-128px)] flex flex-col -m-8 relative">
      {/* Success Notification Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-500">
          <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Success!</h2>
            <p className="text-slate-600 font-medium mt-2">Template created successfully.</p>
            <div className="mt-6 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      )}

      {/* Builder Toolbar - The text input is now white for contrast */}
      <div className="bg-slate-900 px-8 py-4 border-b border-slate-800 flex items-center justify-between shadow-lg z-30">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Exit
          </button>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Blueprint Title</span>
            <input
              type="text"
              placeholder="e.g. Master Services Agreement"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg font-bold text-white border-none p-0 focus:ring-0 placeholder-slate-600 bg-transparent w-80"
              autoFocus
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <p className="text-[10px] text-slate-500 font-medium hidden md:block italic">All changes are saved locally.</p>
           <button
            onClick={handleSave}
            disabled={showSuccess}
            className={`px-8 py-2.5 bg-blue-600 text-white rounded-full transition-all font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95 ${showSuccess ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 shadow-blue-500/20'}`}
          >
            {showSuccess ? 'Saving...' : 'Publish Template'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <FieldPalette onAddField={handleAddField} />
        <div className="flex-1 overflow-auto flex flex-col">
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
