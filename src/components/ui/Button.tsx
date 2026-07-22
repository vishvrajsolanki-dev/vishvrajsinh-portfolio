import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  magnetic?: boolean;
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  magnetic = false,
  ...rest
}: Props) {
  const classes = `${styles.btn} ${styles[variant]} ${magnetic ? styles.magnetic : ""} ${className}`;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={rest.type ?? "button"} {...rest}>
      {children}
    </button>
  );
}
