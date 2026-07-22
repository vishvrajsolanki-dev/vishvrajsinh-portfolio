import { lazy, Suspense, useEffect, useState } from "react";
import { PROJECTS, SITE } from "../../data/content";
import { usePrefersReducedMotion, useMediaQuery } from "../../hooks/useMedia";
import styles from "./Hero.module.css";

const HeroCanvas = lazy(() =>
  import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
);

const featured = PROJECTS[0];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [ready, setReady] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const enable3d = !reduced && !isMobile && !skipped;

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), reduced ? 40 : 220);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <section className={styles.hero} id="hero" aria-label="Introduction" data-cinematic>
      <div className={styles.atmosphere} aria-hidden />
      <div className={styles.vignette} aria-hidden />

      <div className={styles.stage} aria-hidden={!enable3d}>
        {enable3d ? (
          <Suspense fallback={<div className={styles.poster} />}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <div className={styles.poster} />
        )}
      </div>

      <div className={`container ${styles.shell}`}>
        <div className={`${styles.content} ${ready ? styles.contentReady : ""}`}>
          <p className={styles.eyebrow}>{SITE.eyebrow.split("·")[0].trim()}</p>
          <h1 className={styles.name}>
            Vishvrajsinh
            <br />
            Solanki
          </h1>
          <p className={styles.support}>{SITE.tagline}</p>
          <a href="/#work" className={styles.cta}>
            View work
            <span aria-hidden>↗</span>
          </a>
          {enable3d && (
            <button type="button" className={styles.skip} onClick={() => setSkipped(true)}>
              Reduce motion
            </button>
          )}
        </div>
      </div>

      <a href="/#about" className={styles.scroll} aria-label="Scroll to about">
        <span className={styles.scrollLine} />
        Scroll
      </a>

      <a href={`/work/${featured.slug}`} className={`${styles.featured} ${ready ? styles.featuredReady : ""}`}>
        <div className={styles.featuredCopy}>
          <p className={styles.featuredLabel}>Featured project</p>
          <p className={styles.featuredTitle}>{featured.title}</p>
          <p className={styles.featuredMeta}>{featured.subtitle}</p>
        </div>
        <span className={styles.featuredBtn} aria-hidden>
          →
        </span>
      </a>
    </section>
  );
}
