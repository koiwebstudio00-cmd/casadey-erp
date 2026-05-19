
import { Case, CaseStatus, ClaimType, PortfolioType, InternalTemplate, Task, Credential, CompanyFile } from './types';

export const MOCK_CASES: Case[] = [
  {
    id: '1',
    caseNumber: 'CAS-2024-001',
    clientName: 'Roberto Gómez',
    assignedLawyer: 'Dra. Elena Martínez',
    insuranceCompany: 'Federación Patronal',
    claimType: ClaimType.INJURY,
    incidentDate: '2024-01-15',
    status: CaseStatus.NEGOTIATING,
    portfolio: PortfolioType.GAMAN,
    offeredAmount: 1500000,
    agreedAmount: 0,
    commission: 300000,
    paymentStatus: 'Pendiente'
  },
  {
    id: '2',
    caseNumber: 'CAS-2024-002',
    clientName: 'María Luz Soria',
    assignedLawyer: 'Dr. Javier Casadey',
    insuranceCompany: 'La Caja',
    claimType: ClaimType.MATERIAL,
    incidentDate: '2024-02-10',
    status: CaseStatus.DOC_PENDING,
    portfolio: PortfolioType.CASADEY,
    offeredAmount: 0,
    agreedAmount: 0,
    commission: 0,
    paymentStatus: 'Pendiente'
  },
  {
    id: '3',
    caseNumber: 'CAS-2023-450',
    clientName: 'Esteban Quito',
    assignedLawyer: 'Dra. Elena Martínez',
    insuranceCompany: 'Sancor Seguros',
    claimType: ClaimType.INJURY,
    incidentDate: '2023-11-20',
    status: CaseStatus.PAID,
    portfolio: PortfolioType.GAMAN,
    offeredAmount: 2200000,
    agreedAmount: 2100000,
    commission: 420000,
    paymentStatus: 'Pagado'
  },
  {
    id: '4',
    caseNumber: 'CAS-2024-015',
    clientName: 'Lucía Fernández',
    assignedLawyer: 'Dr. Javier Casadey',
    insuranceCompany: 'Rivadaia Seguros',
    claimType: ClaimType.MATERIAL,
    incidentDate: '2024-03-05',
    status: CaseStatus.OFFER_RECEIVED,
    portfolio: PortfolioType.CASADEY,
    offeredAmount: 850000,
    agreedAmount: 0,
    commission: 170000,
    paymentStatus: 'Pendiente'
  }
];

export const MOCK_TEMPLATES: InternalTemplate[] = [
  { id: 't1', type: 'Pacto de litis', status: 'Completado', responsible: 'Benjamin', createdAt: '2024-03-01', completedAt: '2024-03-02' },
  { id: 't2', type: 'No seguro', status: 'Pendiente', responsible: 'Sofia', createdAt: '2024-03-10' },
  { id: 't3', type: 'Pedido HC Padilla', status: 'Enviado', responsible: 'Benjamin', createdAt: '2024-03-05' }
];

export const MOCK_TASKS: Task[] = [
  { id: 'tk1', employeeName: 'Benjamin', description: 'Revisar documentación de Roberto Gómez', status: 'En progreso', dueDate: '2024-03-25' },
  { id: 'tk2', employeeName: 'Sofia', description: 'Cargar pacto de litis de Lucía Fernández', status: 'Pendiente', dueDate: '2024-03-26' },
  { id: 'tk3', employeeName: 'Benjamin', description: 'Enviar pedido HC Padilla de Caso 450', status: 'Completada', dueDate: '2024-03-20' },
  { id: 'tk4', employeeName: 'Sofia', description: 'Llamar a aseguradora La Caja por Caso 002', status: 'Pendiente', dueDate: 'Hoy' }
];

export const MOCK_DOCS = [
  { id: 'd1', caseId: '1', name: 'DNI Frontal', status: 'Aprobado', uploadedBy: 'Roberto Gómez', uploadedAt: '20/01/2024', version: 1 },
  { id: 'd2', caseId: '1', name: 'Título Automotor', status: 'Observado', uploadedBy: 'Admin Principal', uploadedAt: '22/01/2024', version: 2 },
  { id: 'd3', caseId: '1', name: 'Pacto de Litis Firmado', status: 'Recibido', uploadedBy: 'Benjamin', uploadedAt: '25/01/2024', version: 1 },
  { id: 'd4', caseId: '2', name: 'Denuncia Administrativa', status: 'Pendiente' },
  { id: 'd5', caseId: '2', name: 'DNI Cliente', status: 'Pendiente' },
  { id: 'd6', caseId: '3', name: 'Acta de Choque', status: 'Aprobado', uploadedBy: 'Sofia', uploadedAt: '15/12/2023', version: 1 },
  { id: 'd7', caseId: '3', name: 'Presupuesto Taller', status: 'Aprobado', uploadedBy: 'Benjamin', uploadedAt: '18/12/2023', version: 1 },
  { id: 'd8', caseId: '4', name: 'Certificado Médico', status: 'Recibido', uploadedBy: 'Lucía Fernández', uploadedAt: '10/03/2024', version: 1 }
];

export const MOCK_CREDENTIALS: Credential[] = [
  { id: 'c1', service: 'Sindicato de Seguro - Portal', user: 'casadey_estudio', pass: 'Seguros2024!', category: 'Aseguradoras' },
  { id: 'c2', service: 'PJN - Notificaciones Electrónicas', user: '20-30444555-9', pass: 'Token_Casadey_88', category: 'Judicial' },
  { id: 'c3', service: 'Correo Argentino - Envíos', user: 'admin@estudiocasadey.com', pass: 'EnviosLitis#', category: 'Administrativo' },
  { id: 'c4', service: 'Federación Patronal Web', user: '307112233', pass: 'FP_Casadey_1', category: 'Aseguradoras' }
];

export const MOCK_RESOURCES: CompanyFile[] = [
  { id: 'f1', name: 'Pacto de Honorarios (Litis)', format: 'DOCX', description: 'Modelo estándar para firma de clientes.', updatedAt: '01/03/2024' },
  { id: 'f2', name: 'Declaración No Seguro', format: 'DOCX', description: 'Plantilla para reclamos sin cobertura de tercero.', updatedAt: '12/02/2024' },
  { id: 'f3', name: 'Pedido Historia Clínica - Padilla', format: 'DOCX', description: 'Formulario de solicitud formal al Hospital Padilla.', updatedAt: '20/01/2024' },
  { id: 'f4', name: 'Checklist Requisitos GAMAN', format: 'PDF', description: 'Guía de documentos necesarios para brokers GAMAN.', updatedAt: '05/03/2024' },
  { id: 'f5', name: 'Calculadora de Indemnizaciones', format: 'XLSX', description: 'Planilla de cálculo según baremos actuales.', updatedAt: '15/03/2024' }
];
