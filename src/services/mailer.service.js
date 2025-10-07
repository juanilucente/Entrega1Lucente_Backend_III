const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendResetEmail(to, token){
  const url = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Password reset',
    text: `Use this link to reset your password: ${url}`,
    html: `<p>Use this link to reset your password: <a href="${url}">${url}</a></p>`
  });
  return info;
}

module.exports = { sendResetEmail };