"use server"

import { Resend } from "resend"
import * as z from "zod"

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function sendContactEmail(data: z.infer<typeof contactSchema>) {
  // Bail out early if the key is not set
  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      error: "Email service isn’t configured. Please add RESEND_API_KEY to your environment variables.",
    }
  }

  // Let the SDK pick the key from the environment automatically
  const resend = new Resend()

  try {
    const validatedData = contactSchema.parse(data)

    // Send email to yourself
    const emailResult = await resend.emails.send({
      from: "Portfolio Contact <noreply@yourdomain.com>", // Replace with your domain
      to: ["abhishek.raj@example.com"], // Replace with your actual email
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e11d48; border-bottom: 2px solid #e11d48; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #e11d48; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${validatedData.message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #fef2f2; border-radius: 8px;">
            <p style="margin: 0; color: #7f1d1d; font-size: 14px;">
              <strong>Reply to:</strong> ${validatedData.email}
            </p>
          </div>
        </div>
      `,
    })

    // Send confirmation email to the sender
    await resend.emails.send({
      from: "Abhishek Raj <noreply@yourdomain.com>", // Replace with your domain
      to: [validatedData.email],
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e11d48; border-bottom: 2px solid #e11d48; padding-bottom: 10px;">
            Thank you for your message!
          </h2>
          
          <p>Hi ${validatedData.firstName},</p>
          
          <p>Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Your message:</h3>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p style="line-height: 1.6; color: #475569;">${validatedData.message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my projects on <a href="https://github.com/abhishekraj" style="color: #e11d48;">GitHub</a></li>
            <li>Connect with me on <a href="https://linkedin.com/in/abhishekraj" style="color: #e11d48;">LinkedIn</a></li>
            <li>Explore my cybersecurity writeups and blog posts</li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Abhishek Raj</strong><br>
          Full-Stack Developer & Cybersecurity Enthusiast</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}
