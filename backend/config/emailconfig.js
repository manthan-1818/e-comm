const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Construct the absolute path to the email template
const emailTemplatePath = path.resolve(__dirname, `../helper/images/template.html`);

// Read the email template
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

// Your other code here...

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (user, token) => {
  console.log("User object:", user);
  if (!user || !user.email) {
    console.error("No valid email address found in user object:", user);
    return;
  }

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
