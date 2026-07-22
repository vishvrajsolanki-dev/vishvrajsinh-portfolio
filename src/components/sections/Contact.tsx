import { useState, type FormEvent } from "react";
import { SITE } from "../../data/content";
import { Button } from "../ui/Button";
import styles from "./Contact.module.css";

const TAGS = ["Internship", "Collab"] as const;

export function Contact() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("Internship");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    const subject = encodeURIComponent(`[${tag}] Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    form.reset();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={`container ${styles.grid}`}>
        <div data-reveal>
          <p className={styles.label}>Contact</p>
          <h2 id="contact-heading">Let&apos;s build something</h2>
          <p className={styles.lede}>
            Open to internships, research collaborations, and interesting problems worth solving.
          </p>
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.tags} role="group" aria-label="Subject tag">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={tag === t ? styles.tagActive : styles.tag}
                  onClick={() => setTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <label>
              Name
              <input name="name" autoComplete="name" required aria-invalid={status === "error"} />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required />
            </label>
            {status === "error" && (
              <p className={styles.error} role="alert">
                Please complete all fields.
              </p>
            )}
            {status === "success" && (
              <p className={styles.success} role="status">
                Opening your mail client. If it does not appear, email me directly.
              </p>
            )}
            <Button type="submit" variant="primary" magnetic>
              Send message
            </Button>
          </form>
        </div>
        <aside className={styles.channels} data-reveal-stagger>
          <button type="button" className={styles.channel} onClick={copyEmail} data-reveal-child>
            <span>EMAIL</span>
            <strong>{SITE.email}</strong>
            <em>{copied ? "Copied" : "Copy"}</em>
          </button>
          <a
            className={styles.channel}
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal-child
          >
            <span>LINKEDIN</span>
            <strong>Profile</strong>
            <em>Open ↗</em>
          </a>
          <a
            className={styles.channel}
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal-child
          >
            <span>GITHUB</span>
            <strong>vishvrajsolanki-dev</strong>
            <em>Open ↗</em>
          </a>
          <a
            className={styles.channel}
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal-child
          >
            <span>RESUME</span>
            <strong>Download CV</strong>
            <em>Open ↗</em>
          </a>
        </aside>
      </div>
    </section>
  );
}
