
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Cpu, Minimize2, Loader2, Bot } from 'lucide-react';
import { Language } from '../types';
import { sendMessageToGemini } from '../services/chatService';

interface Props {
  lang: Language;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const SystemChat: React.FC<Props> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inicializar chat con mensaje de bienvenida
  useEffect(() => {
    const welcomeText = lang === 'es' 
      ? "¡Hola! Soy Botardo, el asistente virtual del sistema. ¿En qué puedo ayudarte sobre Lucas?"
      : "Hello! I am Botardo, the system's virtual assistant. How can I help you regarding Lucas?";

    // Solo agregar si está vacío
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: welcomeText,
          timestamp: new Date()
        }
      ]);
    }
  }, [lang]);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Focus input on open
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    // Actualizar UI inmediatamente
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Preparar historial para la API
    const apiHistory = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // Llamar al servicio
    const response = await sendMessageToGemini(userMsg.text, lang, apiHistory);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.text || (lang === 'es' ? "Sin respuesta." : "No response."),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button - Updated to Violet and Bot Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center border border-indigo-400/30 ${
          isOpen 
            ? 'bg-sys-surface text-sys-subtext rotate-90 scale-0 opacity-0' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 scale-100 opacity-100 shadow-[0_0_15px_rgba(99,102,241,0.5)]'
        }`}
        aria-label="Open Botardo Chat"
      >
        <Bot size={28} />
      </button>

      {/* Chat Panel */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-[#0f172a] border border-sys-line rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#1e293b] p-4 border-b border-sys-line flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar Botardo */}
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/10 animate-pulse"></div>
              <Bot size={24} className="text-indigo-400 relative z-10" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono tracking-wide">
                BOTARDO <span className="text-[10px] text-sys-subtext font-normal">v1.0</span>
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-sys-subtext uppercase tracking-wider">System Online</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-sys-subtext hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f172a] custom-scrollbar">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed border ${
                  msg.role === 'user' 
                    ? 'bg-sys-accent/10 border-sys-accent/30 text-sys-text rounded-tr-none' 
                    : 'bg-sys-surface border-sys-line text-sys-subtext rounded-tl-none'
                }`}
              >
                {/* Icon for bot messages */}
                {msg.role === 'model' && (
                  <div className="flex items-center gap-2 mb-2 opacity-100 border-b border-sys-line/30 pb-1">
                    <Bot size={12} className="text-indigo-400" />
                    <span className="text-[10px] font-mono uppercase text-indigo-300">Botardo</span>
                  </div>
                )}
                
                <p className="whitespace-pre-wrap">{msg.text}</p>
                
                <span className="text-[10px] opacity-30 mt-1 block text-right font-mono">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="bg-sys-surface border border-sys-line rounded-lg rounded-tl-none p-3 flex items-center gap-2 text-sys-subtext">
                <Loader2 size={14} className="animate-spin text-indigo-400" />
                <span className="text-xs font-mono animate-pulse">Botardo is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#1e293b] border-t border-sys-line">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'es' ? "Pregúntame algo..." : "Ask me something..."}
              disabled={isLoading}
              className="w-full bg-[#0f172a] border border-sys-line text-sys-text text-sm rounded-md pl-3 pr-10 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors font-sans placeholder-sys-subtext/40"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 text-sys-subtext hover:text-indigo-400 disabled:opacity-30 disabled:hover:text-sys-subtext transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[9px] text-sys-subtext/40 font-mono">
              Powered by System AI • Botardo Core
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
