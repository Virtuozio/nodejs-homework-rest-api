const User = require("../../models/usersModel");
const { catchAsync } = require("../../utils");
exports.logout = catchAsync(async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).json();
});
