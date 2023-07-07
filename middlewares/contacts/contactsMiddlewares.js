const Contact = require("../../models/contactsModel");
const { contactsDataValidator, catchAsync } = require("../../utils");

exports.checkContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactsDataValidator(req.body);

  if (error) return next(res.status(400).json({ message: "missing required name field" }));

  const contacExits = await Contact.exists({ email: value.email });

  if (contacExits)
    return next(res.status(400).json({ message: "Contact with this email already exists.." }));

  req.body = value;

  next();
});
