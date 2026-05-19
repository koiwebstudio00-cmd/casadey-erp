
import React, { useState } from 'react';
// Added missing Bot and Send icons to the imports
import { Upload, FileText, CheckCircle2, MessageSquare, AlertCircle, ChevronRight, Download, Bot, Send } from 'lucide-react';
import { MOCK_CASES, MOCK_DOCS } from '../mockData';
import { getClientChatResponse } from '../geminiService';

const ClientPortal: React.FC = () => {
  const clientCase = MOCK_CASES[0]; // Simulation for Roberto Gómez
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleChat = async () => {
    if (!chatMessage.trim()) return;
    
    const newHistory = [...chatHistory, { role: 'user' as const, text: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage('');
    setIsTyping(true);

    try {
      const response = await getClientChatResponse(chatMessage, clientCase);
      setChatHistory([...newHistory, { role: 'bot' as const, text: response }]);
    } catch (e) {
      setChatHistory([...newHistory, { role: 'bot' as const, text: "Lo siento, tuve un problema. Por favor intenta de nuevo." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="text-center md:text-left">
        <h2 className="text-3xl font-serif font-bold text-charcoal-900 italic">Hola, {clientCase.clientName}</h2>
        <p className="text-charcoal-500 mt-1">Acá podés seguir el avance de tu reclamo contra {clientCase.insuranceCompany}.</p>
      </header>

      {/* Case Progress Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gold-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-bold text-gold-700 uppercase tracking-widest">Estado Actual</p>
            <h3 className="text-2xl font-bold text-charcoal-900 mt-1">{clientCase.status}</h3>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold ${
                step < 3 ? 'bg-gold text-white' : step === 3 ? 'bg-gold-200 text-gold-700' : 'bg-charcoal-100 text-charcoal-400'
              }`}>
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Documentation Checklist */}
          <div className="space-y-4">
            <h4 className="font-bold text-charcoal-900 flex items-center space-x-2">
              <FileText className="text-gold" size={20} />
              <span>Documentación de tu caso</span>
            </h4>
            <div className="space-y-2">
              {MOCK_DOCS.filter(d => d.caseId === clientCase.id).map(doc => (
                <div key={doc.id} className="p-3 bg-charcoal-50 rounded-lg flex items-center justify-between text-sm">
                  <span className="text-charcoal-700">{doc.name}</span>
                  <div className="flex items-center space-x-2">
                    {doc.status === 'Aprobado' ? (
                      <span className="text-green-600 flex items-center text-xs font-bold">
                        <CheckCircle2 size={14} className="mr-1" /> LISTO
                      </span>
                    ) : doc.status === 'Observado' ? (
                      <span className="text-red-500 flex items-center text-xs font-bold">
                        <AlertCircle size={14} className="mr-1" /> REVISAR
                      </span>
                    ) : (
                      <button className="text-gold-700 font-bold text-xs flex items-center hover:underline">
                        SUBIR <Upload size={14} className="ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 border-2 border-dashed border-gold-300 rounded-xl text-gold-700 text-sm font-bold hover:bg-gold-50 transition flex items-center justify-center space-x-2">
              <PlusCircleIcon className="w-4 h-4" />
              <span>Cargar otros archivos</span>
            </button>
          </div>

          {/* Offers & Closure */}
          <div className="space-y-4">
            <h4 className="font-bold text-charcoal-900 flex items-center space-x-2">
              <Download className="text-gold" size={20} />
              <span>Ofertas y Pagos</span>
            </h4>
            <div className="bg-charcoal-900 text-white p-6 rounded-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-gold-400 text-xs font-bold uppercase">Última oferta recibida</p>
                <h5 className="text-2xl font-bold mt-1">$ 1.500.000</h5>
                <p className="text-charcoal-400 text-xs mt-2 italic">Aseguradora: {clientCase.insuranceCompany}</p>
                <div className="flex space-x-2 mt-6">
                  <button className="flex-1 bg-gold text-white text-sm font-bold py-2 rounded-lg hover:bg-gold-600 transition">ACEPTAR</button>
                  <button className="flex-1 border border-charcoal-700 text-sm font-bold py-2 rounded-lg hover:bg-charcoal-800 transition">RECHAZAR</button>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <DollarSign size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Floating (or Integrated) */}
      <div className="bg-white rounded-2xl shadow-xl border border-charcoal-100 flex flex-col h-[500px]">
        <div className="p-4 bg-charcoal-900 text-white rounded-t-2xl flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
            <Bot className="text-charcoal-900" size={20} />
          </div>
          <div>
            <p className="font-bold text-sm">Asistente Virtual - Estudio Casadey</p>
            <p className="text-[10px] text-green-400">En línea ahora</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-charcoal-50/50">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-charcoal-100 max-w-[80%] text-sm">
            ¡Hola {clientCase.clientName}! Soy tu asistente. ¿Tenés alguna duda sobre tu caso con {clientCase.insuranceCompany}?
          </div>
          
          {chatHistory.map((chat, i) => (
            <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                chat.role === 'user' 
                  ? 'bg-gold text-white rounded-tr-none' 
                  : 'bg-white shadow-sm border border-charcoal-100 rounded-tl-none text-charcoal-800'
              }`}>
                {chat.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-charcoal-100 rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-charcoal-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-charcoal-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-charcoal-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-charcoal-100 flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Preguntame algo..." 
            className="flex-1 bg-charcoal-50 border border-charcoal-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleChat()}
          />
          <button 
            onClick={handleChat}
            className="p-2 bg-charcoal-900 text-gold rounded-full hover:scale-105 transition shadow-lg"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple icons for internal usage
const PlusCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DollarSign = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default ClientPortal;
