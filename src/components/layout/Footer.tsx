import { SITE } from "../../data/content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.name}>{SITE.name}</span>
        <div className={styles.links}>
          <a href={`mailto:${SITE.email}`}>Email</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
        <p className={styles.meta}>{SITE.location}</p>
        <p className={styles.copy}>© {new Date().getFullYear()} {SITE.shortName}</p>
      </div>
    </footer>
  );
}
