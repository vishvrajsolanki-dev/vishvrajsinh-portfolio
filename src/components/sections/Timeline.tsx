import { useRef } from "react";
import { TIMELINE } from "../../data/content";
import { useMediaQuery } from "../../hooks/useMedia";
import styles from "./Timeline.module.css";

export function Timeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section id="timeline" className={styles.section} aria-labelledby="timeline-heading">
      <div className="container">
        <p className={styles.label}>Memory Library</p>
        <h2 id="timeline-heading">Timeline</h2>
        <p className={styles.lede}>Drag or scroll to explore milestones. Professional photos can replace frames when supplied.</p>
      </div>

      {isMobile ? (
        <div className={`container ${styles.vertical}`}>
          {TIMELINE.map((item) => (
            <article key={`${item.year}-${item.title}`} className={styles.card}>
              <div className={styles.photo} aria-hidden />
              <p className={styles.year}>{item.year}</p>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      ) : (
        <div
          className={styles.rail}
          ref={railRef}
          tabIndex={0}
          aria-label="Timeline photo rail"
          onKeyDown={(e) => {
            const el = railRef.current;
            if (!el) return;
            if (e.key === "ArrowRight") el.scrollBy({ left: 360, behavior: "smooth" });
            if (e.key === "ArrowLeft") el.scrollBy({ left: -360, behavior: "smooth" });
          }}
        >
          {TIMELINE.map((item) => (
            <article key={`${item.year}-${item.title}`} className={styles.card}>
              <div className={styles.photo} aria-hidden />
              <p className={styles.year}>{item.year}</p>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
