const User = require("../../models/usersModel");
const { catchAsync, signToken } = require("../../utils");
exports.registration = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
  };
  const newUser = await User.create(newUserData);
  newUser.password = undefined;

  const token = signToken(newUser.id);

  newUser.token = token;

  await User.findByIdAndUpdate(newUser._id, { token: token });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});
