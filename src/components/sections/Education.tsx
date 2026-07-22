import { EDUCATION } from "../../data/content";
import styles from "./Education.module.css";

export function Education() {
  return (
    <section id="education" className={styles.section} aria-labelledby="education-heading">
      <div className={`container ${styles.inner}`} data-reveal>
        <p className={styles.label}>Education</p>
        <h2 id="education-heading">{EDUCATION.degree}</h2>
        <p className={styles.school}>{EDUCATION.school}</p>
        <p className={styles.meta}>{EDUCATION.university}</p>
        <p className={styles.meta}>
          {EDUCATION.years} · {EDUCATION.gpa}
        </p>
        <p className={styles.aim}>{EDUCATION.aim}</p>
      </div>
    </section>
  );
}
