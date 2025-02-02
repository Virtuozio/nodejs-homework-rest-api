const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const { checkContactData } = require("../../middlewares/contacts/contactsMiddlewares");
const { protect } = require("../../middlewares/users");
const router = express.Router();

router.use(protect);

router.route("/").post(checkContactData, addContact).get(getAllContacts);

router
  .route("/:contactId")
  .get(getContactById)
  .patch(checkContactData, updateContact)
  .delete(deleteContact);

router.route("/:contactId/favorite").patch(updateStatusContact);

module.exports = router;
