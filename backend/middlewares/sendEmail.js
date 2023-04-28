const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

exports.sendEmail = async (options) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "House of Arts",
      link: "https://hoa.onrender.com/",
    },
  });

  let response = {
    body: {
      name: options.name,
      intro: "A request to reset your password has been made for your account.",
      action: {
        instructions: "To reset your password, please click the button below:",
        button: {
          color: "#D70040", // Optional action button color
          text: "Click Me",
          link: options.message,
          logo: "https://i.imgur.com/7oCPlhS_d.webp",
        },
      },
      outro:
        "If you did not request a password reset, no further action is required on your part.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    html: mail,
  };

  await transporter.sendMail(message);
};
