const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like 'yahoo', 'outlook', etc.
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_PASSWORD,  // Your email password or app-specific password
  },
});

const sendEmailWithTemplate = async (userEmail, name, subject, messageContent) => {
  try {
    const templatePath = path.join(__dirname, "../templates/emailTemplate.ejs");
    const html = await ejs.renderFile(templatePath, { name, subject, message: messageContent });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: userEmail,
      subject: "Your Email Subject Here",
      html: html,  
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



module.exports = { sendEmailWithTemplate };
