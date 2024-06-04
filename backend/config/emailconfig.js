const nodemailer = require("nodemailer");
const fs = require("fs");
const emailTemplate = fs.readFileSync(
  "/home/manthan/task/e-comm/backend/helper/images/template.html",
  "utf-8"
);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendVerificationEmail = async (user, token) => {
  const url = `http://localhost:${process.env.PORT}/submit/verify/${token}`;

  const emailBody = emailTemplate.replace("{{verificationUrl}}", url);

  try {
    await transporter.sendMail({
      to: user.email,
      subject: "Verify your email",
      html: emailBody,
    });
    console.log(`Verification email sent to: ${user.email}`);
  } catch (error) {
    console.error(`Error sending verification email to ${user.email}:`, error);
  }
};

module.exports = sendVerificationEmail;
