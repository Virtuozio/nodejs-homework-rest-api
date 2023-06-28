const { catchAsync } = require("../../utils");

const Contact = require("../../models/contactsModel");
exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find().select("-__v");
  res.status(200).json({
    contacts,
  });
});
