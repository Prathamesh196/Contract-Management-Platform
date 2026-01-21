
import React, { useState } from 'react';
import { Field } from '../models/types';
import FieldRenderer from './FieldRenderer';

interface BlueprintCanvasProps {
  fields: Field[];
  onUpdateField: (id: string, updates: Partial<Field>) => void;
  onRemoveField: (id: string) => void;
}

const BlueprintCanvas: React.FC<BlueprintCanvasProps> = ({ fields, onUpdateField, onRemoveField }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div 
      className="flex-1 bg-slate-100 overflow-auto p-8 md:p-12 min-h-full scrollbar-hide"
      onClick={() => setEditingId(null)}
    >
      {/* Document Sheet */}
      <div className="max-w-4xl mx-auto bg-white min-h-[1120px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm border border-slate-200 p-20 relative transition-all">
        <div className="border-b-4 border-slate-900 pb-10 mb-16 flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-serif font-black text-slate-900 uppercase tracking-tighter">Draft Template</h2>
            <p className="text-slate-400 text-xs mt-3 font-bold uppercase tracking-widest flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Configuration Mode
            </p>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Document Ref</div>
             <div className="text-sm font-mono text-slate-400">#TMP-{Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
          </div>
        </div>

        {fields.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
               <span className="text-4xl">📄</span>
            </div>
            <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">Canvas is Empty</p>
            <p className="text-sm mt-2">Select components from the palette to start building.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {fields.map((field) => (
              <div 
                key={field.id}
                className={`relative p-6 rounded-2xl transition-all border-2 group ${
                  editingId === field.id 
                    ? 'border-blue-500 bg-blue-50/20 ring-8 ring-blue-500/5' 
                    : 'border-transparent hover:border-slate-100 hover:bg-slate-50/50'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(field.id);
                }}
              >
                {/* Field Header / Tools */}
                <div className={`absolute -top-5 left-4 right-4 flex items-center justify-between z-20 transition-all duration-200 ${editingId === field.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  <div className="bg-white border-2 border-blue-500 px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-2">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">Label</span>
                    <input 
                      className="text-xs font-bold outline-none text-slate-800 w-32 bg-transparent focus:text-blue-700"
                      value={field.label}
                      onChange={(e) => onUpdateField(field.id, { label: e.target.value })}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus={editingId === field.id}
                      placeholder="Enter Label..."
                    />
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemoveField(field.id); }}
                    className="bg-white border-2 border-red-500 text-red-500 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95"
                    title="Delete Component"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>

                {/* The actual field visual */}
                <div className="opacity-80 pointer-events-none">
                  <FieldRenderer field={field} disabled={true} />
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-32 pt-16 border-t border-slate-100 text-center">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">End of Document Specification</span>
        </div>
      </div>
    </div>
  );
};

export default BlueprintCanvas;
