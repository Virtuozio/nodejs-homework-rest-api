const { catchAsync } = require("../../utils");
const { createUserDataValidator } = require("../../utils/usersValidator");

exports.checkLoginedUserData = catchAsync(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body);
  if (error) return next(res.status(400).json({ message: "Not logged in!" }));

  req.body = value;

  next();
});
