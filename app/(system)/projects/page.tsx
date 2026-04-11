import React from "react";
import styles from "./projects.module.css";

export default function Projects() {
  const projects = [
    { 
      title: "IndieWeb Platform", 
      description: "A decentralized social network built on Astro and IndieWeb principles.", 
      icon: "♡", 
      tags: ["Astro", "IndieWeb"],
      href: "/indieweb-platform"
    },
    { 
      title: "Creatrweb RAG", 
      description: "Local localized RAG scheme for personal documents.", 
      icon: "⊛", 
      tags: ["Mistral AI", "SQLite"],
      href: "/creatrweb-rag"
    },
    { 
      title: "Terminal UI", 
      description: "Retro OS-style interface for modern AI agents.", 
      icon: "⎈", 
      tags: ["CSS Modules", "React"],
      href: "/terminal-ui"
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.backLink}>
          <span style={{ fontSize: '1.2rem' }}>←</span> Home
        </a>
        <h1 className={styles.title}>Studio Journal</h1>
        <p className={styles.subtitle}>A collection of current projects and creative experiments.</p>
      </header>
      
      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <a key={index} href={project.href} className={styles.projectCard}>
            <div className={styles.symbolContainer}>{project.icon}</div>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDesc}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
