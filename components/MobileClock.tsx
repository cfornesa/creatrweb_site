"use client";
import { useState, useEffect } from "react";
import styles from "@/app/(system)/page.module.css";

export default function MobileClock() {
  const [time, setTime] = useState("");

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

  if (!time) return null;

  return (
    <div className={styles.floatingMobileClock}>
      {time}
    </div>
  );
}
