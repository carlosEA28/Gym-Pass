import { resendClient } from "../lib/resend.js";
import { readFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class OnboardingEmailService {
  async execute(email: string) {
    const htmlTemplate = await readFile(
      join(__dirname, "../templates/onboarding-email.html"),
      "utf-8",
    );

    await resendClient.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Bem Vindo(a) a Nossa Plataforma!",
      html: htmlTemplate,
    });
  }
}
