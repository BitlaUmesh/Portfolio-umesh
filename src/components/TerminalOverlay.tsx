"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ command: string; response: string }[]>([
    { command: "system_status", response: "All systems nominal. Welcome, guest." },
    { command: "help", response: "Available commands: about, projects, contact, clear, exit" }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on backtick (`/~) or Ctrl+K
      if (e.key === "`" || (e.ctrlKey && e.key === "k")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = "";

    switch (cmd) {
      case "help":
        response = "Available commands: about, projects, contact, clear, status, exit";
        break;
      case "about":
        response = "Bitla Umesh Kumar. Digital Architect & Systems Engineer.";
        break;
      case "projects":
        response = "Navigating to projects matrix...";
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
        break;
      case "contact":
        response = "Opening comms channel...";
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
        break;
      case "status":
        response = "Neural sync: active. Core temp: 35C. Threat level: Midnight.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        response = "Terminating session...";
        setTimeout(() => setIsOpen(false), 500);
        break;
      case "":
        return;
      default:
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, response }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 left-8 z-[9999] w-[400px] max-w-[calc(100vw-4rem)] bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" onClick={() => setIsOpen(false)} />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              Root Terminal
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 h-64 overflow-y-auto font-mono text-xs text-white/80 space-y-2 flex flex-col justify-end">
            <div className="space-y-3">
              {history.map((entry, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex gap-2">
                    <span className="text-green-400">guest@umesh:~$</span>
                    <span>{entry.command}</span>
                  </div>
                  <div className="text-white/50 pl-4">{entry.response}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommand} className="flex gap-2 mt-4 pt-2">
              <span className="text-green-400">guest@umesh:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white/80"
                autoFocus
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
