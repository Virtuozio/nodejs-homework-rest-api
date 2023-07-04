const { catchAsync } = require("../../utils");

const Contact = require("../../models/contactsModel");
exports.getAllContacts = catchAsync(async (req, res) => {
  const { limit, page, favorite } = req.query;
  const contactsQuery = Contact.find();
  switch (favorite) {
    case "true":
      contactsQuery.find({ favorite: true });
      break;
    case "false":
      contactsQuery.find({ favorite: false });
      break;
    default:
      contactsQuery.find();
  }

  try {
    const paginationPage = +page || 1;
    const paginationLimit = +limit || 5;
    const skip = (paginationPage - 1) * paginationLimit;

    const contacts = await contactsQuery.find().skip(skip).limit(paginationLimit);
    const total = await Contact.count();

    res.status(200).json({
      contacts,
      total,
    });
  } catch (error) {
    console.error("Error fetching contacts", error);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});
