"use client";
import { useState } from "react";
import TerminalDialog from "./TerminalDialog";
import styles from "@/app/(system)/page.module.css";

const getTitleFromPath = (pathname: string) => {
  if (pathname === "/") return "Home";
  if (pathname === "/readme") return "Readme";
  if (pathname === "/projects") return "Studio Journal";
  if (pathname === "/indieweb-platform") return "IndieWeb Platform";
  if (pathname === "/creatrweb-rag") return "Creatrweb RAG";
  if (pathname === "/terminal-ui") return "Terminal UI";
  return "Creatrweb";
};

const getBackUrlFromPath = (pathname: string) => {
  if (pathname === "/projects" || pathname === "/readme") return "/";
  if (["/indieweb-platform", "/creatrweb-rag", "/terminal-ui"].includes(pathname)) return "/projects";
  return "https://augmenthumankind.com";
};

interface MobileNavPillProps {
  pathname: string;
}

export default function MobileNavPill({ pathname }: MobileNavPillProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const title = getTitleFromPath(pathname);
  const backUrl = getBackUrlFromPath(pathname);
  const isExternal = backUrl.startsWith("http");

  return (
    <>
      <div className={styles.mobileNavPill}>
        {isExternal ? (
          <a 
            href={backUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.pillLink}
            title="Back"
          >
            ←
          </a>
        ) : (
          <a href={backUrl} className={styles.pillLink} title="Back">
            ←
          </a>
        )}
        <div className={styles.pillTitle}>{title}</div>
        <button 
          onClick={() => setIsTerminalOpen(true)}
          className={styles.pillButton}
          title="Chat"
        >
          💬
        </button>
      </div>
      <TerminalDialog 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
}
