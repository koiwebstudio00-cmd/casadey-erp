
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MOCK_CASES } from '../mockData';
import { PortfolioType } from '../types';

const AccountingModule: React.FC = () => {
  const data = [
    { month: 'Ene', gaman: 4500000, estudio: 2100000 },
    { month: 'Feb', gaman: 3800000, estudio: 4200000 },
    { month: 'Mar', gaman: 5200000, estudio: 3100000 },
  ];

  const totalFacturado = MOCK_CASES.reduce((acc, curr) => acc + (curr.agreedAmount || 0), 0);
  const totalComisiones = MOCK_CASES.reduce((acc, curr) => acc + (curr.commission || 0), 0);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <h2 className="text-2xl lg:text-3xl font-serif font-bold text-charcoal-900">Contaduría</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-charcoal-900 text-white p-5 rounded-2xl shadow-xl border border-gold-600/30 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-gold-400 text-[10px] font-black uppercase tracking-widest opacity-80">Honorarios Netos</p>
              <h3 className="text-2xl lg:text-3xl font-bold mt-1">$ {totalComisiones.toLocaleString()}</h3>
              <div className="mt-2 flex items-center text-green-400 text-[10px] font-bold">
                <ArrowUpRight size={14} className="mr-1" />
                <span>+15% mensual</span>
              </div>
            </div>
            <div className="bg-gold-500/20 p-2 rounded-xl border border-gold-500/20">
              <DollarSign className="text-gold" size={24} />
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5 -mb-6 -mr-6">
            <DollarSign size={100} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-charcoal-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-charcoal-400 text-[10px] font-black uppercase tracking-widest">Cartera GAMAN</p>
              <h3 className="text-xl lg:text-2xl font-bold text-charcoal-900 mt-1">$ 7,2M</h3>
            </div>
            <div className="bg-charcoal-50 p-2 rounded-xl">
              <Wallet className="text-charcoal-900" size={20} />
            </div>
          </div>
          <p className="text-[10px] text-charcoal-300 font-bold uppercase mt-4 italic">Acuerdos Q1 - Broker</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-charcoal-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-charcoal-400 text-[10px] font-black uppercase tracking-widest">Estudio Propio</p>
              <h3 className="text-xl lg:text-2xl font-bold text-charcoal-900 mt-1">$ 9,4M</h3>
            </div>
            <div className="bg-charcoal-50 p-2 rounded-xl">
              <Wallet className="text-gold-600" size={20} />
            </div>
          </div>
          <p className="text-[10px] text-charcoal-300 font-bold uppercase mt-4 italic">Crecimiento Orgánico</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-charcoal-100">
          <h4 className="text-xs lg:text-sm font-black text-charcoal-400 uppercase tracking-widest mb-6">Comparativa Mensual</h4>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="gaman" name="GAMAN" fill="#333333" radius={[4, 4, 0, 0]} />
                <Bar dataKey="estudio" name="Estudio" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-charcoal-100">
          <h4 className="text-xs lg:text-sm font-black text-charcoal-400 uppercase tracking-widest mb-6">Progresión</h4>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none'}} />
                <Line type="monotone" dataKey="gaman" stroke="#333333" strokeWidth={3} dot={{r: 4, fill: '#333333', strokeWidth: 2, stroke: '#fff'}} />
                <Line type="monotone" dataKey="estudio" stroke="#D4AF37" strokeWidth={3} dot={{r: 4, fill: '#D4AF37', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingModule;
