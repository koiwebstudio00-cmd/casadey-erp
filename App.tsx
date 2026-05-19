
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CasesModule from './components/CasesModule';
import AccountingModule from './components/AccountingModule';
import TasksAndBot from './components/TasksAndBot';
import DocsModule from './components/DocsModule';
import TemplatesModule from './components/TemplatesModule';
import ResourcesModule from './components/ResourcesModule';
import ClientPortal from './components/ClientPortal';
import MoreMenu from './components/MoreMenu';
import { UserCircle, Bell, Settings, LogOut, LayoutDashboard, Gavel, ClipboardList, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isClientView, setIsClientView] = useState(false);

  const renderContent = () => {
    if (isClientView) {
      return <ClientPortal />;
    }

    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'cases': return <CasesModule />;
      case 'docs': return <DocsModule />;
      case 'templates': return <TemplatesModule />;
      case 'metrics': return <AccountingModule />;
      case 'tasks': return <TasksAndBot />;
      case 'resources': return <ResourcesModule />;
      case 'more': return <MoreMenu setActiveTab={setActiveTab} />;
      default: return <div className="p-10 text-center text-charcoal-400">Próximamente...</div>;
    }
  };

  const mobileNavItems = isClientView
    ? [
      { id: 'portal', label: 'Mi Caso', icon: LayoutDashboard },
      { id: 'docs-upload', label: 'Docs', icon: Gavel },
      { id: 'support', label: 'Ayuda', icon: ClipboardList },
    ]
    : [
      { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
      { id: 'tasks', label: 'Tareas', icon: ClipboardList },
      { id: 'cases', label: 'Casos', icon: Gavel },
    ];

  return (
    <div className="flex min-h-screen bg-charcoal-50 font-sans text-charcoal-900 pb-20 lg:pb-0">
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:block">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isClientView={isClientView}
        />
      </div>

      <div className="flex-1 flex flex-col w-full overflow-x-hidden">
        {/* Header - Fixed on mobile */}
        <header className="h-16 bg-white border-b border-charcoal-200 px-4 lg:px-8 flex items-center justify-between shadow-sm sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <div className="lg:hidden w-8 h-8 gold-gradient rounded-lg flex items-center justify-center shadow-md">
              <img src="https://i.postimg.cc/3x7crnTs/eedae8fc-0c91-488b-8edc-a9bb6fe3ffdf.png" alt="L" className="w-5 h-5 object-contain invert" />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
              <span className="text-[10px] lg:text-xs font-bold text-charcoal-400 uppercase tracking-widest leading-tight">
                {isClientView ? 'Portal Cliente' : 'Gestión Interna'}
              </span>
              <button
                onClick={() => {
                  const nextClientView = !isClientView;
                  setIsClientView(nextClientView);
                  setActiveTab(nextClientView ? 'portal' : 'dashboard');
                }}
                className="text-[9px] bg-gold-600 text-white px-2 py-0.5 rounded-full font-bold hover:bg-gold-700 transition shadow-sm w-fit"
              >
                VISTA {isClientView ? 'ESTUDIO' : 'CLIENTE'}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6">
            {!isClientView && (
              <>
                <button className="text-charcoal-400 hover:text-gold transition relative">
                  <Bell size={18} className="lg:w-5 lg:h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </>
            )}
            <button className="text-charcoal-400 hover:text-gold transition">
              <UserCircle size={22} className="lg:w-6 lg:h-6" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8 flex-1 w-full max-w-[100vw]">
          <div className="animate-in fade-in duration-500">
            {renderContent()}
          </div>
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-charcoal-200 flex justify-around items-center h-16 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-gold-700' : 'text-charcoal-400'
                  }`}
              >
                <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-gold-50' : ''}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
              </button>
            );
          })}
          {!isClientView && (
            <button
              onClick={() => setActiveTab('more')}
              className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'more' ? 'text-gold-700' : 'text-charcoal-400'}`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'more' ? 'bg-gold-50' : ''}`}>
                <Menu size={20} />
              </div>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Más</span>
            </button>
          )}
        </nav>

        <footer className="hidden lg:block p-4 text-center text-[10px] text-charcoal-400 border-t border-charcoal-200 bg-white">
          &copy; 2024 LitisManager - Desarrollado para Estudio Casadey & GAMAN Brokers.
        </footer>
      </div>
    </div>
  );
};

export default App;
