
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Blueprint, Contract, ContractStatus, Field } from '../models/types';
import { loadState, saveState } from '../utils/storage';

interface ContractContextType {
  blueprints: Blueprint[];
  contracts: Contract[];
  addBlueprint: (name: string, fields: Field[]) => void;
  addContract: (name: string, blueprint: Blueprint) => void;
  updateContract: (id: string, updates: Partial<Contract>) => void;
  changeContractStatus: (id: string, status: ContractStatus) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blueprints, setBlueprints] = useState<Blueprint[]>(() => loadState('blueprints', []));
  const [contracts, setContracts] = useState<Contract[]>(() => loadState('contracts', []));

  useEffect(() => saveState('blueprints', blueprints), [blueprints]);
  useEffect(() => saveState('contracts', contracts), [contracts]);

  const addBlueprint = (name: string, fields: Field[]) => {
    const newBlueprint: Blueprint = {
      id: crypto.randomUUID(),
      name: name.trim() || 'Untitled Template',
      fields
    };
    setBlueprints(prev => [...prev, newBlueprint]);
  };

  const addContract = (name: string, blueprint: Blueprint) => {
    const newContract: Contract = {
      id: crypto.randomUUID(),
      name: name.trim() || `${blueprint.name} Instance`,
      blueprintId: blueprint.id,
      blueprintName: blueprint.name,
      fields: blueprint.fields.map(f => ({ ...f, value: f.type === 'checkbox' ? false : '' })),
      status: ContractStatus.CREATED,
      createdAt: new Date().toISOString()
    };
    setContracts(prev => [newContract, ...prev]);
  };

  const updateContract = (id: string, updates: Partial<Contract>) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const changeContractStatus = (id: string, status: ContractStatus) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <ContractContext.Provider value={{ blueprints, contracts, addBlueprint, addContract, updateContract, changeContractStatus }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractStore = () => {
  const context = useContext(ContractContext);
  if (!context) throw new Error('useContractStore must be used within a ContractProvider');
  return context;
};
