import { inngest } from "@/lib/Inngest/client";
import { SendSignUpEmail } from "@/lib/Inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [SendSignUpEmail],
});
