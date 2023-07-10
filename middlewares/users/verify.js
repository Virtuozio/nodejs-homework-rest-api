const { catchAsync, verifyValidator } = require("../utils");
exports.verify = catchAsync(async (req, res, next) => {
  if (!Object.keys(req.body).includes("email"))
    return res.status(401).json({ message: "missing field email" });

  const { error } = verifyValidator.validate(req.body);
  if (error) return res.status(401).json({ message: error.message });

  next();
});
