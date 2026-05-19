
import React, { useState } from 'react';
import { FileStack, Library, Search, Download, CheckCircle2, Clock, Send, User, Calendar, FileText, ChevronRight } from 'lucide-react';
import { MOCK_TEMPLATES, MOCK_RESOURCES } from '../mockData';

type SubTab = 'tracking' | 'library';

const TemplatesModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('tracking');
  const [search, setSearch] = useState('');

  const filteredTemplates = MOCK_TEMPLATES.filter(t => 
    t.type.toLowerCase().includes(search.toLowerCase()) || 
    t.responsible.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFiles = MOCK_RESOURCES.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-charcoal-900">Módulo de Plantillas</h2>
          <p className="text-charcoal-500 text-sm">Gestión de formularios internos y biblioteca de archivos corporativos.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Sub-navigation */}
      <div className="flex space-x-4 border-b border-charcoal-200">
        <button
          onClick={() => setActiveSubTab('tracking')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 px-2 ${
            activeSubTab === 'tracking' 
              ? 'border-gold-600 text-charcoal-900' 
              : 'border-transparent text-charcoal-400 hover:text-charcoal-600'
          }`}
        >
          Estado de Formularios Internos
        </button>
        <button
          onClick={() => setActiveSubTab('library')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 px-2 ${
            activeSubTab === 'library' 
              ? 'border-gold-600 text-charcoal-900' 
              : 'border-transparent text-charcoal-400 hover:text-charcoal-600'
          }`}
        >
          Biblioteca de Archivos (Word/Excel)
        </button>
      </div>

      <div className="mt-6 animate-in fade-in duration-300">
        {activeSubTab === 'tracking' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-charcoal-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-charcoal-50 text-charcoal-500 text-[10px] uppercase font-black tracking-widest border-b border-charcoal-100">
                  <tr>
                    <th className="px-6 py-4">Tipo de Plantilla</th>
                    <th className="px-6 py-4">Responsable</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Creado</th>
                    <th className="px-6 py-4">Finalizado</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-50">
                  {filteredTemplates.map((template) => (
                    <tr key={template.id} className="hover:bg-charcoal-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-charcoal-900 rounded-lg">
                            <FileText size={16} className="text-gold" />
                          </div>
                          <span className="text-sm font-bold text-charcoal-900">{template.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-charcoal-100 rounded-full flex items-center justify-center">
                            <User size={12} className="text-charcoal-500" />
                          </div>
                          <span className="text-xs font-medium text-charcoal-700">{template.responsible}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                          template.status === 'Completado' ? 'bg-green-100 text-green-700' :
                          template.status === 'Enviado' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {template.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[11px] text-charcoal-500 font-mono">
                        {template.createdAt}
                      </td>
                      <td className="px-6 py-4 text-[11px] text-charcoal-500 font-mono">
                        {template.completedAt || '--/--/----'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-charcoal-300 hover:text-gold transition">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-charcoal-50/50 border-t border-charcoal-100 flex justify-center">
              <button className="text-xs font-bold text-gold-700 hover:text-gold-900 uppercase tracking-widest flex items-center">
                <Send size={14} className="mr-2" /> Asignar Nueva Plantilla a Empleado
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => (
              <div key={file.id} className="bg-white p-6 rounded-2xl border border-charcoal-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black border ${
                    file.format === 'DOCX' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    file.format === 'XLSX' ? 'bg-green-50 text-green-600 border-green-100' :
                    'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {file.format}
                  </div>
                  <button className="p-2 text-charcoal-300 hover:text-gold transition group-hover:bg-gold-50 rounded-lg">
                    <Download size={18} />
                  </button>
                </div>
                <h4 className="text-sm font-bold text-charcoal-900 mb-1">{file.name}</h4>
                <p className="text-[11px] text-charcoal-500 mb-4 line-clamp-2">{file.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-charcoal-50">
                  <span className="text-[9px] text-charcoal-400 uppercase font-bold tracking-widest">v2.4 - {file.updatedAt}</span>
                  <span className="text-[9px] text-gold-600 font-black uppercase">CORPORATIVO</span>
                </div>
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold-50 -mr-8 -mt-8 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
              </div>
            ))}
            
            {/* Add New Slot */}
            <div className="border-2 border-dashed border-charcoal-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-gold-400 hover:bg-gold-50/20 transition cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-charcoal-50 flex items-center justify-center text-charcoal-400 group-hover:text-gold transition mb-3">
                <FileStack size={24} />
              </div>
              <p className="text-xs font-black text-charcoal-600 uppercase tracking-tighter">Subir Nueva Plantilla Base</p>
              <p className="text-[10px] text-charcoal-400 mt-1">Solo administradores</p>
            </div>
          </div>
        )}
      </div>

      {/* Reminder Banner */}
      <div className="bg-charcoal-900 p-6 rounded-2xl border border-gold-600/30 flex items-center justify-between text-white overflow-hidden relative">
        <div className="relative z-10 flex items-center space-x-6">
          <div className="p-3 bg-gold-600/20 rounded-2xl text-gold border border-gold-600/30">
            <Clock size={24} />
          </div>
          <div>
            <h5 className="font-bold text-lg font-serif">Recordatorio de Normativa</h5>
            <p className="text-sm text-charcoal-400">Todas las plantillas deben ser revisadas por el Socio Gerente antes de ser enviadas a la aseguradora.</p>
          </div>
        </div>
        <button className="relative z-10 bg-gold text-charcoal-900 px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-gold-400 transition shadow-lg">
          Ver Manual de Estilo
        </button>
        {/* Background Graphic */}
        <div className="absolute right-0 bottom-0 opacity-10 -mr-10 -mb-10">
          <FileStack size={200} />
        </div>
      </div>
    </div>
  );
};

export default TemplatesModule;
