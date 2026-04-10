import React from "react";
import Link from "next/link";
import styles from "../project-detail.module.css";

export default function TerminalUI() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/projects" className={styles.backLink}>
          <span>←</span> Back to Projects
        </Link>
        <div className={styles.symbolHero}>⎈</div>
        <h1 className={styles.title}>Terminal UI</h1>
        <div className={styles.tags}>
          <span className={styles.tag}>CSS Modules</span>
          <span className={styles.tag}>React</span>
          <span className={styles.tag}>UI/UX</span>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p>
            The Terminal UI is a retro-inspired command-line interface designed for modern web applications. It provides a unique and immersive way for users to interact with AI agents and system commands.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Design Philosophy</h2>
          <p>
            Combining the aesthetics of classic operating systems with the power of modern React components, the Terminal UI offers both nostalgia and functionality.
          </p>
          <ul>
            <li><strong>Responsive Layout:</strong> Fully functional on desktop, tablet, and mobile devices.</li>
            <li><strong>Customizable:</strong> Easily themed using CSS variables to match any brand identity.</li>
            <li><strong>Interactive:</strong> Supports keyboard shortcuts, command history, and real-time AI feedback.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
