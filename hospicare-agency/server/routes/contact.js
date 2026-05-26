const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { fullName, organisation, phone, email, enquiryType, message } =
    req.body || {};

  if (!fullName || !organisation || !phone || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const safeType = enquiryType || "General question";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailBody = `New enquiry received:\n\nName: ${fullName}\nOrganisation: ${organisation}\nPhone: ${phone}\nEmail: ${email}\nEnquiry Type: ${safeType}\n\nMessage:\n${message}`;

    await transporter.sendMail({
      from: `Hospicare Agency <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New enquiry - ${safeType}`,
      text: emailBody,
    });

    return res.status(200).json({ status: "sent" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;
