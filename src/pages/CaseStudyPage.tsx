import { Link, useParams } from "react-router-dom";
import { PROJECTS } from "../data/content";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import styles from "./CaseStudyPage.module.css";

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className={`container ${styles.missing}`}>
        <h1>Project not found</h1>
        <Button href="/#work" variant="primary">
          Back to work
        </Button>
      </main>
    );
  }

  const next = PROJECTS[(PROJECTS.findIndex((p) => p.id === project.id) + 1) % PROJECTS.length];

  return (
    <main className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <aside className={styles.toc} aria-label="Case study contents">
          <p>On this page</p>
          <a href="#overview">Overview</a>
          <a href="#problem">Problem</a>
          <a href="#approach">Approach</a>
          <a href="#results">Results</a>
        </aside>
        <article>
          <p className={styles.index}>{project.index}</p>
          <Badge status={project.status} />
          <h1 id="overview">{project.title}</h1>
          <p className={styles.sub}>{project.subtitle}</p>
          <p className={styles.lede}>{project.oneLiner}</p>
          <div className={styles.actions}>
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
            <Button href="/#work" variant="ghost">
              Back to work
            </Button>
          </div>

          <section id="problem" className={styles.block}>
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </section>
          <section id="approach" className={styles.block}>
            <h2>Approach / Architecture</h2>
            <p>{project.approach}</p>
            <div className={styles.stack}>
              {project.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </section>
          <section id="results" className={styles.block}>
            <h2>Results</h2>
            <ul>
              {project.metrics.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>

          <div className={styles.next}>
            <p>Next project</p>
            <Link to={`/work/${next.slug}`}>
              {next.index} · {next.title}
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
