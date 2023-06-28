const Contact = require("../../models/contactsModel");
const { catchAsync } = require("../../utils");
exports.addContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    contact: newContact,
  });
});
