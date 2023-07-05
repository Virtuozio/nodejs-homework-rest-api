const User = require("../../models/usersModel");
const { catchAsync } = require("../../utils");
const { createUserDataValidator } = require("../../utils/usersValidator");

exports.checkCreatedUserData = catchAsync(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body);
  if (error) return next(res.status(400).json({ message: "Not logged in!" }));

  const contacExits = await User.exists({ email: value.email });

  if (contacExits) return next(res.status(409).json({ message: "Email in use" }));

  req.body = value;
  next();
});
