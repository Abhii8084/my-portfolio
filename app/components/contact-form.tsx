"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { sendContactEmail } from "../actions/contact"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await sendContactEmail(data)

      if (result.success) {
        setSubmitStatus("success")
        toast({
          title: "Message sent successfully! 🎉",
          description: "Thank you for reaching out. I'll get back to you soon!",
          duration: 5000,
        })
        reset()
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      setSubmitStatus("error")
      toast({
        title: "Failed to send message 😞",
        description: error instanceof Error ? error.message : "Please try again later or contact me directly.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <Send className="h-5 w-5 text-blue-400" />
          </div>
          <span className="text-slate-100">Send me a message</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                {...register("firstName")}
                placeholder="First Name"
                className="bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("lastName")}
                placeholder="Last Name"
                className="bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register("subject")}
              placeholder="Subject"
              className="bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              {...register("message")}
              placeholder="Your Message"
              rows={4}
              className="bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 resize-none"
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : submitStatus === "success" ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Message Sent!
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
