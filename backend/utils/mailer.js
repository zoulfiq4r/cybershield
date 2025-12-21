const nodemailer = require('nodemailer');

const adminEmail = process.env.ADMIN_EMAIL;
const mailHost = process.env.MAIL_HOST;
const mailPort = Number(process.env.MAIL_PORT || 587);
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const mailFrom = process.env.MAIL_FROM || mailUser || 'no-reply@cybershield.local';

let transporter;

if (mailHost) {
  transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: process.env.MAIL_SECURE === 'true' || mailPort === 465,
    auth: mailUser
      ? {
          user: mailUser,
          pass: mailPass,
        }
      : undefined,
  });
}

async function sendAdminNotification({ name, email, message }) {
  if (!transporter || !adminEmail) {
    console.warn('Email not sent: mail transport not configured');
    return;
  }

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: adminEmail,
      subject: `New contact message from ${name}`,
      text: `You have a new contact message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    });
  } catch (error) {
    console.error('Admin notification email failed:', error.message);
  }
}

module.exports = {
  sendAdminNotification,
};
