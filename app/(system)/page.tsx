import HCard from "@/components/HCard";
import TerminalTrigger from "@/components/TerminalTrigger";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.hcardWrapper}>
      <HCard
        name="Creatrweb"
        url="https://creatrweb.com"
        photo='/guide.png'
        org="Augment Humankind"
        profiles={[
          { label: "Instagram", href: "https://instagram.com/creatrweb" },
          { label: "X", href: "https://x.com/creatrweb" },
          { label: "TikTok", href: "https://www.tiktok.com/@creatrweb" }
        ]}
        note="Identity-First IndieWeb-inspired Creative Platform focusing on decentralization and personal ownership of content. Built with Astro, React, TypeScript, and SQLite. Emphasizes user control, privacy, and a seamless creative experience."
      />

      <div className={styles.drawerContainer}>
        <article className={styles.drawerCard}>
          <div className={styles.macTitleBar}>
            <span className={`${styles.macDot} ${styles.macRed}`}></span>
            <span className={`${styles.macDot} ${styles.macYellow}`}></span>
            <span className={`${styles.macDot} ${styles.macGreen}`}></span>
          </div>
          <h2 className={styles.drawerTitle}>◈ Project Methodology</h2>
          <p className={styles.drawerText}>
            Creatrweb is designed as a modular, extensible framework for personal identity and content ownership. 
            By leveraging standard protocols like IndieAuth, Micropub, and Webmention, it creates a decentralized 
            social experience where your domain is your primary identifier.
          </p>
        </article>
      </div>

      <div className={styles.desktopArea}>
        <a href="/readme" className={styles.desktopIcon}>
          <div className={styles.iconGraphic}>📄</div>
          <span className={styles.iconLabel}>Readme</span>
        </a>
        
        <a href="/projects" className={styles.desktopIcon}>
          <div className={styles.iconGraphic}>📁</div>
          <span className={styles.iconLabel}>Studio Journal</span>
        </a>

        <a href="https://augmenthumankind.com" target="_blank" rel="noopener noreferrer" className={styles.desktopIcon}>
          <div className={styles.iconGraphic}>🌐</div>
          <span className={styles.iconLabel}>Augment Humankind</span>
        </a>

        <TerminalTrigger 
          className={`${styles.desktopIcon} ${styles.terminalIcon}`} 
          iconClassName={styles.iconGraphic} 
          labelClassName={styles.iconLabel} 
        />
      </div>
    </div>
  );
}
