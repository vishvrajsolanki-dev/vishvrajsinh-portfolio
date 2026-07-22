import { ABOUT_COPY, SITE } from "../../data/content";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.portraitWrap}>
          <div className={styles.portrait} role="img" aria-label={`${SITE.name} professional headshot placeholder`}>
            <span>VS</span>
          </div>
          <p className={styles.note}>Replace with provided professional headshot asset.</p>
        </div>
        <div>
          <p className={styles.label}>About</p>
          <h2 id="about-heading">{SITE.name}</h2>
          <div className={styles.copy}>
            {ABOUT_COPY.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <p className={styles.alliance}>
            Team Lead, Artificial Alliance · core team of 4–5 builders on TrackBot.
          </p>
          <p className={styles.location}>{SITE.location}</p>
        </div>
      </div>
    </section>
  );
}
