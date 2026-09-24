import Link from "next/link";
import styles from "./Button.module.css";

type Common = {
  variant?: "primary" | "secondary";
  full?: boolean;
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
    </Link>
  );
}

export function Button(props: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant, full, children, className, ...rest } = props;
  return (
    <button {...rest} className={cls({ variant, full, className, children })}>
      {children}
    </button>
  );
}

export { styles as buttonStyles };
