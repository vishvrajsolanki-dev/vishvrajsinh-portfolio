import { lazy, Suspense, useEffect, useState } from "react";
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
  const enable3d = !reduced && !isMobile && !skipped;

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), reduced || skipped ? 40 : 520);
    return () => window.clearTimeout(t);
  }, [reduced, skipped]);

  return (
    <section className={styles.hero} id="hero" aria-label="Introduction">
      <div className={styles.atmosphere} aria-hidden />
      <div className={styles.stage} aria-hidden={!enable3d}>
        {enable3d ? (
          <Suspense fallback={<div className={styles.poster} />}>
            <HeroCanvas dark={theme === "dark"} />
          </Suspense>
        ) : (
          <div className={`${styles.poster} ${theme === "dark" ? styles.posterDark : ""}`} />
        )}
      </div>

      <div className={`container ${styles.shell}`}>
        <div className={`${styles.content} ${ready ? styles.contentReady : ""}`}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden />
            {SITE.eyebrow}
          </p>
          <h1 className={styles.name}>
            <span>Vishvrajsinh</span>
            <span>Solanki</span>
          </h1>
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
        </div>

        <ul className={`${styles.metrics} ${ready ? styles.contentReady : ""}`}>
          {SITE.metrics.map((m) => (
            <li key={m.label}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <a href="/#work" className={styles.scroll} aria-label="Scroll to work">
        <span />
        Scroll
      </a>
    </section>
  );
}
