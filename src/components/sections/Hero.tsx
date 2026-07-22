import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SITE } from "../../data/content";
import { usePrefersReducedMotion, useMediaQuery } from "../../hooks/useMedia";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";
import styles from "./Hero.module.css";

const HeroCanvas = lazy(() =>
  import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
);

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const metricsRef = useRef<HTMLUListElement>(null);
  const enable3d = !reduced && !isMobile && !skipped;

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), reduced || skipped ? 0 : 400);
    return () => window.clearTimeout(t);
  }, [reduced, skipped]);

  useEffect(() => {
    if (!metricsRef.current) return;
    const nodes = metricsRef.current.querySelectorAll("[data-count]");
    nodes.forEach((node) => {
      const el = node as HTMLElement;
      el.textContent = el.dataset.count ?? "";
    });
  }, [ready]);

  return (
    <section className={styles.hero} id="hero" aria-label="Introduction">
      <div className={styles.stage} aria-hidden={!enable3d}>
        {enable3d ? (
          <Suspense fallback={<div className={styles.poster} />}>
            <HeroCanvas dark={theme === "dark"} />
          </Suspense>
        ) : (
          <div className={`${styles.poster} ${theme === "dark" ? styles.posterDark : ""}`} />
        )}
      </div>

      <div className={`container ${styles.content} ${ready ? styles.contentReady : ""}`}>
        <p className={styles.eyebrow}>{SITE.eyebrow}</p>
        <h1 className={styles.name}>{SITE.name}</h1>
        <p className={styles.tagline}>{SITE.tagline}</p>
        <p className={styles.support}>{SITE.support}</p>
        <div className={styles.ctas}>
          <Button href={SITE.resumeUrl} variant="primary" magnetic>
            Download Resume
          </Button>
          <Button href="/#work" variant="secondary">
            View work
          </Button>
          {enable3d && (
            <Button variant="ghost" onClick={() => setSkipped(true)}>
              Skip intro
            </Button>
          )}
        </div>
        <ul className={styles.metrics} ref={metricsRef}>
          {SITE.metrics.map((m) => (
            <li key={m.label}>
              <span data-count={m.value} className={styles.metricValue}>
                {m.value}
              </span>
              <span className={styles.metricLabel}>{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
