import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SKILL_DOMAINS } from "../../data/content";
import { useMediaQuery } from "../../hooks/useMedia";
import styles from "./Skills.module.css";

const PRESETS = [
  { id: "ml", label: "Hire for ML Eng" },
  { id: "fintech", label: "Hire for Fintech" },
  { id: "rag", label: "Hire for RAG" },
  { id: "embedded", label: "Hire for Embedded" },
] as const;

const POSITIONS: Record<string, { x: number; y: number }> = {
  ml: { x: 28, y: 42 },
  fintech: { x: 72, y: 28 },
  rag: { x: 70, y: 68 },
  embedded: { x: 30, y: 72 },
};

export function Skills() {
  const [active, setActive] = useState<string>("ml");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const domain = useMemo(
    () => SKILL_DOMAINS.find((d) => d.id === active) ?? SKILL_DOMAINS[0],
    [active],
  );

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
      <div className="container">
        <p className={styles.label}>Skills</p>
        <h2 id="skills-heading">What I build with</h2>
        <div className={styles.presets} role="group" aria-label="Hire-me presets">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`${styles.preset} ${active === p.id ? styles.presetActive : ""}`}
              onClick={() => setActive(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {isMobile ? (
          <div className={styles.accordion}>
            {SKILL_DOMAINS.map((d) => (
              <details key={d.id} open={d.id === active} onToggle={(e) => e.currentTarget.open && setActive(d.id)}>
                <summary>{d.label}</summary>
                <ul>
                  {d.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            <svg className={styles.canvas} viewBox="0 0 100 100" role="img" aria-label="Skills constellation">
              <title>Skills constellation</title>
              {SKILL_DOMAINS.map((from) =>
                SKILL_DOMAINS.filter((to) => to.id > from.id).map((to) => (
                  <line
                    key={`${from.id}-${to.id}`}
                    x1={POSITIONS[from.id].x}
                    y1={POSITIONS[from.id].y}
                    x2={POSITIONS[to.id].x}
                    y2={POSITIONS[to.id].y}
                    className={`${styles.edge} ${
                      active === from.id || active === to.id ? styles.edgeActive : ""
                    }`}
                  />
                )),
              )}
              {SKILL_DOMAINS.map((d) => (
                <g key={d.id}>
                  <circle
                    cx={POSITIONS[d.id].x}
                    cy={POSITIONS[d.id].y}
                    r={active === d.id ? 4.2 : 3.2}
                    className={`${styles.node} ${active === d.id ? styles.nodeActive : ""}`}
                    tabIndex={0}
                    role="button"
                    aria-pressed={active === d.id}
                    aria-label={d.label}
                    onClick={() => setActive(d.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(d.id);
                      }
                    }}
                  />
                  <text x={POSITIONS[d.id].x} y={POSITIONS[d.id].y - 6} className={styles.nodeLabel}>
                    {d.label}
                  </text>
                </g>
              ))}
            </svg>
            <div className={styles.side}>
              <h3>{domain.label}</h3>
              <ul>
                {domain.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className={styles.jump}>
                Related:{" "}
                {active === "fintech" && <Link to="/work/arc">ARC</Link>}
                {active === "embedded" && <Link to="/work/trackbot">TrackBot</Link>}
                {active === "rag" && <Link to="/work/lexis">Lexis</Link>}
                {active === "ml" && <a href="/#experience">Experience</a>}
              </p>
            </div>
          </div>
        )}

        <ul className={styles.srList}>
          {SKILL_DOMAINS.map((d) => (
            <li key={d.id}>
              <strong>{d.label}:</strong> {d.tools.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
