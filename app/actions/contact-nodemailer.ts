"use server"

import nodemailer from "nodemailer"
import * as z from "zod"

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

// Create transporter (configure based on your email provider)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password or app password
  },
})

export async function sendContactEmailNodemailer(data: z.infer<typeof contactSchema>) {
  try {
    const validatedData = contactSchema.parse(data)

    // Send email to yourself
    await transporter.sendMail({
      from: `"${validatedData.firstName} ${validatedData.lastName}" <${process.env.SMTP_USER}>`,
      to: "abhishek.raj@example.com", // Replace with your actual email
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    // Send confirmation to sender
    await transporter.sendMail({
      from: `"Abhishek Raj" <${process.env.SMTP_USER}>`,
      to: validatedData.email,
      subject: "Thanks for reaching out!",
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${validatedData.firstName},</p>
        <p>Thank you for reaching out! I'll get back to you soon.</p>
        <p>Best regards,<br>Abhishek Raj</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
    }
  }
}
