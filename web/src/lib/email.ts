/**
 * E-Mail-Versand über einen austauschbaren Anbieter (Postmark, Resend, Brevo …).
 * Ist keiner konfiguriert, liefert getEmailProvider() null und Formulare
 * verweisen ehrlich auf die E-Mail-Adresse.
 */
export interface EmailMessage {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export interface EmailProvider {
  readonly id: string;
  send(message: EmailMessage): Promise<void>;
}

export function getEmailProvider(): EmailProvider | null {
  // Später z. B.: if (process.env.POSTMARK_TOKEN) return createPostmarkProvider(...)
  return null;
}
