
import React from 'react';
import { Target, Zap, ShieldCheck, BarChart3, Users, Bot, Smartphone } from 'lucide-react';

const PresentationModule: React.FC = () => {
  const pillars = [
    {
      title: "Control Operativo Total",
      desc: "Seguimiento en tiempo real de cada etapa del siniestro, desde la recepción del DNI hasta el cobro final.",
      icon: ShieldCheck
    },
    {
      title: "IA de Gestión Interna",
      desc: "Un asistente inteligente que interpreta órdenes en lenguaje natural y delega tareas a los empleados automáticamente.",
      icon: Bot
    },
    {
      title: "Portal del Cliente 24/7",
      desc: "Reducción del 70% en llamadas de consulta. El cliente sube archivos y ve sus ofertas desde su celular.",
      icon: Smartphone
    },
    {
      title: "Métricas y Contaduría",
      desc: "Visión clara de la rentabilidad. Comparativa de carteras (GAMAN vs Estudio) y proyección de honorarios.",
      icon: BarChart3
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 italic">
          Litis<span className="text-gold">Manager</span>
        </h1>
        <p className="text-charcoal-500 font-medium text-lg uppercase tracking-[0.2em]">Propuesta de Transformación Digital</p>
        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
      </div>

      <div className="bg-charcoal-900 text-white p-8 rounded-3xl shadow-2xl border border-gold-600/30 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-gold flex items-center">
            <Target className="mr-3" /> Objetivo General
          </h2>
          <p className="text-lg text-charcoal-300 leading-relaxed">
            Escalar la capacidad operativa del estudio mediante la <span className="text-white font-bold">automatización de procesos repetitivos</span>, 
            asegurando que ningún plazo se venza y que cada centavo de comisión esté trackeado.
          </p>
        </div>
        <Zap className="absolute right-0 bottom-0 text-gold opacity-10 -mr-10 -mb-10" size={250} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-charcoal-100 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 bg-charcoal-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-50 transition">
              <p.icon className="text-gold" size={24} />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900 mb-2">{p.title}</h3>
            <p className="text-sm text-charcoal-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gold-50 border border-gold-200 p-8 rounded-3xl text-center space-y-4">
        <h4 className="text-gold-900 font-bold uppercase tracking-widest text-xs">Conclusión para el Cliente</h4>
        <p className="text-xl font-serif font-bold text-charcoal-900">
          "No es una aplicación más, es la infraestructura sobre la cual su estudio podrá procesar el triple de casos con el mismo equipo."
        </p>
      </div>
    </div>
  );
};

export default PresentationModule;
