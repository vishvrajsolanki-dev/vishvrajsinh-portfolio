import { useState } from "react";
import { EXPERIENCE, SITE } from "../../data/content";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import styles from "./Experience.module.css";

export function Experience() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className="container">
        <p className={styles.label}>Experience</p>
        <h2 id="experience-heading">Where I build</h2>
        <div className={styles.list}>
          {EXPERIENCE.map((item) => {
            const expanded = !!open[item.id];
            const hasNested = !!item.nested?.length;
            return (
              <article key={item.id} className={styles.panel}>
                <div className={styles.panelTop}>
                  <div>
                    <div className={styles.metaRow}>
                      {item.badge && <Badge status={item.badge} />}
                      <span className={styles.period}>{item.period}</span>
                    </div>
                    <h3>{item.role}</h3>
                    <p className={styles.org}>
                      {item.org}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                  </div>
                  {item.lor && (
                    <Button
                      href={SITE.lorUrl.startsWith("http") ? SITE.lorUrl : undefined}
                      variant="secondary"
                      disabled={!SITE.lorUrl.startsWith("http")}
                      title={SITE.lorUrl.startsWith("http") ? "View LoR" : "LoR link coming soon"}
                    >
                      View LoR
                    </Button>
                  )}
                </div>
                <ul className={styles.bullets}>
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {item.id === "ssip" && (
                  <ol className={styles.stepper} aria-label="SSIP rounds">
                    <li className={styles.done}>First round cleared</li>
                    <li className={styles.done}>Department round cleared</li>
                    <li className={styles.current}>University round in progress</li>
                    <li>₹35K path</li>
                  </ol>
                )}
                {hasNested && (
                  <>
                    <button
                      type="button"
                      className={styles.expandBtn}
                      aria-expanded={expanded}
                      onClick={() => setOpen((s) => ({ ...s, [item.id]: !expanded }))}
                    >
                      {expanded ? "Hide internship projects" : "Show internship projects"}
                    </button>
                    {expanded && (
                      <div className={styles.nested}>
                        {item.nested!.map((n) => (
                          <div key={n.title} className={styles.nestedItem}>
                            <h4>{n.title}</h4>
                            <p>{n.detail}</p>
                            {n.links && (
                              <div className={styles.nestedLinks}>
                                {n.links.map((l) => (
                                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                                    {l.label} ↗
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
