import Link from "next/link";
import styles from "./Button.module.css";
import { Icon } from "./Icon";

type Common = {
  variant?: "primary" | "secondary";
  full?: boolean;
  arrow?: boolean;
  children: React.ReactNode;
  className?: string;
};

function cls({ variant = "primary", full, className }: Common) {
  return [styles.button, styles[variant], full && styles.full, className].filter(Boolean).join(" ");
}

export function ButtonLink(props: Common & { href: string }) {
  return (
    <Link href={props.href} className={cls(props)}>
      {props.children}
      {props.arrow && <Icon name="arrow" className={styles.arrow} />}
    </Link>
  );
}

export function Button(props: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant, full, arrow, children, className, ...rest } = props;
  return (
    <button {...rest} className={cls({ variant, full, className, children })}>
      {children}
      {arrow && <Icon name="arrow" className={styles.arrow} />}
    </button>
  );
}

export { styles as buttonStyles };
