import DesktopToolbar from "@/components/DesktopToolbar";
import MobileClock from "@/components/MobileClock";
import MobileNavPill from "@/components/MobileNavPill";
import styles from "./system-layout.module.css";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <MobileClock />
      <div className={styles.monitorFrame}>
        <div className={styles.monitorScreen}>
          <DesktopToolbar />
          <div className={styles.monitorContent}>
            {children}
          </div>
        </div>
        <div className={styles.monitorStand}></div>
        <div className={styles.monitorBase}></div>
      </div>
      <MobileNavPill />
    </main>
  );
}
