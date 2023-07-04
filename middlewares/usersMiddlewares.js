const User = require("../models/usersModel");
const { catchAsync } = require("../utils");
const jwt = require("jsonwebtoken");
const { createUserDataValidator } = require("../utils/usersValidator");
exports.checkCreatedUserData = catchAsync(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body);
  if (error) return next(res.status(400).json({ message: "Not logged in!" }));

  const contacExits = await User.exists({ email: value.email });

  if (contacExits) return next(res.status(409).json({ message: "Email in use" }));

  req.body = value;
  next();
});

exports.checkLoginedUserData = catchAsync(async (req, res, next) => {
  const { error, value } = createUserDataValidator(req.body);
  if (error) return next(res.status(400).json({ message: "Not logged in!" }));

  req.body = value;

  next();
});

/**
 * Protect middleware. Allow only logged in users.
 */
exports.protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") && req.headers.authorization.split(" ")[1];

  if (!token) return next(res.status(401).json({ message: "Not authorized" }));

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    return next(res.status(401).json({ message: "Not authorized" }));
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next(res.status(401).json({ message: "Not authorized" }));
  req.user = currentUser;

  next();
});
