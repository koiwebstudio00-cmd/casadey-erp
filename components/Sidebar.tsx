
import React from 'react';
import { LayoutDashboard, Gavel, FileText, DollarSign, Bot, ClipboardList, UserCircle, Briefcase, FileStack } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isClientView: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isClientView }) => {
  const menuItems = isClientView 
    ? [
        { id: 'portal', label: 'Mi Caso', icon: LayoutDashboard },
        { id: 'docs-upload', label: 'Subir Documentos', icon: FileText },
        { id: 'support', label: 'Ayuda', icon: Bot },
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'tasks', label: 'Tareas y Bot', icon: ClipboardList },
        { id: 'cases', label: 'Casos y Siniestros', icon: Gavel },
        { id: 'docs', label: 'Documentación', icon: FileText },
        { id: 'templates', label: 'Plantillas', icon: FileStack },
        { id: 'resources', label: 'Recursos', icon: Briefcase },
        { id: 'metrics', label: 'Contaduría', icon: DollarSign },
      ];

  return (
    <div className="w-64 bg-charcoal-900 text-white min-h-screen hidden lg:flex flex-col border-r border-gold-600/30">
      <div className="p-6 flex flex-col items-center border-b border-charcoal-800">
        <img 
          src="https://i.postimg.cc/3x7crnTs/eedae8fc-0c91-488b-8edc-a9bb6fe3ffdf.png" 
          alt="LitisManager Logo" 
          className="w-40 h-auto object-contain mb-2"
        />
        <p className="text-[10px] text-gold-500 uppercase tracking-widest font-semibold">Sistema de Gestión</p>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/20' 
                  : 'text-charcoal-400 hover:bg-charcoal-800 hover:text-gold-200'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-charcoal-800">
        <div className="flex items-center space-x-3 text-sm text-charcoal-300">
          <UserCircle size={24} className="text-gold" />
          <div className="truncate">
            <p className="font-semibold text-white">Admin Principal</p>
            <p className="text-xs text-charcoal-500">Socio Gerente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
