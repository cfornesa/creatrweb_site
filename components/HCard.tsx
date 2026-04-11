import React from "react";
import styles from "./HCard.module.css";

interface Profile {
  label: string;
  href: string;
}

interface HCardProps {
  name: string;
  url: string;
  photo?: string;
  note?: string;
  org?: string;
  profiles?: Profile[];
}

const MacTitleBar = () => (
  <div className={styles.macTitleBar}>
    <span className={`${styles.macDot} ${styles.macRed}`}></span>
    <span className={`${styles.macDot} ${styles.macYellow}`}></span>
    <span className={`${styles.macDot} ${styles.macGreen}`}></span>
  </div>
);

const HCard: React.FC<HCardProps> = ({ name, url, photo, note, org, profiles = [] }) => {
  return (
    <div className={`h-card ${styles.gridContainer}`}>
      {/* Box 1: Identity */}
      <div className={`${styles.bentoBox} ${styles.identityBox}`}>
        <MacTitleBar />
        {photo && (
          <img
            src={photo}
            alt={name}
            width={140}
            height={140}
            loading="eager"
            decoding="async"
            className={`u-photo ${styles.photo}`}
          />
        )}
        <a href={url} className={`u-url p-name ${styles.name}`} rel="me">
          {name}
        </a>
        {org && <div className={`p-org ${styles.org}`}>{org}</div>}
      </div>

      {/* Box 2: Mission/Note (Symbol-first) */}
      <div className={`${styles.bentoBox} ${styles.missionBox}`}>
        <MacTitleBar />
        <div className={styles.symbolIcon}>✦</div>
        {note && <div className={`p-note ${styles.note}`}>{note}</div>}
      </div>

      {/* Box 3: Social Profiles */}
      <div className={`${styles.bentoBox} ${styles.socialBox}`}>
        <MacTitleBar />
        {profiles.map((profile, i) => (
          <a key={i} href={profile.href} rel="me" className={`u-url ${styles.socialLink}`}>
            <div className={styles.socialIconGraphic}>⊛</div>
            <span className={styles.socialLabel}>{profile.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HCard;
