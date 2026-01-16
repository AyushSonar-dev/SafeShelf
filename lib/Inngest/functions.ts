import { success } from "better-auth";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { sendWelcomeEmail } from "../nodemailer";

export const SendSignUpEmail = inngest.createFunction(
  { id: "signup-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{name}}",
      event.data.name
    ).replace("{{email}}", event.data.email);
    const response = await step.ai.infer("generate-welcome-email", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0].content.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thank You for joining SafeShelf!, You can now keep all your warranties organized and accessible.";
      const {
        data: { email, name },
      } = event;
      return await sendWelcomeEmail({
        email,
        name,
        intro: introText,
      });
    });
    return { success: true, message: "Welcome email process initiated" };
  }
);
