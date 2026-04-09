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

const HCard: React.FC<HCardProps> = ({ name, url, photo, note, org, profiles = [] }) => {
  return (
    <div className={`h-card ${styles.gridContainer}`}>
      {/* Box 1: Identity */}
      <div className={`${styles.bentoBox} ${styles.identityBox}`}>
        {photo && (
          <img src={photo} alt={name} className={`u-photo ${styles.photo}`} />
        )}
        <a href={url} className={`u-url p-name ${styles.name}`} rel="me">
          {name}
        </a>
        {org && <div className={`p-org ${styles.org}`}>{org}</div>}
      </div>

      {/* Box 2: Mission/Note (Symbol-first) */}
      <div className={`${styles.bentoBox} ${styles.missionBox}`}>
        <div className={styles.symbolIcon}>✦</div>
        {note && <div className={`p-note ${styles.note}`}>{note}</div>}
      </div>

      {/* Box 3: Social Profiles */}
      <div className={`${styles.bentoBox} ${styles.socialBox}`}>
        {profiles.map((profile, i) => (
          <a key={i} href={profile.href} rel="me" className={`u-url ${styles.socialLink}`}>
            <span style={{ fontSize: '1.2rem', color: 'var(--accent-orange)' }}>⊛</span> {profile.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default HCard;
