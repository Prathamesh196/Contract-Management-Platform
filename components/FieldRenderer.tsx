
import React from 'react';
import { Field } from '../models/types';

interface FieldRendererProps {
  field: Field;
  onChange?: (val: string | boolean) => void;
  disabled?: boolean;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, onChange, disabled }) => {
  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            disabled={disabled}
            value={field.value as string || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Input data..."
            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 font-semibold placeholder-slate-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-base sm:text-lg"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            disabled={disabled}
            value={field.value as string || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 font-semibold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all disabled:opacity-70 text-base sm:text-lg"
          />
        );
      case 'checkbox':
        return (
          <label className={`flex items-center p-5 rounded-xl border-2 transition-all cursor-pointer group ${field.value ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}>
            <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${field.value ? 'bg-blue-600' : 'bg-white border-2 border-slate-200 group-hover:border-blue-300'}`}>
              <input
                type="checkbox"
                disabled={disabled}
                checked={field.value as boolean || false}
                onChange={(e) => onChange?.(e.target.checked)}
                className="hidden"
              />
              {field.value && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>}
            </div>
            <span className="ml-4 text-sm sm:text-base font-bold text-slate-700 tracking-tight">{field.label}</span>
          </label>
        );
      case 'signature':
        return (
          <div className={`w-full min-h-[120px] sm:min-h-[140px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all px-6 py-4 text-center ${
            field.value ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200'
          }`}>
            {field.value ? (
              <div className="flex flex-col items-center">
                <span className="font-serif italic text-2xl sm:text-3xl text-blue-900 tracking-wider">
                  {field.value}
                </span>
                <div className="w-48 h-0.5 bg-blue-200 mt-2"></div>
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-2">Certified Digital Proxy</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-4">Official Execution Zone</span>
                {!disabled && (
                  <button 
                    onClick={(e) => { e.preventDefault(); onChange?.(`${new Date().toLocaleTimeString()} :: SIGNED`); }}
                    className="bg-slate-900 text-white text-[10px] sm:text-xs px-8 py-3 rounded-full hover:bg-blue-600 transition-all uppercase font-black tracking-widest shadow-lg active:scale-95"
                  >
                    Apply Signature
                  </button>
                )}
                {disabled && <span className="text-xs font-bold text-slate-300 italic">Signature Required at SENT phase</span>}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {field.type !== 'checkbox' && (
        <label className="block text-[11px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] ml-1">
          {field.label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default FieldRenderer;
