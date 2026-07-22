import {
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion, useMediaQuery } from "../../hooks/useMedia";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";

type Common = {
  variant?: Variant;
  children: ReactNode;
  magnetic?: boolean;
  className?: string;
};

type ButtonProps = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AnchorProps = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonProps | AnchorProps;

export function Button(props: Props) {
  const {
    variant = "primary",
    children,
    className = "",
    magnetic = false,
    ...rest
  } = props;
  const reduced = usePrefersReducedMotion();
  const isTouch = useMediaQuery("(hover: none), (pointer: coarse)");
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const enableMagnetic = magnetic && !reduced && !isTouch;
  const classes = `${styles.btn} ${styles[variant]} ${enableMagnetic ? styles.magnetic : ""} ${className}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enableMagnetic) return;

    const onMove = (e: Event) => {
      const pe = e as PointerEvent;
      const rect = el.getBoundingClientRect();
      const x = pe.clientX - (rect.left + rect.width / 2);
      const y = pe.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [enableMagnetic]);

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={classes}
      type={buttonRest.type ?? "button"}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
