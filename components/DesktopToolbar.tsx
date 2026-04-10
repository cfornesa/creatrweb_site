"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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

export default function DesktopToolbar() {
  const pathname = usePathname();
  const [time, setTime] = useState("");
  const title = getTitleFromPath(pathname);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getUTCHours().toString().padStart(2, '0');
      const minutes = now.getUTCMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes} UTC`);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.desktopToolbar}>
      <div className={styles.desktopToolbarTitle}>{title}</div>
      <div className={styles.desktopToolbarTime}>{time}</div>
    </div>
  );
}
