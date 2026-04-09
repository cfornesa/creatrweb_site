"use client";
import { useState } from "react";
import TerminalDialog from "./TerminalDialog";

export default function TerminalTrigger() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsTerminalOpen(true)}
        style={{ 
          backgroundColor: "var(--foreground)", 
          color: "var(--background)", 
          border: "none", 
          padding: "12px 24px", 
          borderRadius: "30px",
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "background-color 0.2s ease, transform 0.2s ease"
        }}>
        <span style={{ fontSize: "1.4rem" }}>▶_</span> Launch Terminal
      </button>
      <TerminalDialog 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
}
