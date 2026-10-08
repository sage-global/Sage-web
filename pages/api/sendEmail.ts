import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { checkRateLimit, isDuplicateSubmission } from 'utils/rateLimit';

interface ApiResponse {
  ok: boolean;
  error?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (typeof req.headers['x-real-ip'] === 'string' && req.headers['x-real-ip'].length > 0) {
    return req.headers['x-real-ip'].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SAGE_CC_RECIPIENTS = [
  'aparna82@gmail.com',
  'snp@fsmail.bradley.edu',
  'psdaoud@gmail.com',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // 1. IP Rate Limiter (Max 3 submissions per 10 minutes per IP)
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp, {
    windowMs: 10 * 60 * 1000,
    max: 3,
  });

  if (!rateLimit.success) {
    const retryAfterSec = Math.ceil(rateLimit.resetTimeMs / 1000);
    res.setHeader('Retry-After', retryAfterSec.toString());
    return res.status(429).json({
      ok: false,
      error: 'Too many submissions received from your connection. Please wait a few minutes before trying again.',
    });
  }

  const { name, surname, email, phone, country, state, topic, description, website, formLoadedAt } = req.body || {};

  // 2. Honeypot check: If the hidden honeypot field is filled by a bot, silently return 200
  if (website && typeof website === 'string' && website.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // 3. Human Time-Trap: Submissions completed in < 2.5s from form mount are automated bots
  if (typeof formLoadedAt === 'number' && formLoadedAt > 0) {
    const durationMs = Date.now() - formLoadedAt;
    if (durationMs < 2500) {
      console.warn(`[sendEmail] Bot time-trap triggered: completed in ${durationMs}ms from ${clientIp}`);
      return res.status(200).json({ ok: true });
    }
  }

  // 4. Server-side validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ ok: false, error: 'Name is required.' });
  }
  if (name.trim().length > 100) {
    return res.status(400).json({ ok: false, error: 'Name must be 100 characters or fewer.' });
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ ok: false, error: 'A valid email address is required.' });
  }
  if (email.trim().length > 254) {
    return res.status(400).json({ ok: false, error: 'Email must be 254 characters or fewer.' });
  }

  if (phone && typeof phone === 'string' && phone.trim().length > 30) {
    return res.status(400).json({ ok: false, error: 'Phone number must be 30 characters or fewer.' });
  }

  if (topic && typeof topic === 'string' && topic.trim().length > 100) {
    return res.status(400).json({ ok: false, error: 'Topic must be 100 characters or fewer.' });
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({ ok: false, error: 'Message description is required.' });
  }
  if (description.trim().length > 5000) {
    return res.status(400).json({ ok: false, error: 'Message must be 5000 characters or fewer.' });
  }

  const cleanFullName = surname && typeof surname === 'string' && surname.trim().length > 0
    ? `${name.trim()} ${surname.trim()}`
    : name.trim();
  const cleanEmail = email.trim();
  const cleanPhone = phone && typeof phone === 'string' ? phone.trim() : '';
  const cleanCountry = country && typeof country === 'string' ? country.trim() : '';
  const cleanState = state && typeof state === 'string' ? state.trim() : '';
  const cleanTopic = topic && typeof topic === 'string' && topic.trim().length > 0 ? topic.trim() : 'General Inquiry';
  const cleanDescription = description.trim();

  // 5. Duplicate Submission Filter (Drop exact message from same email within 5 mins)
  const submissionHash = `${cleanEmail.toLowerCase()}:::${cleanDescription.toLowerCase()}`;
  if (isDuplicateSubmission(submissionHash)) {
    return res.status(200).json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[sendEmail] Missing RESEND_API_KEY environment variable.');
    return res.status(500).json({ ok: false, error: 'Email service is not configured.' });
  }

  const referer = typeof req.headers.referer === 'string' ? req.headers.referer : 'Direct / Not specified';
  const timestamp = new Date().toUTCString();

  const safeName = escapeHtml(cleanFullName);
  const safeEmail = escapeHtml(cleanEmail);
  const safePhone = cleanPhone ? escapeHtml(cleanPhone) : 'Not provided';
  const safeCountry = cleanCountry ? escapeHtml(cleanCountry) : '';
  const safeState = cleanState ? escapeHtml(cleanState) : '';
  const safeTopic = escapeHtml(cleanTopic);
  const safeDescription = escapeHtml(cleanDescription).replace(/\r?\n/g, '<br/>');
  const safeReferer = escapeHtml(referer);

  const subjectLine = `[SAGE Website] ${cleanTopic} from ${cleanFullName}`;

  // Primary Email Body (For SAGE Team + CCs)
  const teamTextBody = `New Website Inquiry received from SAGE Website:

Topic: ${cleanTopic}
Sender Details:
- Name: ${cleanFullName}
- Email: ${cleanEmail}
- Phone: ${cleanPhone || 'Not provided'}
${cleanCountry ? `- Country: ${cleanCountry}\n` : ''}${cleanState ? `- State: ${cleanState}\n` : ''}- Sent At: ${timestamp}
- Page Referer: ${referer}

Message:
${cleanDescription}
`;

  const teamHtmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subjectLine)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fbff; color: #0f172a; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background-color: #006aad; border-bottom: 4px solid #fb6b31; padding: 20px 24px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700;">New Website Inquiry</h1>
      <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Shastry Associates Global Enterprises (SAGE)</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px; font-weight: 600;">Inquiry Topic:</td>
          <td style="padding: 8px 0; font-size: 15px; font-weight: 700; color: #006aad;">${safeTopic}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Name:</td>
          <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #0f172a;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Email:</td>
          <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #006aad; text-decoration: none; font-weight: 500;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Phone:</td>
          <td style="padding: 8px 0; font-size: 15px; color: #0f172a;">${cleanPhone ? `<a href="tel:${safePhone}" style="color: #006aad; text-decoration: none;">${safePhone}</a>` : safePhone}</td>
        </tr>
        ${safeCountry ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Country:</td><td style="padding: 8px 0; font-size: 15px; color: #0f172a;">${safeCountry}</td></tr>` : ''}
        ${safeState ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">State:</td><td style="padding: 8px 0; font-size: 15px; color: #0f172a;">${safeState}</td></tr>` : ''}
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Date:</td>
          <td style="padding: 8px 0; font-size: 14px; color: #334155;">${timestamp}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Referer:</td>
          <td style="padding: 8px 0; font-size: 13px; color: #64748b;">${safeReferer}</td>
        </tr>
      </table>

      <div style="background-color: #f1f5f9; border-left: 4px solid #006aad; padding: 18px; border-radius: 4px;">
        <h2 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;">Message</h2>
        <div style="font-size: 15px; line-height: 1.6; color: #1e293b;">
          ${safeDescription}
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #e2e8f0; padding: 16px 24px; background-color: #f8fbff; text-align: center; font-size: 12px; color: #64748b;">
      <p style="margin: 0 0 4px 0;">Hit <strong>Reply</strong> to respond directly to ${safeName} (<a href="mailto:${safeEmail}" style="color: #006aad;">${safeEmail}</a>).</p>
      <p style="margin: 0;">Sent via the contact portal at <a href="https://shastryassociates.com" style="color: #006aad; text-decoration: none;">shastryassociates.com</a>.</p>
    </div>
  </div>
