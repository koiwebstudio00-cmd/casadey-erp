
import React, { useState, useMemo } from 'react';
import { Bot, Send, User, Calendar, CheckCircle2, Clock, Loader2, Plus, ChevronDown, ChevronRight, Circle, CheckCircle, Users, AlertTriangle, Skull } from 'lucide-react';
import { MOCK_TASKS } from '../mockData';
import { processInternalInstruction } from '../geminiService';
import { Task } from '../types';

interface BotLogEntry {
  employee: string;
  taskDescription: string;
  priority: string;
  insultingComment: string;
}

const TasksAndBot: React.FC = () => {
  const [instruction, setInstruction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [botLog, setBotLog] = useState<BotLogEntry[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<'Todos' | 'Benjamin' | 'Sofia'>('Todos');
  
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const filteredTasks = useMemo(() => {
    if (selectedEmployee === 'Todos') return tasks;
    return tasks.filter(t => t.employeeName.toLowerCase() === selectedEmployee.toLowerCase());
  }, [tasks, selectedEmployee]);

  const pendingTasks = useMemo(() => filteredTasks.filter(t => t.status !== 'Completada'), [filteredTasks]);
  const completedTasks = useMemo(() => filteredTasks.filter(t => t.status === 'Completada'), [filteredTasks]);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: t.status === 'Completada' ? 'Pendiente' : 'Completada' };
      }
      return t;
    }));
  };

  const handleBotCommand = async () => {
    if (!instruction.trim()) return;
    
    setIsProcessing(true);
    try {
      const result = await processInternalInstruction(instruction);
      setBotLog(result);
      const newTasks: Task[] = result.map((r: any, idx: number) => ({
        id: `bot-${Date.now()}-${idx}`,
        employeeName: r.employee,
        description: r.taskDescription,
        status: 'Pendiente',
        dueDate: '¡AHORA!'
      }));
      setTasks(prev => [...newTasks, ...prev]);
      setInstruction('');
    } catch (error) {
      console.error(error);
      alert("Error al procesar la instrucción del bot.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Task List (Google Tasks Style) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-charcoal-900">Lista de Esclavitud</h2>
            <div className="flex bg-charcoal-100 p-1 rounded-xl">
              {(['Todos', 'Benjamin', 'Sofia'] as const).map((emp) => (
                <button
                  key={emp}
                  onClick={() => setSelectedEmployee(emp)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedEmployee === emp 
                      ? 'bg-charcoal-900 text-gold shadow-sm' 
                      : 'text-charcoal-500 hover:text-charcoal-700'
                  }`}
                >
                  {emp}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-1 rounded-full border border-red-200 uppercase tracking-tighter shrink-0 flex items-center">
              <AlertTriangle size={10} className="mr-1" /> {pendingTasks.length} Sin terminar (vagos)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-charcoal-100 min-h-[500px] flex flex-col">
          {/* Minimalist Add Task */}
          <div className="p-4 border-b border-charcoal-50 group flex items-center space-x-3 text-gold-600 cursor-text hover:bg-charcoal-50/50 transition">
            <Plus size={20} className="group-hover:scale-110 transition" />
            <input 
              type="text" 
              placeholder={`Nueva carga para ${selectedEmployee !== 'Todos' ? selectedEmployee : 'los inútiles'}...`}
              className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-gold-400 text-charcoal-700"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Pending Tasks */}
            <div className="divide-y divide-charcoal-50">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-start p-4 hover:bg-charcoal-50 transition cursor-pointer group"
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    <button className="mt-0.5 text-charcoal-300 group-hover:text-gold transition">
                      <Circle size={20} />
                    </button>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-charcoal-900 group-hover:text-gold-900 transition">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-3 mt-1 text-[10px] uppercase tracking-wider font-semibold">
                        <div className="flex items-center text-charcoal-400">
                          <User size={12} className="mr-1" />
                          <span>{task.employeeName}</span>
                        </div>
                        <div className="flex items-center text-red-600">
                          <Clock size={12} className="mr-1" />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 opacity-30">
                  <CheckCircle size={48} className="text-green-500" />
                  <p className="mt-4 font-bold text-charcoal-900">Milagro: No hay tareas</p>
                </div>
              )}
            </div>

            {/* Completed Tasks Header */}
            {completedTasks.length > 0 && (
              <div className="mt-4 border-t border-charcoal-100">
                <button 
                  onClick={() => setShowCompleted(!showCompleted)}
                  className="w-full flex items-center justify-between p-4 hover:bg-charcoal-50 transition text-sm font-bold text-charcoal-500"
                >
                  <div className="flex items-center">
                    {showCompleted ? <ChevronDown size={18} className="mr-2" /> : <ChevronRight size={18} className="mr-2" />}
                    <span>Por fin trabajaron ({completedTasks.length})</span>
                  </div>
                </button>
                
                {showCompleted && (
                  <div className="divide-y divide-charcoal-50 bg-charcoal-50/30">
                    {completedTasks.map((task) => (
                      <div 
                        key={task.id} 
                        className="flex items-start p-4 cursor-pointer group opacity-60 hover:opacity-100 transition"
                        onClick={() => toggleTaskStatus(task.id)}
                      >
                        <button className="mt-0.5 text-green-600">
                          <CheckCircle size={20} />
                        </button>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-charcoal-500 line-through">
                              {task.description}
                            </p>
                            <span className="text-[9px] text-charcoal-400 uppercase font-bold">{task.employeeName}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Internal Bot AI */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-charcoal-900 rounded-lg">
            <Skull className="text-red-500" size={24} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-charcoal-900 text-red-700">Látigo Virtual IA</h2>
        </div>

        <div className="bg-charcoal-900 rounded-3xl shadow-2xl p-6 space-y-4 border border-red-900/40">
          <p className="text-sm text-charcoal-300">
            Deme sus órdenes, Jefe. Yo me encargo de humillar a <span className="text-gold font-bold">Benjamin</span> y <span className="text-gold font-bold">Sofia</span> para que trabajen.
          </p>
          
          <div className="relative">
            <textarea
              className="w-full h-40 p-4 bg-charcoal-800 border border-charcoal-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white placeholder:text-charcoal-500 resize-none text-sm"
              placeholder="Ej: 'Decile a Benjamin que deje de dormir y liquide el caso Gómez'"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
            <button 
              onClick={handleBotCommand}
              disabled={isProcessing}
              className="absolute bottom-3 right-3 p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg disabled:opacity-50 flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span className="text-xs font-bold uppercase">Humillando...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span className="text-xs font-bold uppercase">Enviar Orden</span>
                </>
              )}
            </button>
          </div>

          {botLog.length > 0 && (
            <div className="mt-6 animate-in slide-in-from-bottom-2 duration-300">
              <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-3 italic">Transmisión de Odio</h4>
              <div className="space-y-3">
                {botLog.map((log, i) => (
                  <div key={i} className="text-[11px] p-4 bg-red-900/20 rounded-xl border border-red-500/30 flex flex-col text-charcoal-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-red-300 uppercase tracking-tighter">PARA EL INÚTIL DE {log.employee}:</span>
                      <span className="text-[9px] bg-red-500 text-white px-1.5 rounded font-black">{log.priority}</span>
                    </div>
                    <p className="text-white font-medium italic border-l-2 border-red-500 pl-2 mb-2">"{log.taskDescription}"</p>
                    <div className="bg-charcoal-800/80 p-2 rounded text-red-200 text-[10px]">
                       <span className="font-bold">Comentario de la IA:</span> {log.insultingComment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Workload Card */}
        <div className="bg-white p-6 rounded-3xl border border-charcoal-100 shadow-sm space-y-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-50 rounded-2xl text-red-600">
              <Users size={24} />
            </div>
            <div>
              <h5 className="font-bold text-charcoal-900">Eficiencia de los Vagos</h5>
              <p className="text-xs text-charcoal-500 mt-1">Benjamin está al límite de su (escasa) capacidad.</p>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-charcoal-400">
              <span>Benjamin (Casi colapsando)</span>
              <span>85%</span>
            </div>
            <div className="w-full bg-charcoal-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full w-[85%]"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-charcoal-400 pt-1">
              <span>Sofia (Haciendo lo mínimo)</span>
              <span>30%</span>
            </div>
            <div className="w-full bg-charcoal-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[30%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksAndBot;
