import { ABOUT_COPY, ASSETS, SITE } from "../../data/content";
import styles from "./About.module.css";

export function About() {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-heading"
      data-spotlight
    >
      <div className={`container ${styles.grid}`} data-reveal-stagger>
        <div className={styles.portraitWrap} data-reveal-child>
          <div className={styles.portrait}>
            <img
              src={ASSETS.headshot}
              alt={`${SITE.name} professional headshot`}
              width={800}
              height={1000}
              loading="lazy"
            />
          </div>
        </div>
        <div data-reveal-child>
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
