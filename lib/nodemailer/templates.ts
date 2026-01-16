export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to SafeShelf</title>

    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->

    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #0a0a0a !important;
                border: 1px solid #2a2a2a !important;
            }
            .dark-bg {
                background-color: #000000 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #cfcfcf !important;
            }
            .dark-text-muted {
                color: #9a9a9a !important;
            }
            .dark-border {
                border-color: #2a2a2a !important;
            }
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-text {
                font-size: 14px !important;
            }
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #000000;">
<tr>
<td align="center" style="padding: 40px 20px;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-container" style="max-width: 600px; background-color: #0a0a0a; border-radius: 10px; border: 1px solid #2a2a2a;">

<tr>
<td class="mobile-padding" style="padding: 40px;">

<!-- Heading -->
<h1 class="mobile-title dark-text" style="margin: 0 0 28px 0; font-size: 24px; font-weight: 600; color: #ffffff; line-height: 1.2;">
Welcome aboard {{name}}
</h1>

<!-- Intro (AI injected) -->
{{intro}}

<!-- Feature Label -->
<p class="mobile-text dark-text-secondary" style="margin: 0 0 14px 0; font-size: 16px; font-weight: 600; color: #cfcfcf;">
Here’s what you can do right now:
</p>

<!-- Feature List -->
<ul class="mobile-text dark-text-secondary" style="margin: 0 0 30px 0; padding-left: 18px; font-size: 16px; line-height: 1.6; color: #cfcfcf;">
<li style="margin-bottom: 10px;">Store all your warranty details securely in one place</li>
<li style="margin-bottom: 10px;">Upload invoices and documents for easy access</li>
<li style="margin-bottom: 10px;">Stay prepared for claims, repairs, and replacements</li>
</ul>

<!-- Supporting Text -->
<p class="mobile-text dark-text-secondary" style="margin: 0 0 36px 0; font-size: 16px; line-height: 1.6; color: #cfcfcf;">
SafeShelf helps you stay organized and stress-free by keeping important warranty information available whenever you need it.
</p>

<!-- CTA -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 36px;">
<tr>
<td align="center">
<a href="{{appUrl}}" style="display: block; width: 100%; background-color: #ffffff; color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 500; text-align: center;">
Go to SafeShelf
</a>
</td>
</tr>
</table>

<!-- Footer -->
<p class="mobile-text dark-text-muted" style="margin: 40px 0 0 0; font-size: 14px; line-height: 1.5; color: #9a9a9a; text-align: center;">
SafeShelf · Warranty Management Made Simple<br>
<a href="#" style="color: #9a9a9a; text-decoration: underline;">Unsubscribe</a> |
<a href="{{appUrl}}" style="color: #9a9a9a; text-decoration: underline;">Visit SafeShelf</a><br>
© 2025 SafeShelf
</p>

</td>
</tr>
</table>

</td>
</tr>
</table>
</body>
</html>`;
