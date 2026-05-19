
export enum CaseStatus {
  DOC_PENDING = 'Documentación pendiente',
  DOC_COMPLETE = 'Documentación completa',
  PRESENTED = 'Presentado a aseguradora',
  NEGOTIATING = 'En negociación',
  OFFER_RECEIVED = 'Oferta recibida',
  ACCEPTED = 'Aceptado',
  REJECTED = 'Rechazado',
  CLOSED = 'Cerrado',
  PAID = 'Pagado'
}

export enum ClaimType {
  INJURY = 'Lesiones',
  MATERIAL = 'Daños materiales'
}

export enum PortfolioType {
  GAMAN = 'Cartera GAMAN',
  CASADEY = 'Cartera Estudio Casadey'
}

export interface Case {
  id: string;
  caseNumber: string;
  clientName: string;
  assignedLawyer: string;
  insuranceCompany: string;
  claimType: ClaimType;
  incidentDate: string;
  status: CaseStatus;
  portfolio: PortfolioType;
  offeredAmount?: number;
  agreedAmount?: number;
  commission?: number;
  paymentStatus: 'Pendiente' | 'Pagado';
}

export interface Document {
  id: string;
  caseId: string;
  name: string;
  status: 'Pendiente' | 'Recibido' | 'Observado' | 'Aprobado';
  uploadedBy?: string;
  uploadedAt?: string;
  version?: number;
}

export interface InternalTemplate {
  id: string;
  type: 'Pacto de litis' | 'No seguro' | 'Pedido HC Centro' | 'Pedido HC Padilla';
  status: 'Pendiente' | 'Completado' | 'Enviado';
  responsible: string;
  createdAt: string;
  completedAt?: string;
}

export interface Task {
  id: string;
  employeeName: string;
  description: string;
  status: 'Pendiente' | 'En progreso' | 'Completada';
  dueDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: Date;
}

export interface Credential {
  id: string;
  service: string;
  user: string;
  pass: string;
  category: string;
}

export interface CompanyFile {
  id: string;
  name: string;
  format: 'DOCX' | 'PDF' | 'XLSX';
  description: string;
  updatedAt: string;
}
