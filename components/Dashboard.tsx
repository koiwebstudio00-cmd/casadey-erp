
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AlertCircle, TrendingUp, Clock, FileCheck } from 'lucide-react';
import { MOCK_CASES, MOCK_TASKS } from '../mockData';
import { PortfolioType } from '../types';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Casos Activos', value: MOCK_CASES.length, icon: TrendingUp, color: 'text-gold' },
    { label: 'Doc. Pendiente', value: 12, icon: Clock, color: 'text-orange-500' },
    { label: 'Cerrados Mes', value: 8, icon: FileCheck, color: 'text-green-500' },
    { label: 'Alertas', value: 3, icon: AlertCircle, color: 'text-red-500' },
  ];

  const portfolioData = [
    { name: 'GAMAN', value: MOCK_CASES.filter(c => c.portfolio === PortfolioType.GAMAN).length },
    { name: 'Estudio', value: MOCK_CASES.filter(c => c.portfolio === PortfolioType.CASADEY).length },
  ];

  const COLORS = ['#D4AF37', '#333333'];

  return (
    <div className="space-y-6 max-w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <h2 className="text-2xl lg:text-3xl font-serif font-bold text-charcoal-900">Dashboard</h2>
        <div className="bg-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg shadow-sm border border-charcoal-200 text-[10px] lg:text-sm text-charcoal-500">
          Activo: Hoy, 10:45 AM
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-charcoal-100 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[10px] lg:text-sm font-medium text-charcoal-500 uppercase tracking-wider truncate">{s.label}</p>
              <h3 className="text-xl lg:text-2xl font-bold text-charcoal-900 mt-1">{s.value}</h3>
            </div>
            <div className={`p-2 lg:p-3 bg-charcoal-50 rounded-lg ${s.color} shrink-0`}>
              <s.icon size={18} className="lg:w-6 lg:h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Distribution */}
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-charcoal-100 lg:col-span-1">
          <h4 className="text-sm lg:text-lg font-bold text-charcoal-900 mb-4">Carteras</h4>
          <div className="h-48 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={portfolioData} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {portfolioData.map((d, i) => (
              <div key={i} className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                <span className="text-[10px] text-charcoal-600 uppercase font-bold">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders & Alerts */}
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-charcoal-100 lg:col-span-2">
          <h4 className="text-sm lg:text-lg font-bold text-charcoal-900 mb-4">Alertas de Gestión</h4>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start space-x-3">
              <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={16} />
              <div>
                <p className="text-xs font-bold text-red-800">Caso detenido</p>
                <p className="text-[10px] text-red-600 mt-0.5">Falta título automotor: M. Luz Soria.</p>
              </div>
            </div>
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg flex items-start space-x-3">
              <Clock className="text-amber-500 mt-0.5 shrink-0" size={16} />
              <div>
                <p className="text-xs font-bold text-amber-800">Oferta por vencer</p>
                <p className="text-[10px] text-amber-600 mt-0.5">L. Fernández: Oferta vence en 48hs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Summary Preview */}
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-charcoal-100 mb-20 lg:mb-0">
        <h4 className="text-sm lg:text-lg font-bold text-charcoal-900 mb-4">Resumen Diario</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-3 bg-charcoal-50 rounded-xl">
            <h5 className="text-[10px] font-black text-gold-700 uppercase mb-3 tracking-widest">Benjamin</h5>
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-charcoal-500">Hechas: 5</span>
                <span className="text-amber-600">Pendientes: 3</span>
              </div>
              <div className="w-full bg-charcoal-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gold h-full w-[62%]"></div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-charcoal-50 rounded-xl">
            <h5 className="text-[10px] font-black text-gold-700 uppercase mb-3 tracking-widest">Sofia</h5>
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-charcoal-500">Hechas: 2</span>
                <span className="text-amber-600">Pendientes: 6</span>
              </div>
              <div className="w-full bg-charcoal-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gold h-full w-[25%] opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
