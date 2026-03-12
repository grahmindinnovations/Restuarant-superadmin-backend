import { transporter } from "../config/email.js";
import { env } from "../config/env.js";

export async function scheduleMeeting(req, res) {
  try {
    const { clientName, clientEmail, meetingDate, meetingTime, meetingLink } = req.body || {};

    if (!clientName || !clientEmail || !meetingDate || !meetingTime || !meetingLink) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await transporter.sendMail({
      from: `"CRM Team" <${env.EMAIL_USER}>`,
      to: clientEmail,
      subject: `Meeting Scheduled with ${clientName}`,
      text: `
Hello ${clientName},

Your meeting has been scheduled.

Date: ${meetingDate}
Time: ${meetingTime}
Meeting Link: ${meetingLink}

If you have questions, reply to this email.

Regards,
CRM Team
      `,
      html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Hello ${clientName},</h2>
        <p>Your meeting has been scheduled successfully.</p>
        <p><strong>Date:</strong> ${meetingDate}</p>
        <p><strong>Time:</strong> ${meetingTime}</p>
        <p>
          <strong>Meeting Link:</strong><br/>
          <a href="${meetingLink}">${meetingLink}</a>
        </p>
        <p>If you have any questions, simply reply to this email.</p>
        <br/>
        <p>Regards,<br/>CRM Team</p>
      </div>
      `,
      replyTo: env.EMAIL_USER
    });

    return res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error("[backend] schedule-meeting error:", error);
    return res.status(500).json({ message: "Email failed" });
  }
}

