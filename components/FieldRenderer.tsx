
import React from 'react';
import { Field } from '../models/types';

interface FieldRendererProps {
  field: Field;
  onChange?: (val: string | boolean) => void;
  disabled?: boolean;
  absolute?: boolean;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, onChange, disabled, absolute }) => {
  // We ignore 'absolute' and 'position' now to maintain a clean grid structure
  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            disabled={disabled}
            value={field.value as string || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Click to enter text..."
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            disabled={disabled}
            value={field.value as string || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-slate-50"
          />
        );
      case 'checkbox':
        return (
          <label className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
            <input
              type="checkbox"
              disabled={disabled}
              checked={field.value as boolean || false}
              onChange={(e) => onChange?.(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-sm font-semibold text-slate-700">{field.label}</span>
          </label>
        );
      case 'signature':
        return (
          <div className={`w-full h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${
            field.value ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200 hover:border-blue-300'
          }`}>
            {field.value ? (
              <span className="font-serif italic text-xl text-blue-800 tracking-wider">
                {field.value}
              </span>
            ) : (
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Digital Signature</span>
                {!disabled && (
                  <button 
                    onClick={(e) => { e.preventDefault(); onChange?.(new Date().toLocaleDateString() + ' - SIGNED'); }}
                    className="bg-slate-900 text-white text-[10px] px-4 py-1.5 rounded-full hover:bg-blue-600 transition-colors uppercase font-black"
                  >
                    Click to sign
                  </button>
                )}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {field.type !== 'checkbox' && (
        <label className="block text-[11px] font-black text-slate-500 mb-2 uppercase tracking-tighter">
          {field.label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default FieldRenderer;
