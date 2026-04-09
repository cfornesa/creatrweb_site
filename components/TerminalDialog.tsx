"use client";
import React, { useState, useRef, useEffect } from "react";

interface TerminalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TerminalDialog: React.FC<TerminalDialogProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["Welcome to Creatrweb Terminal OS v1.0", "Type 'help' for commands."]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setHistory((prev) => [...prev, `> ${userMessage}`]);
    setInput("");

    if (userMessage.toLowerCase() === "help") {
      setHistory((prev) => [...prev, "Commands: help, clear, exit, whoami"]);
      return;
    }
    if (userMessage.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }
    if (userMessage.toLowerCase() === "exit") {
      onClose();
      return;
    }

    setIsTyping(true);
    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setHistory((prev) => [...prev, data.reply || "Error: No response."]);
    } catch (err) {
      setHistory((prev) => [...prev, "Error: Failed to connect to backend."]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="terminal-overlay">
      <div className="terminal-window">
        <div className="terminal-header">
          <span>Creatrweb OS Terminal</span>
          <button onClick={onClose} className="terminal-close">×</button>
        </div>
        <div className="terminal-body" ref={scrollRef}>
          {history.map((line, i) => (
            <div key={i} className="terminal-line">{line}</div>
          ))}
          {isTyping && <div className="terminal-line">_ AI is thinking...</div>}
        </div>
        <form onSubmit={handleSubmit} className="terminal-footer">
          <span className="terminal-prompt">{">"}</span>
          <input
            autoFocus
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>

      <style jsx>{`
        .terminal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .terminal-window {
          width: 100%;
          max-width: 600px;
          height: 80%;
          max-height: 500px;
          background: #000;
          color: #0f0;
          font-family: monospace;
          border: 1px solid #0f0;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
          overflow: hidden;
        }
        .terminal-header {
          background: #333;
          color: #fff;
          padding: 10px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .terminal-close {
          background: transparent;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          padding: 5px 10px;
          line-height: 1;
        }
        .terminal-body {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          line-height: 1.5;
        }
        .terminal-line {
          margin-bottom: 8px;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .terminal-footer {
          display: flex;
          padding: 15px;
          border-top: 1px solid #333;
          background: #000;
        }
        .terminal-prompt {
          margin-right: 10px;
          color: #0f0;
        }
        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #0f0;
          font-family: monospace;
          outline: none;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .terminal-overlay {
            padding: 0;
          }
          .terminal-window {
            height: 100%;
            max-height: 100vh;
            border: none;
            border-radius: 0;
          }
          .terminal-header {
            padding: 15px;
          }
          .terminal-footer {
            padding-bottom: env(safe-area-inset-bottom, 15px);
          }
        }
      `}</style>
    </div>
  );
};

export default TerminalDialog;
