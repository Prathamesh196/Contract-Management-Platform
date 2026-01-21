
export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

export enum ContractStatus {
  CREATED = 'CREATED',
  APPROVED = 'APPROVED',
  SENT = 'SENT',
  SIGNED = 'SIGNED',
  LOCKED = 'LOCKED',
  REVOKED = 'REVOKED'
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  position: { x: number; y: number };
  value?: string | boolean;
}

export interface Blueprint {
  id: string;
  name: string;
  fields: Field[];
}

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName: string;
  fields: Field[];
  status: ContractStatus;
  createdAt: string;
}
