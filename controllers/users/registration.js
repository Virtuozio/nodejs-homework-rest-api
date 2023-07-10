const User = require("../../models/usersModel");
const { catchAsync, signToken, sendEmail } = require("../../utils");
const nanoid = require("nanoid");
exports.registration = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
    verificationToken: nanoid(),
  };
  const newUser = await User.create(newUserData);
  newUser.password = undefined;

  const token = signToken(newUser.id);

  newUser.token = token;

  await User.findByIdAndUpdate(newUser._id, { token: token });
  const info = await sendEmail(newUser.email, newUser.verificationToken);
  if (!info) return res.status(401).json({ message: "Email send error" });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});
