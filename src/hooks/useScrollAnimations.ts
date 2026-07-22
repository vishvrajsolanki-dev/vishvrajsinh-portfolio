import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        const kids = group.querySelectorAll<HTMLElement>("[data-reveal-child]");
        if (!kids.length) return;
        gsap.fromTo(
          kids,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
        const media = chapter.querySelector<HTMLElement>("[data-chapter-media]");
        const copy = chapter.querySelectorAll<HTMLElement>("[data-chapter-copy]");
        if (media) {
          gsap.fromTo(
            media,
            { autoAlpha: 0, scale: 1.06, y: 40 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            },
          );
        }
        if (copy.length) {
          gsap.fromTo(
            copy,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 72%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [enabled]);
}

export function useScrollProgress(selector = "[data-scroll-progress]") {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(selector);
    if (!bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bar.style.transform = "scaleX(0)";
      return;
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [selector]);
}
