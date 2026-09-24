/** Gemeinsame Formularprüfung (Client und Server). */
export const validators = {
  required: (v: string) => (v.trim() ? null : "Bitte ausfüllen."),
  email: (v: string) =>
    !v.trim() ? "Bitte gib deine E-Mail-Adresse an." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Diese E-Mail-Adresse ist unvollständig.",
  postalCodeDE: (v: string) => (/^\d{5}$/.test(v.trim()) ? null : "Bitte gib eine fünfstellige Postleitzahl an."),
  minLength: (n: number) => (v: string) => (v.trim().length >= n ? null : `Bitte mindestens ${n} Zeichen.`),
};

export type Validator = (v: string) => string | null;

export function validate<T extends Record<string, string>>(values: T, rules: Partial<Record<keyof T, Validator>>) {
  const errors: Partial<Record<keyof T, string>> = {};
  for (const key in rules) {
    const msg = rules[key]?.(values[key] ?? "");
    if (msg) errors[key] = msg;
  }
  return errors;
}
