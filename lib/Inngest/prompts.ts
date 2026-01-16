export const PERSONALIZED_WELCOME_EMAIL_PROMPT = `Generate clean HTML content that will be inserted into a welcome email template at the {{intro}} placeholder.

Available user data:
- Name: {{name}}
- Email: {{email}}

IMPORTANT CONTEXT:
The user has just signed up or logged in for the first time.
No product data, preferences, or usage history is available yet.

IMPORTANT: Do NOT start the content with "Welcome" since the email header already says "Welcome aboard {{name}}". Use alternatives like "Thanks for joining", "Great to have you", "You're all set", or "Good to see you".

CONTENT REQUIREMENTS:
1. Keep the message friendly, reassuring, and minimal
2. Focus on:
   - Getting started
   - Staying organized
   - Peace of mind
   - What the app helps them do (track and manage warranties)
3. Do NOT mention specific products, expiry dates, reminders, or actions the user has not taken yet
4. Do NOT assume anything beyond name and email
5. Make the message feel human and intentional, not generic marketing copy

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML
- NO markdown, NO code blocks, NO backticks
- Use a SINGLE paragraph only:
<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">content</p>
- Write exactly TWO sentences
- Keep total content between 25–40 words
- Use <strong> only for emphasis on the app’s core value (organization, peace of mind)
- Do NOT repeat text handled by the email template

Example outputs (TWO sentences only):

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Thanks for joining Warranty Card Manager, {{name}}! You now have a simple way to keep all your warranties organized and accessible, without relying on paperwork or memory. Everything important stays in one secure place.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Great to have you here, {{name}}. Warranty Card Manager helps you stay <strong>organized and stress-free</strong> by keeping important warranty details easy to find when you need them most.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">You’re all set, {{name}}! From now on, managing warranties doesn’t have to be messy or confusing. We’re here to help you keep everything clear, secure, and under control.</p>`
