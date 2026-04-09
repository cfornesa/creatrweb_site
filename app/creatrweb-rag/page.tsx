import React from "react";
import Link from "next/link";
import styles from "../project-detail.module.css";

export default function CreatrwebRAG() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/projects" className={styles.backLink}>
          <span>←</span> Back to Projects
        </Link>
        <div className={styles.symbolHero}>⊛</div>
        <h1 className={styles.title}>Creatrweb RAG</h1>
        <div className={styles.tags}>
          <span className={styles.tag}>Mistral AI</span>
          <span className={styles.tag}>SQLite</span>
          <span className={styles.tag}>Embeddings</span>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p>
            Creatrweb RAG is a locally hosted Retrieval-Augmented Generation system. It indexes personal documents from a specified folder and enables a terminal-based AI agent to answer questions using that context.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technology Stack</h2>
          <p>
            By leveraging Mistral's advanced embedding models and a local SQLite database, this project provides a privacy-focused way to interact with your data using artificial intelligence.
          </p>
          <ul>
            <li><strong>Vector Search:</strong> Custom cosine similarity implementation for relevant document retrieval.</li>
            <li><strong>Mistral AI:</strong> High-performance AI agents for generating contextual responses.</li>
            <li><strong>Local-First:</strong> Keeps your documents on your machine for maximum security and ownership.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
