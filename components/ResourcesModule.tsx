
import React, { useState } from 'react';
import { Key, Search, Copy, Eye, EyeOff, ShieldCheck, ExternalLink, Lock } from 'lucide-react';
import { MOCK_CREDENTIALS } from '../mockData';

const ResourcesModule: React.FC = () => {
  const [showPass, setShowPass] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState('');

  const togglePass = (id: string) => {
    setShowPass(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const filteredCredentials = MOCK_CREDENTIALS.filter(c => 
    c.service.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-charcoal-900 text-red-700">Recursos: Credenciales</h2>
          <p className="text-charcoal-500 text-sm">Accesos compartidos y claves de portales externos.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar credencial..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-charcoal-100 overflow-hidden">
        <div className="p-4 bg-charcoal-50 border-b border-charcoal-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-charcoal-900 flex items-center">
            <Lock size={18} className="mr-2 text-gold" /> Accesos a Portales y Aseguradoras
          </h3>
          <span className="text-[10px] font-black text-gold-600 bg-gold-100 px-2 py-0.5 rounded tracking-widest uppercase">Encriptado AES-256</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredCredentials.map((cred) => (
            <div key={cred.id} className="bg-charcoal-50 p-5 rounded-2xl border border-charcoal-100 hover:border-gold transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-black text-gold-700 bg-gold-50 px-2 py-0.5 rounded border border-gold-200 uppercase tracking-tighter">
                  {cred.category}
                </span>
                <button className="text-charcoal-300 hover:text-gold transition">
                  <ExternalLink size={14} />
                </button>
              </div>
              <h4 className="text-sm font-bold text-charcoal-900 mb-4 line-clamp-1">{cred.service}</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-charcoal-200">
                  <div className="truncate flex-1">
                    <p className="text-[8px] text-charcoal-400 uppercase font-black tracking-widest">Usuario</p>
                    <p className="font-medium text-charcoal-800 truncate">{cred.user}</p>
                  </div>
                  <button onClick={() => copyToClipboard(cred.user)} className="p-1 hover:text-gold text-charcoal-400 transition ml-2">
                    <Copy size={12} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs bg-charcoal-900 p-2.5 rounded-xl border border-charcoal-800">
                  <div className="truncate flex-1">
                    <p className="text-[8px] text-charcoal-500 uppercase font-black tracking-widest">Clave</p>
                    <p className="font-mono font-bold text-gold truncate">
                      {showPass[cred.id] ? cred.pass : '••••••••••••'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <button onClick={() => togglePass(cred.id)} className="p-1 text-charcoal-400 hover:text-gold transition">
                      {showPass[cred.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                    <button onClick={() => copyToClipboard(cred.pass)} className="p-1 text-charcoal-400 hover:text-gold transition">
                      <Copy size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gold-50 border border-gold-200 rounded-2xl p-4 flex items-center space-x-4">
        <div className="bg-gold text-white p-2 rounded-full">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h5 className="text-xs font-bold text-gold-900 uppercase">Aviso de Seguridad Crítico</h5>
          <p className="text-[11px] text-gold-700">El acceso a las credenciales está logueado. El sistema registra quién visualiza cada clave. No comparta estos datos fuera de la red del estudio.</p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesModule;
