
const ContactMessage = require("../models/ContactMessage");

const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Required field validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Length validation
    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be 100 characters or fewer.",
      });
    }

    if (subject.trim().length > 200) {
      return res.status(400).json({
        success: false,
        message: "Subject must be 200 characters or fewer.",
      });
    }

    if (message.trim().length < 10 || message.trim().length > 5000) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 10 and 5000 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      normalizedEmail.length > 254 ||
      !emailPattern.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: normalizedEmail,
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!",
      data: {
        id: contactMessage._id,
        createdAt: contactMessage.createdAt,
      },
    });
  } catch (error) {
    console.error("Create contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your message. Please try again later.",
    });
  }
};

module.exports = { createContactMessage };
