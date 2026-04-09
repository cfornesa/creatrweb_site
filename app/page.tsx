import HCard from "@/components/HCard";
import Link from "next/link";
import TerminalTrigger from "@/components/TerminalTrigger";
import styles from "./page.module.css";
import Image from 'next/image';

export default function Home() {
  return (
    <main className={styles.main}>
      <HCard
        name="Creatrweb"
        url="https://creatrweb.com"
        photo='/guide.png'
        org="Creatrweb"
        profiles={[
          { label: "Instagram", href: "https://instagram.com/creatrweb" },
          { label: "X", href: "https://x.com/creatrweb" },
          { label: "TikTok", href: "https://www.tiktok.com/@creatrweb" }
        ]}
        note="Identity-First IndieWeb-inspired Creative Platform focusing on decentralization and personal ownership of content. Built with Next.js, TypeScript, and SQLite. Emphasizes user control, privacy, and a seamless creative experience."
      />
      <div className={styles.navContainer}>
        <Link href="/projects" className={styles.navLink}>
          <span className={styles.navLinkIcon}>⊞</span> Studio Journal
        </Link>
        <TerminalTrigger />
      </div>
    </main>
  );
}
