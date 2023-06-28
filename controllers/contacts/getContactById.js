const { catchAsync } = require("../../utils");

const Contact = require("../../models/contactsModel");
exports.getContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({
    contact,
  });
});
