
import React from 'react';
import { FileText, FileStack, Briefcase, DollarSign, ChevronRight, LayoutDashboard, Gavel, ClipboardList } from 'lucide-react';

interface MoreMenuProps {
  setActiveTab: (tab: string) => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ setActiveTab }) => {
  const categories = [
    {
      title: "Gestión de Casos",
      items: [
        { id: 'docs', label: 'Documentación', icon: FileText, desc: 'Expedientes y archivos de clientes' },
        { id: 'templates', label: 'Plantillas', icon: FileStack, desc: 'Modelos de escritos y pactos' },
      ]
    },
    {
      title: "Administración",
      items: [
        { id: 'metrics', label: 'Contaduría', icon: DollarSign, desc: 'Honorarios, comisiones y caja' },
        { id: 'resources', label: 'Recursos', icon: Briefcase, desc: 'Credenciales y accesos' },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <header>
        <h2 className="text-2xl font-serif font-bold text-charcoal-900">Módulos del Estudio</h2>
        <p className="text-charcoal-500 text-xs uppercase tracking-widest mt-1 font-bold">Navegación Extendida</p>
      </header>

      <div className="space-y-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-[10px] font-black text-gold-700 uppercase tracking-[0.2em] ml-1">{cat.title}</h3>
            <div className="grid grid-cols-1 gap-3">
              {cat.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="w-full bg-white p-4 rounded-2xl shadow-sm border border-charcoal-100 flex items-center justify-between group active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-charcoal-50 rounded-xl text-gold group-hover:bg-gold-50 transition-colors">
                      <item.icon size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-charcoal-900">{item.label}</p>
                      <p className="text-[10px] text-charcoal-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-charcoal-200" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-charcoal-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <p className="text-gold text-[10px] font-black uppercase tracking-widest mb-1">Sesión Activa</p>
          <p className="text-sm font-bold">Admin Principal</p>
          <p className="text-[10px] text-charcoal-400 mt-4 uppercase tracking-tighter">Estudio Casadey & GAMAN Brokers © 2024</p>
        </div>
        <LayoutDashboard className="absolute right-0 bottom-0 text-white opacity-5 -mr-8 -mb-8" size={150} />
      </div>
    </div>
  );
};

export default MoreMenu;
