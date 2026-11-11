import nodemailer from 'nodemailer';

// Simple in-memory rate limiting map for basic spam protection (by client IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(clientIp) {
  if (!clientIp) return false;
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record) {
    rateLimitMap.set(clientIp, { count: 1, firstRequest: now });
    return false;
  }

  if (now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, firstRequest: now });
    return false;
  }

  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // remove HTML tag brackets
    .trim();
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compliant simplified regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

export const handler = async (event) => {
  // 1. HTTP Method validation
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST'
      },
      body: JSON.stringify({ error: 'Method not allowed. Only POST is accepted.' })
    };
  }

  // 2. Client IP & basic rate limiting
  const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  if (isRateLimited(clientIp)) {
    return {
      statusCode: 429,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Too many requests. Please wait a moment before trying again.' })
    };
  }

  // 3. Body parsing
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON request payload.' })
    };
  }

  // 4. Honeypot check for bots (hidden field that must be empty)
  if (body._gotcha || body.website_hp || body.honeypot) {
    // Silently reject bot submissions
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Message received.' })
    };
  }

  // 5. Extract & Sanitize fields
  const name = sanitizeText(body.name);
  const email = (body.email || '').trim().toLowerCase();
  const service = sanitizeText(body.service || body.communityType || 'General Inquiry');
  const subject = sanitizeText(body.subject || 'New Website Inquiry');
  const message = sanitizeText(body.message);

  // 6. Validation
  if (!name || name.length < 2 || name.length > 100) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Please provide a valid name (2-100 characters).' })
    };
  }

  if (!isValidEmail(email)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Please provide a valid email address.' })
    };
  }

  if (!message || message.length < 5 || message.length > 5000) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Please provide a message between 5 and 5,000 characters.' })
    };
  }

  // 7. Verify SMTP configuration environment variables
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
  const smtpFrom = process.env.SMTP_FROM_EMAIL || smtpUser;
  // Recipient is strictly fixed to femizydasilver@gmail.com by default
  const contactEmail = process.env.CONTACT_EMAIL || 'femizydasilver@gmail.com';

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('[SMTP Config Error] Missing SMTP configuration. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in Netlify Environment Variables.');
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Email service is not yet configured. Please contact us directly at ' + contactEmail,
        code: 'SMTP_UNCONFIGURED'
      })
    };
  }

  // 8. Configure Nodemailer transport
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    },
    tls: {
      rejectUnauthorized: true
    }
  });

  const timestamp = new Date().toUTCString();

  // Structured Plain Text Content
  const textContent = `NEW WEBSITE ENQUIRY

Name: ${name}
Email: ${email}
Service Interested In: ${service}
Subject: ${subject}

Message:
${message}

Submission Date:
${timestamp}

Website:
MemberFlow Studio`;

  // Structured HTML Email Content
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
      <div style="background-color: #10192B; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">MemberFlow Studio</h1>
        <p style="color: #3b82f6; font-size: 13px; margin: 4px 0 0 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">New Website Enquiry</p>
      </div>

      <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 140px;">Visitor Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Visitor Email:</td>
            <td style="padding: 8px 0; color: #2563eb; font-weight: 600;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Service Interested In:</td>
            <td style="padding: 8px 0; color: #0f172a;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
            <td style="padding: 8px 0; color: #0f172a;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Received At:</td>
            <td style="padding: 8px 0; color: #64748b; font-size: 12px;">${timestamp}</td>
          </tr>
        </table>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
          <h3 style="font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0;">Message:</h3>
          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; font-size: 14px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          <p style="margin: 0;">You can reply directly to this email to contact <strong>${name}</strong>.</p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"MemberFlow Studio Web" <${smtpFrom}>`,
    to: contactEmail,
    replyTo: `"${name}" <${email}>`,
    subject: `New Website Enquiry — MemberFlow Studio (${name})`,
    text: textContent,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Success] Email delivered to ${contactEmail}. MessageId: ${info.messageId}`);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: "Thank you for reaching out! Your message has been sent successfully. I'll get back to you as soon as possible."
      })
    };
  } catch (sendError) {
    // Safe error logging without exposing secrets
    console.error('[SMTP Delivery Error]', sendError?.message || 'Unknown SMTP error');
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: "Your message couldn't be sent right now. Please try again in a moment or contact us directly by email.",
        code: 'SMTP_DELIVERY_FAILED'
      })
    };
  }
};
