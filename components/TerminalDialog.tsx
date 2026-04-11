"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./TerminalDialog.module.css";

interface TerminalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const terminalInputId = "terminal-command-input";

function formatChatResponse(res: Response, data: unknown): string {
  if (data && typeof data === "object") {
    const payload = data as { reply?: unknown; error?: unknown };

    if (res.ok && typeof payload.reply === "string" && payload.reply.trim()) {
      return payload.reply;
    }

    if (typeof payload.error === "string" && payload.error.trim()) {
      return `Error: ${payload.error}`;
    }

    if (typeof payload.reply === "string" && payload.reply.trim()) {
      return payload.reply;
    }
  }

  return res.ok ? "Error: No response." : `Error: ${res.status} ${res.statusText}`;
}

const TerminalDialog: React.FC<TerminalDialogProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["Welcome to Creatrweb Terminal OS v1.0", "Type 'help' for commands."]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      setHistory((prev) => [...prev, formatChatResponse(res, data)]);
    } catch (err) {
      setHistory((prev) => [...prev, "Error: Failed to connect to backend."]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.terminalOverlay}>
      <div className={styles.terminalWindow}>
        <div className={styles.terminalHeader}>
          <div className={styles.macTitleBar}>
            <span className={`${styles.macDot} ${styles.macRed}`}></span>
            <span className={`${styles.macDot} ${styles.macYellow}`}></span>
            <span className={`${styles.macDot} ${styles.macGreen}`}></span>
          </div>
          <span className={styles.headerTitle}>Creatrweb OS Terminal</span>
          <button onClick={onClose} className={styles.terminalClose}>×</button>
        </div>
        <div className={styles.terminalBody} ref={scrollRef}>
          {history.map((line, i) => (
            <div key={i} className={styles.terminalLine}>{line}</div>
          ))}
          {isTyping && <div className={styles.terminalLine}>_ AI is thinking...</div>}
        </div>
        <form onSubmit={handleSubmit} className={styles.terminalFooter}>
          <label htmlFor={terminalInputId} className={styles.visuallyHidden}>
            Terminal command input
          </label>
          <span className={styles.terminalPrompt}>{">"}</span>
          <input
            autoFocus
            type="text"
            id={terminalInputId}
            name="terminal-command"
            autoComplete="off"
            className={styles.terminalInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalDialog;
