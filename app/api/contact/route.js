import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  isConnected = true;
  console.log(' Connected to MongoDB (Database: portfolio)');
}

// Mongoose Schema & Model for collection: aisha-contactInquiry
const contactInquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactInquiry =
  mongoose.models.ContactInquiry ||
  mongoose.model(
    'ContactInquiry',
    contactInquirySchema,
    process.env.COLLECTION_NAME || 'aisha-contactInquiry'
  );

export async function POST(req) {
  try {
    // Attempt database connection
    await connectDB();

    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    // 1. Save Inquiry in MongoDB Collection: aisha-contactInquiry
    const newInquiry = await ContactInquiry.create({ name, email, subject, message });
    console.log(' New inquiry saved to MongoDB:', newInquiry._id);

    // 2. Email Notification via Gmail Nodemailer (Awaited with fast connection timeouts for Serverless compatibility)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || emailUser;
    let emailStatus = 'skipped';

    if (emailUser && emailPass && emailPass !== 'your_gmail_app_password_here') {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: emailUser,
            pass: emailPass,
          },
          // Fast connection timeouts to prevent Vercel route timeout hangs
          connectionTimeout: 5000,
          greetingTimeout: 5000,
          socketTimeout: 5000,
        });

        const mailOptions = {
          from: `"Portfolio Contact Form" <${emailUser}>`,
          to: receiverEmail,
          replyTo: email,
          subject: `Portfolio Inquiry: ${subject} (from ${name})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #4f46e5; margin-top: 0;">New Contact Form Submission</h2>
              <p>You have received a new inquiry from your Next.js portfolio website.</p>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
                  <td style="padding: 8px 0;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
                  <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #888888;">Saved in MongoDB database at ${new Date().toLocaleString()}</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailStatus = 'sent';
        console.log(' Gmail notification sent successfully.');
      } catch (mailErr) {
        console.error(' Nodemailer Error:', mailErr.message);
        emailStatus = `failed: ${mailErr.message}`;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully!',
      inquiryId: newInquiry._id,
      emailStatus,
    });
  } catch (err) {
    console.error(' Server Error handling contact form:', err);
    return NextResponse.json({
      success: false,
      error: `Server Error: ${err.message || 'Internal Server Error'}`
    }, { status: 500 });
  }
}
