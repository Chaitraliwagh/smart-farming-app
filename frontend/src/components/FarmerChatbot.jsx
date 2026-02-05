import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Maximize2, Minimize2, X, Send, MessageCircle, Loader2 } from "lucide-react";

export default function FarmerChatbot() {
  const [open, setOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { bot: "Namaste! I am your **Kisan Assistant**. Ask me about crops, diseases, or weather." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // 🟢 CONFIG: Change this to your actual backend URL in production
  const API_URL = "http://localhost:5000/api/chat/ask"; 

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { user: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { message: userMessage });
      setMessages(prev => [...prev, { bot: res.data.reply }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { bot: "⚠️ Connection error. Please ensure the server is running." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      
      {/* 1. CHAT WINDOW */}
      {open && (
        <div 
          className={`flex flex-col bg-white border border-gray-200 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden rounded-2xl
            ${isLarge ? "w-[90vw] md:w-[600px] h-[80vh] md:h-[650px]" : "w-[350px] h-[500px]"}`}
        >
          {/* Header */}
          <div className="bg-green-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <div>
                <h3 className="font-bold text-lg leading-none">Kisan Sahayak</h3>
                <p className="text-[10px] opacity-90 uppercase tracking-wider">AI Agri-Expert</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsLarge(!isLarge)} 
                className="p-1.5 hover:bg-green-700 rounded-lg transition-colors"
                title={isLarge ? "Standard View" : "Expand"}
              >
                {isLarge ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={() => setOpen(false)} 
                className="p-1.5 hover:bg-green-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.user ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm 
                  ${m.user 
                    ? "bg-green-600 text-white rounded-tr-none" 
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                  }`}
                >
                  {m.user ? (
                    m.user
                  ) : (
                    // React Markdown for formatted AI responses
                    <div className="prose prose-sm prose-green max-w-none 
                      prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-headings:text-green-700 prose-headings:my-2">
                      <ReactMarkdown>{m.bot}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-gray-500 text-sm">
                  <Loader2 size={16} className="animate-spin text-green-600" />
                  <span>Consulting expert...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white flex gap-2 items-end">
            <input
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none"
              placeholder="Ask about crops, diseases..."
            />
            <button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-md"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* 2. TOGGLE BUTTON (Eye-catching version) */}
      {!open && (
        <div className="flex items-center gap-3">
          {/* Animated Tooltip/Label */}
          <div className="bg-white text-green-700 px-4 py-2 rounded-lg shadow-lg border border-green-100 font-bold text-sm animate-bounce hidden md:block">
            Ask AI Assistant ✨
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-[0_0_20px_rgba(22,163,74,0.5)] transition-all transform hover:scale-110 flex items-center justify-center relative group"
          >
            {/* Pulsing ring effect */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
            
            <div className="flex items-center gap-2">
              <MessageCircle size={28} />
              <span className="font-bold pr-1">AI Assistant</span>
            </div>
          </button>
        </div>
      )}

      {/* Close button when chat is open */}
       {open && (
        <button
          onClick={() => setOpen(false)}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-xl transition-all transform hover:rotate-90"
        >
          <X size={24} />
        </button>
       )}
    </div>
  );
}