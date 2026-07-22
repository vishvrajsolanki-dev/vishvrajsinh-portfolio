import { useEffect, useId, useRef, useState } from "react";
import { PROJECTS, type Project } from "../../data/content";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import styles from "./Work.module.css";

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={styles.visual} data-project={project.id}>
      <div className={styles.visualGlow} aria-hidden />
      <div className={styles.visualFrame}>
        <img
          className={styles.cover}
          src={project.cover}
          alt={`${project.title} preview`}
          width={1280}
          height={720}
          loading="lazy"
        />
        <div className={styles.visualOverlay}>
          <div className={styles.visualTop}>
            <span>{project.index}</span>
            <span>{project.status}</span>
          </div>
          <div className={styles.visualCore}>
            <p className={styles.visualTitle}>{project.title}</p>
            <p className={styles.visualSub}>{project.subtitle}</p>
          </div>
          <div className={styles.visualStack}>
            {project.stack.slice(0, 4).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandSheet({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        style={{ ["--chapter-accent" as string]: project.accentVar }}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.sheetMedia}>
          <ProjectVisual project={project} />
        </div>
        <div className={styles.sheetBody}>
          <Badge status={project.status} />
          <h3 id={titleId} className={styles.sheetTitle}>
            {project.title}
          </h3>
          <p className={styles.sheetSub}>{project.subtitle}</p>
          <h4>Problem</h4>
          <p>{project.problem}</p>
          <h4>Approach</h4>
          <p>{project.approach}</p>
          <ul className={styles.metricList}>
            {project.metrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <div className={styles.stack}>
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className={styles.sheetActions}>
            {project.github && (
              <Button href={project.github} variant="secondary">
                GitHub
              </Button>
            )}
            {project.live && (
              <Button href={project.live} variant="secondary">
                Live demo
              </Button>
            )}
            {project.caseStudy && (
              <Button href={`/work/${project.slug}`} variant="primary">
                Full case study
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={`container ${styles.header}`} data-reveal>
        <p className={styles.label}>P2 / Selected Work</p>
        <h2 id="work-heading">Flagship systems</h2>
        <p className={styles.lede}>
          Scroll the chapters. Explore opens a detail sheet. ARC leads. TrackBot proves leadership in the world.
        </p>
      </div>

      <div className={styles.chapters}>
        <div className={styles.spine} aria-hidden />
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className={styles.chapter}
            style={{ ["--chapter-accent" as string]: project.accentVar }}
            id={project.slug}
            data-chapter
          >
            <div className={`container ${styles.chapterInner}`}>
              <div className={styles.copy}>
                <p className={styles.index} data-chapter-copy>
                  {project.index}
                </p>
                <p className={styles.kicker} data-chapter-copy>
                  {project.title}
                </p>
                <span data-chapter-copy>
                  <Badge status={project.status} />
                </span>
                <h3 data-chapter-copy>{project.subtitle}</h3>
                <p className={styles.oneLiner} data-chapter-copy>
                  {project.oneLiner}
                </p>
                <div className={styles.actions} data-chapter-copy>
                  <button type="button" className={styles.explore} onClick={() => setActive(project)}>
                    Explore project
                    <span aria-hidden>→</span>
                  </button>
                  {project.caseStudy && (
                    <Button href={`/work/${project.slug}`} variant="ghost">
                      Full case study
                    </Button>
                  )}
                </div>
                <div className={styles.metaBar} data-chapter-copy>
                  <div>
                    <span>Stack</span>
                    <strong>{project.stack.slice(0, 3).join(" · ")}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{project.status}</strong>
                  </div>
                  <div>
                    <span>Focus</span>
                    <strong>
                      {project.id === "arc" || project.id === "rupeeiq" || project.id === "fore"
                        ? "Fintech"
                        : project.id === "trackbot"
                          ? "Embedded"
                          : "RAG"}
                    </strong>
                  </div>
                </div>
              </div>
              <div data-chapter-media>
                <ProjectVisual project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && <ExpandSheet project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
