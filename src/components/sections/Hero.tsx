import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SITE } from "../../data/content";
import { usePrefersReducedMotion, useMediaQuery } from "../../hooks/useMedia";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";
import { HeroSystemPanel } from "./HeroSystemPanel";
import styles from "./Hero.module.css";

const HeroCanvas = lazy(() =>
  import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
);

const ROLE_LINES = [
  SITE.eyebrow,
  "AGV Systems · TrackBot Lead",
  "Probability-first Fintech Builder",
] as const;

function parseMetric(value: string): { prefix: string; num: number | null; suffix: string; raw: string } {
  const match = value.match(/^(.*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: null, suffix: "", raw: value };
  return { prefix: match[1], num: Number(match[2]), suffix: match[3], raw: value };
}

function useCountUp(active: boolean, target: number | null, decimals: number) {
  const [display, setDisplay] = useState(target === null ? "" : "0");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (target === null) return;
    if (!active || reduced) {
      setDisplay(target.toFixed(decimals));
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((target * eased).toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, decimals, reduced]);

  return display;
}

function MetricValue({ value, active }: { value: string; active: boolean }) {
  const parsed = parseMetric(value);
  const decimals = value.includes(".") ? 2 : 0;
  const counted = useCountUp(active, parsed.num, decimals);
  if (parsed.num === null) return <>{value}</>;
  return (
    <>
      {parsed.prefix}
      {counted}
      {parsed.suffix}
    </>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [metricsActive, setMetricsActive] = useState(false);
  const metricsRef = useRef<HTMLUListElement>(null);
  const enable3d = !reduced && !isMobile && !skipped;

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), reduced || skipped ? 40 : 180);
    return () => window.clearTimeout(t);
  }, [reduced, skipped]);

  useEffect(() => {
    if (!enable3d) {
      setShowSkip(false);
      return;
    }
    const t = window.setTimeout(() => setShowSkip(true), reduced ? 0 : 1600);
    return () => window.clearTimeout(t);
  }, [enable3d, reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLE_LINES.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setMetricsActive(true);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Introduction">
      <div className={styles.atmosphere} aria-hidden />
      <div className={styles.grain} aria-hidden />

      <div className={styles.stage} aria-hidden>
        <HeroSystemPanel />
        {enable3d && (
          <div className={styles.canvasLayer}>
            <Suspense fallback={null}>
              <HeroCanvas dark={theme === "dark"} />
            </Suspense>
          </div>
        )}
      </div>

      <div className={`container ${styles.shell}`}>
        <div className={`${styles.content} ${ready ? styles.contentReady : ""}`}>
          <p className={styles.eyebrow} title="Status: Available for internships">
            <span className={styles.dotWrap}>
              <span className={styles.dot} aria-hidden />
              <span className={styles.dotTip}>Available</span>
            </span>
            <span className={styles.role} key={ROLE_LINES[roleIndex]} aria-live="polite">
              {ROLE_LINES[roleIndex]}
            </span>
          </p>

          <h1 className={styles.name}>
            <span className={styles.nameLine}>
              {"Vishvrajsinh".split("").map((ch, i) => (
                <span key={`a${i}`} className={styles.char} style={{ ["--i" as string]: i }}>
                  {ch}
                </span>
              ))}
            </span>
            <span className={styles.nameLine}>
              {"Solanki".split("").map((ch, i) => (
                <span key={`b${i}`} className={styles.char} style={{ ["--i" as string]: i + 12 }}>
                  {ch}
                </span>
              ))}
            </span>
          </h1>

          <p className={styles.tagline}>{SITE.tagline}</p>
          <p className={styles.support}>{SITE.support}</p>

          <div className={styles.ctas}>
            <Button href={SITE.resumeUrl} variant="primary" magnetic>
              Download Resume
            </Button>
            <Button href="/#about" variant="secondary" magnetic>
              About me
            </Button>
            <a href="/#work" className={styles.workLink}>
              View work
              <span aria-hidden>→</span>
            </a>
            {enable3d && showSkip && (
              <button type="button" className={styles.skip} onClick={() => setSkipped(true)}>
                Skip 3D
              </button>
            )}
          </div>
        </div>

        <ul
          ref={metricsRef}
          className={`${styles.metrics} ${ready ? styles.contentReady : ""}`}
        >
          {SITE.metrics.map((m) => (
            <li key={m.label}>
              <span className={styles.metricValue}>
                <MetricValue value={m.value} active={metricsActive} />
              </span>
              <span className={styles.metricLabel}>{m.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <a href="/#about" className={styles.scroll} aria-label="Scroll to about">
        <span className={styles.scrollLine}>
          <span className={styles.scrollDot} />
        </span>
        Scroll
      </a>
    </section>
  );
}
