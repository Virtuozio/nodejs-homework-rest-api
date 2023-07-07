const express = require("express");
const {
  logout,
  login,
  getCurrentUser,
  updateUserSub,
  updateAvatar,
  registration,
} = require("../../controllers/users");
const {
  checkCreatedUserData,
  checkLoginedUserData,
  protect,
  upload,
} = require("../../middlewares/users");
const router = express.Router();
router.patch("/", updateUserSub);

router.post("/register", checkCreatedUserData, registration);
router.post("/login", checkLoginedUserData, login);

router.use(protect);
router.patch("/avatars", upload.single("avatar"), updateAvatar);
router.post("/logout", logout);
router.get("/current", getCurrentUser);

module.exports = router;
