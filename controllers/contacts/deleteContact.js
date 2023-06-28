const { catchAsync } = require("../../utils");

const Contact = require("../../models/contactsModel");

exports.deleteContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "contact deleted" });
});
