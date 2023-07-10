const User = require("../../models/usersModel");
const { catchAsync, sendEmail } = require("../../utils");
exports.sendVerify = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400);

  const { verificationToken, verify } = user;

  if (verify) return res.status(400).json({ message: "Verification has already been passed" });

  const info = await sendEmail(email, verificationToken);

  if (!info) return res.status(400).json({ message: "Email send error" });

  res.status(200).json({
    message: "Verification email sent",
  });
});
