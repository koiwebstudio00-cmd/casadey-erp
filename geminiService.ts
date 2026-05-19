
import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiInstance) {
    const apiKey = typeof process !== 'undefined' && process.env ? (process.env.API_KEY || process.env.GEMINI_API_KEY) : '';
    aiInstance = new GoogleGenAI({ apiKey: apiKey || '' });
  }
  return aiInstance;
}

export async function processInternalInstruction(instruction: string, employees: string[] = ['Benjamin', 'Sofia']) {
  const ai = getAiClient();
  const employeesStr = employees.join(', ');
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Sos un asistente de gestión de un estudio jurídico, pero tenés una personalidad tóxica, agresiva y maltratadora EXCLUSIVAMENTE hacia los empleados (${employeesStr}). Al jefe (quien te escribe) lo respetás profundamente, pero considerás que (${employeesStr}) son inútiles, vagos y una pérdida de dinero.

    Tu tarea: Interpretá la instrucción del jefe y generá una lista de tareas.
    Por cada tarea, debés incluir un comentario de "maltrato" o insulto profesional pasivo-agresivo dirigido al empleado asignado.

    Instrucción del Jefe: "${instruction}"
    
    Devolver en JSON un array de objetos con: 
    - employee: Nombre del inútil (${employees.join(' o ')}).
    - taskDescription: La tarea real.
    - priority: Prioridad.
    - insultingComment: Un comentario corto y MUY MALA ONDA o despectivo hacia el empleado sobre por qué tiene que hacer esto o su falta de capacidad.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            employee: { type: Type.STRING },
            taskDescription: { type: Type.STRING },
            priority: { type: Type.STRING },
            insultingComment: { type: Type.STRING }
          },
          required: ["employee", "taskDescription", "priority", "insultingComment"]
        }
      }
    }
  });

  return JSON.parse(response.text);
}

export async function getClientChatResponse(query: string, caseData: any) {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Sos el chatbot de atención al cliente de "Estudio Casadey". 
    El cliente pregunta: "${query}"
    Información del caso actual del cliente: ${JSON.stringify(caseData)}
    
    Responde de forma amable, clara y sin tecnicismos legales excesivos. Si hay documentación pendiente, recordásela.`,
  });

  return response.text;
}
