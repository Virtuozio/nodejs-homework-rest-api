const express = require("express");
const {
  getContactsList,
  getContactById,
  createContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contactsController");
const { checkContactData } = require("../../middlewares/contactsMiddlewares");

const router = express.Router();

router.route("/").post(checkContactData, createContact).get(getContactsList);

router
  .route("/:contactId")
  .get(getContactById)
  .patch(checkContactData, updateContactById)
  .delete(deleteContactById);

router.route("/:contactId/favorite").patch(updateStatusContact);

module.exports = router;
