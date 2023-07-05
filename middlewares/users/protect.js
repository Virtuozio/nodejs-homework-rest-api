const User = require("../../models/usersModel");
const { catchAsync } = require("../../utils");
const jwt = require("jsonwebtoken");
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
