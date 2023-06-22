const catchAsync = require("../utils/catchAsync");

const Contact = require("../models/contactsModel");
exports.getContactsList = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find().select("-__v");

  res.status(200).json({
    contacts,
  });
});

exports.getContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({
    contact,
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    contact: newContact,
  });
});

exports.deleteContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "contact deleted" });
});

exports.updateContactById = catchAsync(async (req, res, next) => {
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
