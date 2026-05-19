
import React, { useState } from 'react';
import { Search, FileText, CheckCircle, Clock, AlertCircle, Upload, Eye, History, Filter, ChevronRight, ArrowLeft } from 'lucide-react';
import { MOCK_CASES, MOCK_DOCS } from '../mockData';
import { Case, CaseStatus } from '../types';

const DocsModule: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = MOCK_CASES.filter(c => 
    c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDocStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprobado': return <CheckCircle size={18} className="text-green-500" />;
      case 'Observado': return <AlertCircle size={18} className="text-red-500" />;
      case 'Recibido': return <Clock size={18} className="text-blue-500" />;
      default: return <Clock size={18} className="text-charcoal-300" />;
    }
  };

  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprobado': return 'bg-green-100 text-green-700';
      case 'Observado': return 'bg-red-100 text-red-700';
      case 'Recibido': return 'bg-blue-100 text-blue-700';
      default: return 'bg-charcoal-100 text-charcoal-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center lg:mb-4">
        <h2 className="text-2xl lg:text-3xl font-serif font-bold text-charcoal-900">Documentación</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Case List Sidebar - Hidden on mobile if a case is selected */}
        <div className={`lg:col-span-4 bg-white rounded-2xl shadow-sm border border-charcoal-100 overflow-hidden flex flex-col h-[calc(100vh-280px)] lg:h-[calc(100vh-250px)] ${selectedCase ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-charcoal-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar caso..." 
                className="w-full pl-10 pr-4 py-2 bg-charcoal-50 border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-charcoal-50">
            {filteredCases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`w-full p-4 text-left hover:bg-charcoal-50 transition flex items-center justify-between group ${
                  selectedCase?.id === c.id ? 'bg-gold-50 border-l-4 border-gold-600' : 'border-l-4 border-transparent'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gold-700 uppercase tracking-tighter">{c.caseNumber}</p>
                  <p className="text-sm font-bold text-charcoal-900 truncate">{c.clientName}</p>
                  <p className="text-[9px] text-charcoal-500 uppercase tracking-widest mt-0.5">{c.insuranceCompany}</p>
                </div>
                <ChevronRight size={16} className={`text-charcoal-300 group-hover:text-gold transition ${selectedCase?.id === c.id ? 'text-gold' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Document Detail Area - Shown as full screen on mobile when selected */}
        <div className={`lg:col-span-8 space-y-4 lg:space-y-6 h-[calc(100vh-280px)] lg:h-[calc(100vh-250px)] overflow-y-auto no-scrollbar ${!selectedCase ? 'hidden lg:flex flex-col' : 'flex flex-col'}`}>
          {selectedCase ? (
            <div className="space-y-4 lg:space-y-6">
              {/* Case Header Card */}
              <div className="bg-charcoal-900 text-white p-4 lg:p-6 rounded-2xl shadow-lg border border-gold-600/30">
                <div className="flex items-center lg:hidden mb-4">
                  <button onClick={() => setSelectedCase(null)} className="p-2 -ml-2 text-gold">
                    <ArrowLeft size={20} />
                  </button>
                  <span className="text-xs font-bold text-gold/50 uppercase ml-2 tracking-widest">Volver a la lista</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg lg:text-2xl font-serif font-bold text-gold leading-tight">{selectedCase.clientName}</h3>
                    <p className="text-charcoal-400 text-[10px] lg:text-sm mt-1 uppercase tracking-widest font-bold">EXP {selectedCase.caseNumber}</p>
                  </div>
                  <span className="text-[8px] lg:text-[10px] px-2 py-0.5 rounded font-black uppercase bg-gold text-charcoal-900">
                    {selectedCase.status}
                  </span>
                </div>
              </div>

              {/* Documentation Checklist */}
              <div className="bg-white rounded-2xl shadow-sm border border-charcoal-100 overflow-hidden">
                <div className="p-3 lg:p-4 bg-charcoal-50 border-b border-charcoal-100 flex justify-between items-center">
                  <h4 className="text-xs lg:text-sm font-bold text-charcoal-900 flex items-center uppercase tracking-widest">
                    <FileText size={16} className="mr-2 text-gold lg:w-[18px]" /> Archivos
                  </h4>
                </div>

                <div className="divide-y divide-charcoal-50">
                  {MOCK_DOCS.filter(d => d.caseId === selectedCase.id).map(doc => (
                    <div key={doc.id} className="p-3 lg:p-4 hover:bg-charcoal-50/50 transition flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5 shrink-0">{getDocStatusIcon(doc.status)}</div>
                          <div>
                            <p className="text-xs lg:text-sm font-bold text-charcoal-900 leading-tight">{doc.name}</p>
                            <p className={`text-[8px] lg:text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded font-black uppercase tracking-tighter ${getDocStatusBadge(doc.status)}`}>
                              {doc.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {(doc.status === 'Recibido' || doc.status === 'Aprobado') && (
                            <button className="p-1.5 text-charcoal-400 hover:text-gold transition">
                              <Eye size={16} />
                            </button>
                          )}
                          <button className="p-1.5 text-charcoal-400 hover:text-gold transition">
                            <History size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-[8px] text-charcoal-400 font-bold italic truncate mr-2">
                          {doc.uploadedAt ? `v${doc.version} - ${doc.uploadedAt}` : 'Sin cargar'}
                        </div>
                        <button className="px-3 py-1.5 bg-charcoal-900 text-white text-[9px] font-black rounded-lg hover:bg-charcoal-800 transition flex items-center uppercase tracking-widest">
                          <Upload size={12} className="mr-1 text-gold" /> {doc.uploadedBy ? 'Cambiar' : 'Subir'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-charcoal-50/50 border-t border-charcoal-100">
                  <button className="w-full py-3 border-2 border-dashed border-charcoal-200 rounded-xl flex flex-col items-center justify-center group hover:border-gold-300 hover:bg-white transition">
                    <Upload size={20} className="text-charcoal-300 group-hover:text-gold mb-1" />
                    <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Agregar Documento</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-white rounded-2xl border border-charcoal-100 border-dashed opacity-50 p-10 text-center">
              <FileText size={48} className="text-charcoal-200 lg:w-16 lg:h-16" />
              <p className="mt-4 font-bold text-charcoal-900 text-sm lg:text-base">Seleccioná un caso para ver archivos</p>
              <p className="text-[10px] text-charcoal-400 uppercase tracking-widest mt-1">Navegá por expediente o cliente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocsModule;
