"use client";
import { useState } from "react";
import TerminalDialog from "./TerminalDialog";

interface TerminalTriggerProps {
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}

export default function TerminalTrigger({ className, iconClassName, labelClassName }: TerminalTriggerProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className={className}
        style={!className ? { 
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
          gap: "8px"
        } : undefined}
      >
        {className ? (
          <>
            <div className={iconClassName}>💻</div>
            <span className={labelClassName}>Terminal</span>
          </>
        ) : (
          <><span style={{ fontSize: "1.4rem" }}>▶_</span> Launch Terminal</>
        )}
      </button>
      <TerminalDialog 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
}
