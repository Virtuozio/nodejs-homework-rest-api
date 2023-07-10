const sgMail = require("@sendgrid/mail");
const sendEmail = async (email, token) => {
  const { SENDGRID_API_KEY, SERVER_URL, GMAIL_USER } = process.env;
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: GMAIL_USER, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a href="${SERVER_URL}/users/verify/${token}">Confirm your email</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      return msg;
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendEmail };
