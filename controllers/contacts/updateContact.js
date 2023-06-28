const { catchAsync } = require("../../utils");

const Contact = require("../../models/contactsModel");
exports.updateContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    contact: updatedContact,
  });
});
