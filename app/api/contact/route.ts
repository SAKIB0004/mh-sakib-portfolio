/**
 * DEPRECATED: This route is no longer used.
 * The Contact form now uses Web3Forms API directly from the client.
 * See: components/sections/Contact.tsx
 *
 * This file can be safely deleted if you no longer need it.
 */

import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

type ContactFormData = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    const { name, email, message } = body
    const subject = body.subject || ''

    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      )
    }

    const contactToEmail = process.env.CONTACT_TO_EMAIL
    if (!contactToEmail) {
      console.error('CONTACT_TO_EMAIL environment variable not set')
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      )
    }

    const finalSubject =
      subject.trim() || `Portfolio inquiry from ${name.trim()}`

    // Initialize Resend inside the handler with the API key from environment
    const resend = new Resend(resendApiKey)

    // Send email via Resend
    // TODO: Replace 'from' with your verified domain when ready:
    // from: 'Your Name <hello@yourdomain.com>'
    const response = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactToEmail,
      replyTo: email.trim(),
      subject: finalSubject,
      html: generateEmailHTML({
        name: name.trim(),
        email: email.trim(),
        subject: finalSubject,
        message: message.trim(),
      }),
    })

    if (response.error) {
      console.error('Resend error:', response.error)
      return NextResponse.json(
        {
          error:
            response.error.message ||
            response.error.name ||
            'Failed to send email',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        id: response.data?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}

function generateEmailHTML({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
            border-radius: 8px;
          }
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #6366f1 48%, #a855f7 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px -20px;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
          }
          .field {
            margin-bottom: 16px;
          }
          .label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 4px;
            font-size: 14px;
          }
          .value {
            color: #6b7280;
            word-wrap: break-word;
            white-space: pre-wrap;
          }
          .divider {
            border-top: 1px solid #e5e7eb;
            margin: 20px 0;
          }
          .footer {
            font-size: 12px;
            color: #9ca3af;
            margin-top: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">New Portfolio Inquiry</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
            </div>

            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>

            <div class="divider"></div>

            <div class="field">
              <div class="label">Message</div>
              <div class="value">${message}</div>
            </div>

            <div class="footer">
              <p>This email was sent from your portfolio contact form.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}