import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(` Connected to MongoDB (Database: portfolio)`))
  .catch((err) => console.error(' MongoDB connection error:', err.message));

// Mongoose Schema & Model for collection: aisha-contactInquiry
const contactInquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactInquiry = mongoose.model(
  'ContactInquiry',
  contactInquirySchema,
  process.env.COLLECTION_NAME || 'aisha-contactInquiry'
);

// POST Endpoint for Contact Us Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // 1. Save Inquiry in MongoDB Collection: aisha-contactInquiry
    const newInquiry = await ContactInquiry.create({ name, email, subject, message });
    console.log(' New inquiry saved to MongoDB:', newInquiry._id);

    // 2. Email Notification via Gmail Nodemailer
    let emailStatus = 'skipped';
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || emailUser;

    if (emailUser && emailPass && emailPass !== 'your_gmail_app_password_here') {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const mailOptions = {
          from: `"Portfolio Contact Form" <${emailUser}>`,
          to: receiverEmail,
          replyTo: email,
          subject: `Portfolio Inquiry: ${subject} (from ${name})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #4f46e5; margin-top: 0;">New Contact Form Submission</h2>
              <p>You have received a new inquiry from your portfolio website.</p>
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
              <p style="font-size: 12px; color: #888888;">Saved in MongoDB collection <strong>aisha-contactInquiry</strong> at ${new Date().toLocaleString()}</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailStatus = 'sent';
        console.log(' Gmail notification sent to:', receiverEmail);
      } catch (mailErr) {
        console.error(' Nodemailer Error:', mailErr.message);
        emailStatus = `failed: ${mailErr.message}`;
      }
    } else {
      console.log(' Email notification skipped (EMAIL_PASS not configured in .env)');
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully!',
      inquiryId: newInquiry._id,
      emailStatus,
    });
  } catch (err) {
    console.error(' Server Error handling contact form:', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.listen(PORT, () => {
  console.log(` Server listening on http://localhost:${PORT}`);
});
