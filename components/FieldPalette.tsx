
import React from 'react';
import { FieldType } from '../models/types';

interface FieldPaletteProps {
  onAddField: (type: FieldType) => void;
}

const FieldPalette: React.FC<FieldPaletteProps> = ({ onAddField }) => {
  const tools: { type: FieldType; icon: string; label: string; description: string }[] = [
    { type: 'text', icon: '📝', label: 'Text Input', description: 'Standard text entry field' },
    { type: 'date', icon: '📅', label: 'Date Picker', description: 'Calendar selection field' },
    { type: 'checkbox', icon: '✅', label: 'Checkbox', description: 'Boolean toggle field' },
    { type: 'signature', icon: '✍️', label: 'Signature', description: 'Secure digital signing area' },
  ];

  return (
    <div className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 h-full">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Field Palette</h3>
        <p className="text-[11px] text-slate-500 leading-tight">Click to add components to your document blueprint.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tools.map((tool) => (
          <button
            key={tool.type}
            onClick={() => onAddField(tool.type)}
            className="w-full flex items-start space-x-4 p-4 text-left border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all group"
          >
            <span className="text-2xl bg-slate-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">{tool.icon}</span>
            <div>
              <span className="block text-sm font-bold text-slate-800 group-hover:text-blue-700">{tool.label}</span>
              <span className="text-[11px] text-slate-500">{tool.description}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-100">
            <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
              <strong>Tip:</strong> You can edit labels directly on the canvas once added.
            </p>
        </div>
      </div>
    </div>
  );
};

export default FieldPalette;
