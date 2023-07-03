const User = require("../../models/usersModel");
const { catchAsync, signToken } = require("../../utils");
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(401).json({ message: "Email or password is wrong" });

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) return res.status(401).json({ message: "Email or password is wrong" });

  user.password = undefined;

  const token = signToken(user.id);

  user.token = token;

  res.status(200).json({
    user,
  });
});
