import { success } from "better-auth";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT, WARRANTY_EXPIRY_EMAIL_PROMPT } from "./prompts";
import { sendWelcomeEmail, sendWarrantyExpiryEmail } from "../nodemailer";

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

export const SendWarrantyExpiryEmail = inngest.createFunction(
  { id: "warranty-expiry-email" },
  { event: "app/warranty.expiring" },
  async ({ event, step }) => {
    const prompt = WARRANTY_EXPIRY_EMAIL_PROMPT.replace(
      "{{name}}",
      event.data.name
    )
      .replace("{{email}}", event.data.email)
      .replace("{{productName}}", event.data.productName)
      .replace("{{expiryDate}}", event.data.expiryDate)
      .replace("{{daysRemaining}}", event.data.daysRemaining.toString());

    const response = await step.ai.infer("generate-expiry-email", {
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

    await step.run("send-expiry-email", async () => {
      const part = response.candidates?.[0].content.parts?.[0];
      const expiryText =
        (part && "text" in part ? part.text : null) ||
        `Your warranty for ${event.data.productName} is expiring on ${event.data.expiryDate}. Please take action to renew or file a claim if needed.`;
      const {
        data: { email, name, productName, expiryDate },
      } = event;
      return await sendWarrantyExpiryEmail({
        email,
        name,
        productName,
        expiryDate,
        expiryContent: expiryText,
      });
    });
    return { success: true, message: "Warranty expiry email process initiated" };
  }
);
