const { addContact } = require("./addContact");
const { deleteContact } = require("./deleteContact");
const { getAllContacts } = require("./getAllContacts");
const { getContactById } = require("./getContactById");
const { updateContact } = require("./updateContact");
const { updateStatusContact } = require("./updateStatusContact");
module.exports = {
  addContact,
  getAllContacts,
  deleteContact,
  getContactById,
  updateContact,
  updateStatusContact,
};
