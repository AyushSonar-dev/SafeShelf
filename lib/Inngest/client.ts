import {Inngest} from "inngest";

export const inngest = new Inngest({
  id: "safeshelf",
 
  ai: {
    gemini: { apikey: process.env.GEMINI_API_KEY || "" },
  },
});
