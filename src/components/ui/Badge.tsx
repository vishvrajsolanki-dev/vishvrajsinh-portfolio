import styles from "./Badge.module.css";

const toneMap: Record<string, string> = {
  Live: styles.live,
  Local: styles.local,
  "Build underway": styles.build,
  "In design": styles.design,
  "Under approval": styles.approval,
  "Paper in progress": styles.paper,
  Leadership: styles.build,
  "LoR awarded": styles.live,
  "ML Internship": styles.local,
  "AI Internship": styles.local,
};

export function Badge({ status }: { status: string }) {
  const cls = toneMap[status] ?? styles.local;
  return <span className={`${styles.badge} ${cls}`}>{status}</span>;
}