</body>
</html>
`;

  // Auto-responder Email Body (For the Visitor)
  const visitorTextBody = `Dear ${cleanName},

Thank you for reaching out to Shastry Associates Global Enterprises (SAGE).

We have received your message regarding "${cleanTopic}". A member of our team will review your inquiry and get back to you shortly.

Summary of your message:
--------------------------------------------------
Topic: ${cleanTopic}
${cleanPhone ? `Phone: ${cleanPhone}\n` : ''}Message:
${cleanDescription}
--------------------------------------------------

If you have any urgent inquiries, feel free to reply directly to this email or visit https://shastryassociates.com.

Best regards,
Shastry Associates Global Enterprises (SAGE)
Professional RF, Microwave & Wireless Engineering Education
Email: info@shastryassociates.com
Website: https://shastryassociates.com
`;

  const visitorHtmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Thank you for contacting SAGE</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fbff; color: #0f172a; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background-color: #006aad; border-bottom: 4px solid #fb6b31; padding: 24px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 700;">Thank you for contacting SAGE</h1>
      <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Shastry Associates Global Enterprises</p>
    </div>
    
    <div style="padding: 24px;">
      <p style="font-size: 16px; margin: 0 0 16px 0; color: #0f172a;">Dear <strong>${safeName}</strong>,</p>
      
      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 20px 0;">
        Thank you for reaching out to us. We have received your inquiry regarding <strong>${safeTopic}</strong>. Our team is reviewing your message and will respond to you shortly.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #fb6b31; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Your Message Summary</h3>
        <p style="margin: 0 0 6px 0; font-size: 14px; color: #475569;"><strong>Topic:</strong> ${safeTopic}</p>
        ${cleanPhone ? `<p style="margin: 0 0 6px 0; font-size: 14px; color: #475569;"><strong>Phone:</strong> ${safePhone}</p>` : ''}
        <div style="margin-top: 8px; font-size: 14px; line-height: 1.5; color: #1e293b;">
          ${safeDescription}
        </div>
      </div>

      <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin: 0;">
        If you have any additional questions in the meantime, feel free to reply directly to this email.
      </p>
    </div>

    <div style="border-top: 1px solid #e2e8f0; padding: 18px 24px; background-color: #f8fbff; font-size: 13px; color: #64748b; text-align: center;">
      <p style="margin: 0 0 4px 0; font-weight: 600; color: #006aad;">Shastry Associates Global Enterprises (SAGE)</p>
      <p style="margin: 0 0 4px 0;">Professional RF, Microwave & Wireless Engineering Education</p>
      <p style="margin: 0;"><a href="https://shastryassociates.com" style="color: #006aad; text-decoration: none;">shastryassociates.com</a> &bull; <a href="mailto:info@shastryassociates.com" style="color: #006aad; text-decoration: none;">info@shastryassociates.com</a></p>
    </div>
  </div>
</body>
</html>
`;

  try {
    const resend = new Resend(apiKey);

    // 1. Dispatch notification to SAGE inbox + CC recipients
    const { data: teamData, error: teamError } = await resend.emails.send({
      from: 'SAGE Website <info@shastryassociates.com>',
      to: ['info@shastryassociates.com'],
      cc: SAGE_CC_RECIPIENTS,
      replyTo: cleanEmail,
      subject: subjectLine,
      text: teamTextBody,
      html: teamHtmlBody,
    });

    if (teamError) {
      console.error('[sendEmail] Resend error delivering to SAGE team:', teamError);
      return res.status(500).json({ ok: false, error: 'Failed to send message. Please try again later.' });
    }

    // 2. Dispatch automated confirmation to the visitor (asynchronous, safe fallback)
    try {
      await resend.emails.send({
        from: 'SAGE <info@shastryassociates.com>',
        to: [cleanEmail],
        replyTo: 'info@shastryassociates.com',
        subject: 'Thank you for contacting SAGE - We received your inquiry',
        text: visitorTextBody,
        html: visitorHtmlBody,
      });
    } catch (autoReplyErr) {
      console.warn('[sendEmail] Auto-responder delivery warning (non-fatal):', autoReplyErr);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[sendEmail] Unexpected error:', err);
    return res.status(500).json({ ok: false, error: 'An unexpected error occurred. Please try again.' });
  }
}
