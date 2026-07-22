import { useState } from "react";
import { CERTIFICATIONS } from "../../data/content";
import { Button } from "../ui/Button";
import styles from "./Certifications.module.css";

export function Certifications() {
  const [issuerIndex, setIssuerIndex] = useState(0);
  const [certIndex, setCertIndex] = useState(0);
  const issuer = CERTIFICATIONS[issuerIndex];
  const cert = issuer.items[Math.min(certIndex, issuer.items.length - 1)];

  return (
    <section id="certifications" className={styles.section} aria-labelledby="certs-heading">
      <div className="container">
        <p className={styles.label}>Certifications</p>
        <h2 id="certs-heading">Verified proof</h2>
        <div className={styles.binder}>
          <div className={styles.issuers} role="listbox" aria-label="Certificate issuers">
            {CERTIFICATIONS.map((item, i) => (
              <button
                key={item.issuer}
                type="button"
                role="option"
                aria-selected={i === issuerIndex}
                className={`${styles.issuer} ${i === issuerIndex ? styles.issuerActive : ""}`}
                onClick={() => {
                  setIssuerIndex(i);
                  setCertIndex(0);
                }}
              >
                <span>{item.issuer}</span>
                <span className={styles.count}>{item.count}</span>
              </button>
            ))}
          </div>
          <div className={styles.preview}>
            <p className={styles.previewIssuer}>{issuer.issuer}</p>
            <h3>{cert.title}</h3>
            <p className={styles.date}>{cert.date}</p>
            {issuer.items.length > 1 && (
              <div className={styles.certTabs}>
                {issuer.items.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    className={i === certIndex ? styles.tabActive : undefined}
                    onClick={() => setCertIndex(i)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
            <Button href={cert.href} variant="primary">
              Verify ↗
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
