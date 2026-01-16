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
export const WARRANTY_EXPIRY_EMAIL_PROMPT = `Generate clean HTML content that will be inserted into a warranty expiry email template at the {{expiryContent}} placeholder.

Available warranty data:
- Name: {{name}}
- Email: {{email}}
- Product Name: {{productName}}
- Expiry Date: {{expiryDate}}
- Days Remaining: {{daysRemaining}}

IMPORTANT CONTEXT:
The user has a warranty that is expiring soon and needs to be reminded to take action.
This is an urgent notification to help them stay on top of their warranty coverage.

IMPORTANT: Start with an urgent but friendly tone. Use phrases like "Heads up", "Action needed", "Time's running out", or "Quick reminder".

CONTENT REQUIREMENTS:
1. Keep the message urgent but friendly and clear
2. Focus on:
   - The specific product name and expiry date
   - Urgency of the situation (days remaining)
   - Recommended actions (renew, file a claim, contact support)
   - Peace of mind and protection
3. Make clear what action the user should take
4. Include encouragement to act promptly
5. Make the message feel urgent but not alarming

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML
- NO markdown, NO code blocks, NO backticks
- Use a SINGLE paragraph only:
<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">content</p>
- Write exactly TWO to THREE sentences
- Keep total content between 40–70 words
- Use <strong> for emphasis on urgency (expiry date, days remaining, action items)
- Do NOT repeat text handled by the email template

Example outputs:

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Heads up, {{name}}! Your warranty for <strong>{{productName}}</strong> expires on <strong>{{expiryDate}}</strong> – that's only <strong>{{daysRemaining}} days away</strong>. Consider renewing your coverage or filing a claim before it's too late to protect yourself.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Time's running out, {{name}}! Your <strong>{{productName}}</strong> warranty ends on <strong>{{expiryDate}}</strong>. Review your coverage now and decide whether to renew or make a claim while you still can.</p>`