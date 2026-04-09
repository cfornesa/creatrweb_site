import React from "react";
import Link from "next/link";
import styles from "../project-detail.module.css";

export default function IndieWebPlatform() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/projects" className={styles.backLink}>
          <span>←</span> Back to Projects
        </Link>
        <div className={styles.symbolHero}>♡</div>
        <h1 className={styles.title}>IndieWeb Platform</h1>
        <div className={styles.tags}>
          <span className={styles.tag}>Next.js</span>
          <span className={styles.tag}>IndieWeb</span>
          <span className={styles.tag}>Webmentions</span>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p>
            The IndieWeb Platform is a decentralized social networking initiative that empowers individuals to own their identity and content. Built on the principles of the independent web, it leverages modern technologies like Next.js and Microformats to create a seamless, interoperable experience.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <ul>
            <li><strong>Own Your Data:</strong> All posts, photos, and interactions are stored on your personal domain.</li>
            <li><strong>Interoperability:</strong> Uses standard protocols like Webmentions and IndieAuth to connect with the broader web.</li>
            <li><strong>Human-First Design:</strong> Prioritizes readability and accessibility for users, not algorithms.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
