import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { TIMELINE } from "../../data/content";
import { useMediaQuery } from "../../hooks/useMedia";
import styles from "./Timeline.module.css";

function TimelineCard({
  item,
}: {
  item: (typeof TIMELINE)[number];
}) {
  return (
    <article className={styles.card} data-reveal-child>
      <div className={styles.photo}>
        <img src={item.image} alt="" loading="lazy" width={800} height={1000} />
      </div>
      <p className={styles.year}>{item.year}</p>
      <h3>{item.title}</h3>
      <p>{item.caption}</p>
    </article>
  );
}

export function Timeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ active: boolean; startX: number; scrollLeft: number }>({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });
  const [grabbing, setGrabbing] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const el = railRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    setGrabbing(true);
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const el = railRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.scrollLeft - dx;
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const el = railRef.current;
    drag.current.active = false;
    setGrabbing(false);
    el?.releasePointerCapture(e.pointerId);
  }

  return (
    <section id="timeline" className={styles.section} aria-labelledby="timeline-heading">
      <div className="container" data-reveal>
        <p className={styles.label}>Memory Library</p>
        <h2 id="timeline-heading">Timeline</h2>
        <p className={styles.lede}>
          Drag or scroll to explore milestones. Photo placeholders for now — real memories next.
        </p>
      </div>

      {isMobile ? (
        <div className={`container ${styles.vertical}`} data-reveal-stagger>
          {TIMELINE.map((item) => (
            <TimelineCard key={`${item.year}-${item.title}`} item={item} />
          ))}
        </div>
      ) : (
        <div
          className={`${styles.rail} ${grabbing ? styles.grabbing : ""}`}
          ref={railRef}
          tabIndex={0}
          aria-label="Timeline photo rail"
          data-reveal-stagger
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={(e) => {
            const el = railRef.current;
            if (!el) return;
            if (e.key === "ArrowRight") el.scrollBy({ left: 360, behavior: "smooth" });
            if (e.key === "ArrowLeft") el.scrollBy({ left: -360, behavior: "smooth" });
          }}
        >
          {TIMELINE.map((item) => (
            <TimelineCard key={`${item.year}-${item.title}`} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
