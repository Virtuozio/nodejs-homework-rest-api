const { catchAsync } = require("../../utils");

const Contact = require("../../models/contactsModel");

exports.updateStatusContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  console.log(req.body);
  if (!req.body) return res.status(404).json({ message: "missing field favorite" });
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite: req.body.favorite,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    contact: updatedContact,
  });
});
