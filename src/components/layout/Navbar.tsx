import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE } from "../../data/content";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#timeline", id: "timeline", label: "Timeline" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const hero = document.getElementById("hero");
      if (!hero || !onHome) {
        setOverHero(false);
        return;
      }
      setOverHero(y < hero.offsetHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, menuOpen]);

  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id;
        if (top) setActive(top);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.08, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  const drawerOpen = open || menuOpen;

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        overHero && onHome ? styles.overHero : ""
      }`}
    >
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label={`${SITE.name} home`}>
          <span className={styles.logoMark}>{SITE.shortName}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.link} ${active === link.id ? styles.linkActive : ""}`}
            >
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
            {theme === "light" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M12 2.5v2.2M12 19.3v2.2M4.7 12H2.5M21.5 12h-2.2" />
                  <path d="M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M5.6 18.4l1.5-1.5M16.9 7.1l1.5-1.5" />
                </g>
              </svg>
            )}
          </button>
          <Button href={SITE.resumeUrl} variant="primary" magnetic className={styles.resume}>
            Resume
          </Button>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen((v) => !v);
              setOpen((v) => !v);
            }}
          >
            <span className={styles.menuLabel}>Menu</span>
            <span className={styles.menuDots} aria-hidden>
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
        hidden={!drawerOpen}
      >
        <nav aria-label="Mobile">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.drawerLink} ${active === link.id ? styles.linkActive : ""}`}
              onClick={() => {
                setOpen(false);
                setMenuOpen(false);
              }}
            >
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
