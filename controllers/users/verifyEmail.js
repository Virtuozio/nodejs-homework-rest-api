const User = require("../../models/usersModel");
const { catchAsync } = require("../../utils");

exports.verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) return res.status(404).json({ message: "User not found" });

  const { id } = user;

  await User.findByIdAndUpdate(id, {
    verify: true,
    verificationToken: null,
  });

  return res.status(200).json({ message: "Verification successful" });
});
