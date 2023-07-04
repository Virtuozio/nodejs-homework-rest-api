const express = require("express");
const { registration } = require("../../controllers/users/register");
const {
  checkCreatedUserData,
  checkLoginedUserData,
  protect,
} = require("../../middlewares/usersMiddlewares");
const { login } = require("../../controllers/users/login");
const { getCurrentUser } = require("../../controllers/users/getCurrentUser");
const { logout } = require("../../controllers/users/logout");
const { updateUserSub } = require("../../controllers/users/updateUserSub");
const router = express.Router();

router.patch("/", updateUserSub);

router.post("/register", checkCreatedUserData, registration);
router.post("/login", checkLoginedUserData, login);

router.use(protect);
router.post("/logout", logout);
router.get("/current", getCurrentUser);

module.exports = router;
