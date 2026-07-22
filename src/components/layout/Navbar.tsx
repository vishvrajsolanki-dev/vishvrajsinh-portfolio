import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE } from "../../data/content";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label={`${SITE.name} home`}>
          {SITE.shortName}
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.theme}
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <Button href={SITE.resumeUrl} variant="primary" magnetic className={styles.resume}>
            Resume
          </Button>
          <button
            type="button"
            className={styles.hamburger}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.drawerLink} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Button href={SITE.resumeUrl} variant="primary">
            Download Resume
          </Button>
        </nav>
      </div>
    </header>
  );
}
