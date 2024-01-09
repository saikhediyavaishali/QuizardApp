const nodemailer = require("nodemailer");

const sender = process.env.EMAIL;
const password = process.env.PASSWORD;

const sendMail = (token, userId, userEmail) => {
  // Email and token get by callback in userController
  const link = `http://127.0.0.1:3000/api/user/reset/${userId}/${token}`
  // api/user/reset/:id/:token
  console.log(link);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password,
    },
  });

  var mailOptions = {
    from: sender,
    to: userEmail,
    subject: "Sending Email using Node.js",
    text: link,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMail };
