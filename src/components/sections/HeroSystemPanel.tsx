import { useEffect, useRef } from "react";
import styles from "./HeroSystemPanel.module.css";

/** Always-on schematic: pathfinding + Monte Carlo metaphor. No network deps. */
export function HeroSystemPanel() {
  const pathRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = pathRef.current;
    if (!el) return;
    const length = el.getTotalLength();
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    const raf = requestAnimationFrame(() => {
      el.style.transition = "stroke-dashoffset 2.4s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.strokeDashoffset = "0";
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.panel} aria-hidden>
      <div className={styles.blueprint} />
      <svg className={styles.svg} viewBox="0 0 640 720" role="presentation">
        <defs>
          <linearGradient id="mcFan" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Viewfinder corners */}
        <path className={styles.bracket} d="M48 88 H88 V48" />
        <path className={styles.bracket} d="M592 88 H552 V48" />
        <path className={styles.bracket} d="M48 632 H88 V672" />
        <path className={styles.bracket} d="M592 632 H552 V672" />

        {/* Pathfinding grid */}
        <g className={styles.grid}>
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={120 + i * 40} y1={160} x2={120 + i * 40} y2={480} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1={120} y1={160 + i * 40} x2={440} y2={160 + i * 40} />
          ))}
        </g>

        {/* Monte Carlo fan (ARC nod) */}
        <g className={styles.fan}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const spread = (i - 3) * 18;
            return (
              <path
                key={i}
                d={`M460 520 C 520 ${480 + spread}, 560 ${400 + spread * 1.4}, 600 ${320 + spread * 1.1}`}
                fill="none"
                stroke="url(#mcFan)"
                strokeWidth={1.2}
                opacity={0.35 + (i % 3) * 0.08}
              />
            );
          })}
        </g>

        {/* Radar / AGV field */}
        <circle cx={280} cy={320} r={110} fill="url(#radarGlow)" />
        <circle className={styles.radar} cx={280} cy={320} r={88} />
        <circle className={styles.radar} cx={280} cy={320} r={56} />
        <circle className={styles.radar} cx={280} cy={320} r={28} />
        <line className={styles.radarSweep} x1={280} y1={320} x2={280} y2={232} />

        {/* Planned path */}
        <polyline
          ref={pathRef}
          className={styles.path}
          points="140,440 180,400 220,400 260,360 300,360 340,280 380,240 420,200"
          fill="none"
        />
        <circle className={styles.agent} cx={140} cy={440} r={5} />
        <circle className={styles.goal} cx={420} cy={200} r={6} />

        {/* HUD labels */}
        <text className={styles.label} x="48" y="120">
          SYS · TRACKBOT PATH
        </text>
        <text className={styles.label} x="460" y="560">
          ARC · MONTE CARLO
        </text>
        <text className={styles.label} x="48" y="700">
          CLARITY ENGINE · LIVE
        </text>
      </svg>
      <div className={styles.scan} />
    </div>
  );
}
