
import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronRight, MoreVertical, ArrowLeft, Gavel, Calendar, User, Shield, AlertCircle, DollarSign, Briefcase, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_CASES } from '../mockData';
import { Case, CaseStatus, ClaimType } from '../types';

const CasesModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [activeFilter, setActiveFilter] = useState<'Todos' | 'Lesiones' | 'Daños'>('Todos');

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.DOC_PENDING: return 'bg-orange-100 text-orange-700 border-orange-200';
      case CaseStatus.NEGOTIATING: return 'bg-blue-100 text-blue-700 border-blue-200';
      case CaseStatus.PAID: return 'bg-green-100 text-green-700 border-green-200';
      case CaseStatus.OFFER_RECEIVED: return 'bg-purple-100 text-purple-700 border-purple-200';
      case CaseStatus.CLOSED: return 'bg-charcoal-100 text-charcoal-700 border-charcoal-200';
      default: return 'bg-charcoal-100 text-charcoal-700 border-charcoal-200';
    }
  };

  const filteredCases = MOCK_CASES.filter(c => {
    const matchesSearch = c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || 
                         (activeFilter === 'Lesiones' && c.claimType === ClaimType.INJURY) ||
                         (activeFilter === 'Daños' && c.claimType === ClaimType.MATERIAL);
    return matchesSearch && matchesFilter;
  });

  const statusSteps = [
    CaseStatus.DOC_PENDING,
    CaseStatus.DOC_COMPLETE,
    CaseStatus.PRESENTED,
    CaseStatus.NEGOTIATING,
    CaseStatus.OFFER_RECEIVED,
    CaseStatus.ACCEPTED,
    CaseStatus.PAID
  ];

  const currentStatusIndex = selectedCase ? statusSteps.indexOf(selectedCase.status) : -1;

  return (
    <div className="flex flex-col h-full space-y-4 lg:space-y-6">
      {/* Header Section */}
      <header className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${selectedCase ? 'hidden lg:flex' : 'flex'}`}>
        <div>
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-charcoal-900">Casos y Siniestros</h2>
          <p className="text-charcoal-500 text-sm">Gestión integral de la cartera de reclamos.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-charcoal-900 text-gold px-6 py-2.5 rounded-xl transition shadow-lg hover:bg-charcoal-800 active:scale-95 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Nuevo Siniestro</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* List View - Hidden on mobile when case is selected */}
        <div className={`lg:col-span-5 xl:col-span-4 bg-white rounded-2xl shadow-sm border border-charcoal-100 flex flex-col overflow-hidden ${selectedCase ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-charcoal-100 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por cliente o expediente..." 
                className="w-full pl-10 pr-4 py-2.5 bg-charcoal-50 border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              {(['Todos', 'Lesiones', 'Daños'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${
                    activeFilter === f 
                      ? 'bg-gold text-charcoal-900 shadow-sm' 
                      : 'bg-charcoal-50 text-charcoal-500 hover:bg-charcoal-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-charcoal-50 no-scrollbar">
            {filteredCases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`w-full p-5 text-left transition-all border-l-4 group ${
                  selectedCase?.id === c.id 
                    ? 'bg-gold-50 border-gold-600' 
                    : 'bg-white border-transparent hover:bg-charcoal-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-gold-700 bg-gold-100 px-2 py-0.5 rounded tracking-tighter uppercase">
                    {c.caseNumber}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase tracking-widest ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-charcoal-900 mb-1 group-hover:text-gold-900 transition-colors">{c.clientName}</h4>
                <div className="flex items-center justify-between text-[10px] text-charcoal-500 font-bold uppercase tracking-widest">
                  <span className="truncate max-w-[150px]">{c.insuranceCompany}</span>
                  <span className="shrink-0">{c.incidentDate}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail View - Shown full on mobile if selected */}
        <div className={`lg:col-span-7 xl:col-span-8 flex flex-col space-y-6 ${!selectedCase ? 'hidden lg:flex' : 'flex'}`}>
          {selectedCase ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6 h-full overflow-y-auto no-scrollbar pb-10">
              {/* Case Header Detail */}
              <div className="bg-charcoal-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gold-600/30 relative overflow-hidden">
                <div className="lg:hidden mb-6">
                  <button onClick={() => setSelectedCase(null)} className="flex items-center text-gold text-xs font-black uppercase tracking-widest">
                    <ArrowLeft size={18} className="mr-2" /> Volver al listado
                  </button>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="bg-gold text-charcoal-900 px-3 py-1 rounded-lg text-xs font-black tracking-widest uppercase">
                        {selectedCase.caseNumber}
                      </span>
                      <span className="text-gold-400/50 font-mono text-xs">Siniestro ID: {selectedCase.id}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-serif font-bold text-white">{selectedCase.clientName}</h3>
                    <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-charcoal-400">
                      <span className="flex items-center"><User size={14} className="mr-1.5 text-gold" /> {selectedCase.assignedLawyer}</span>
                      <span className="flex items-center"><Shield size={14} className="mr-1.5 text-gold" /> {selectedCase.insuranceCompany}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[10px] text-charcoal-400 uppercase font-black tracking-widest mb-1">Monto Acordado</p>
                    <p className="text-3xl font-bold text-gold">
                      {selectedCase.agreedAmount ? `$ ${selectedCase.agreedAmount.toLocaleString()}` : 'En negociación'}
                    </p>
                  </div>
                </div>

                {/* Decorative Icon */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 scale-150 -mr-10">
                  <Gavel size={200} />
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white p-6 rounded-3xl border border-charcoal-100 shadow-sm overflow-x-auto">
                <h4 className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest mb-6 flex items-center">
                  <Clock size={14} className="mr-2 text-gold" /> Línea de Tiempo del Reclamo
                </h4>
                <div className="flex justify-between items-center min-w-[600px] px-4">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;
                    return (
                      <div key={step} className="flex flex-col items-center relative flex-1">
                        {/* Line */}
                        {idx !== 0 && (
                          <div className={`absolute left-[-50%] top-4 w-full h-1 z-0 ${idx <= currentStatusIndex ? 'bg-gold' : 'bg-charcoal-100'}`}></div>
                        )}
                        {/* Dot */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 ${
                          isCompleted ? 'bg-charcoal-900 border-gold text-gold' : 'bg-white border-charcoal-100 text-charcoal-200'
                        } ${isCurrent ? 'ring-4 ring-gold/20' : ''}`}>
                          {isCompleted ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                        </div>
                        <span className={`text-[8px] font-black uppercase mt-3 text-center tracking-tighter ${
                          isCompleted ? 'text-charcoal-900' : 'text-charcoal-400'
                        }`}>
                          {step.replace('Documentación ', 'Doc. ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Data Card */}
                <div className="bg-white p-6 rounded-3xl border border-charcoal-100 shadow-sm space-y-4">
                  <h4 className="text-xs font-black text-charcoal-900 uppercase tracking-widest border-b border-charcoal-50 pb-3 flex items-center">
                    <AlertCircle size={16} className="mr-2 text-gold" /> Datos del Siniestro
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] text-charcoal-400 font-bold uppercase tracking-widest">Tipo</p>
                      <p className="text-xs font-bold text-charcoal-800 flex items-center mt-1">
                        <span className={`w-2 h-2 rounded-full mr-2 ${selectedCase.claimType === ClaimType.INJURY ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                        {selectedCase.claimType}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-charcoal-400 font-bold uppercase tracking-widest">Fecha</p>
                      <p className="text-xs font-bold text-charcoal-800 mt-1">{selectedCase.incidentDate}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-charcoal-400 font-bold uppercase tracking-widest">Cartera</p>
                      <p className="text-xs font-bold text-charcoal-800 mt-1">{selectedCase.portfolio}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-charcoal-400 font-bold uppercase tracking-widest">Estado Pago</p>
                      <p className={`text-xs font-bold mt-1 ${selectedCase.paymentStatus === 'Pagado' ? 'text-green-600' : 'text-orange-600'}`}>
                        {selectedCase.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial Overview Card */}
                <div className="bg-gold-50/30 p-6 rounded-3xl border border-gold-200 shadow-sm space-y-4">
                  <h4 className="text-xs font-black text-charcoal-900 uppercase tracking-widest border-b border-gold-100 pb-3 flex items-center">
                    <DollarSign size={16} className="mr-2 text-gold-700" /> Resumen Económico
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-charcoal-500 font-medium">Monto Ofrecido:</span>
                      <span className="text-charcoal-900 font-bold">$ {selectedCase.offeredAmount?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-charcoal-500 font-medium">Comisión Estudio (20%):</span>
                      <span className="text-gold-800 font-black tracking-tighter">$ {selectedCase.commission?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="pt-2 border-t border-gold-100 flex justify-between items-center">
                      <span className="text-[10px] font-black text-charcoal-900 uppercase">Resultado Neto</span>
                      <span className="text-lg font-bold text-charcoal-900">$ {(selectedCase.agreedAmount || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-charcoal-50 p-4 lg:p-6 rounded-3xl border border-charcoal-100 flex flex-col md:flex-row gap-3">
                <button className="flex-1 bg-charcoal-900 text-gold py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-charcoal-800 transition shadow-lg">
                  <FileText size={16} className="mr-2" /> Emitir Pacto de Honorarios
                </button>
                <button className="flex-1 bg-white text-charcoal-900 border border-charcoal-200 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-charcoal-50 transition shadow-sm">
                  <Shield size={16} className="mr-2 text-gold-600" /> Solicitar Historia Clínica
                </button>
                <button className="p-3 bg-white text-charcoal-400 rounded-2xl border border-charcoal-200 hover:text-red-600 hover:border-red-200 transition">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-white rounded-3xl border-2 border-dashed border-charcoal-100 text-charcoal-300 p-10 text-center animate-pulse">
              <Gavel size={64} className="mb-4 opacity-20" />
              <h3 className="text-lg font-serif font-bold text-charcoal-400">Seleccioná un expediente</h3>
              <p className="text-xs uppercase tracking-widest font-bold mt-2">Para ver el detalle completo, timeline y finanzas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CasesModule;
