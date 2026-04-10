"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./TerminalDialog.module.css";

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
      const data = await res.json();
      setHistory((prev) => [...prev, data.reply || "Error: No response."]);
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
          <span className={styles.terminalPrompt}>{">"}</span>
          <input
            autoFocus
            type="text"
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
