const { getCurrentUser } = require("./getCurrentUser");
const { login } = require("./login");
const { logout } = require("./logout");
const { registration } = require("./registration");
const { sendVerify } = require("./sendVerify");
const { updateAvatar } = require("./updateAvatar");
const { updateUserSub } = require("./updateUserSub");
const { verifyEmail } = require("./verifyEmail");
module.exports = {
  verifyEmail,
  sendVerify,
  updateAvatar,
  registration,
  login,
  logout,
  updateUserSub,
  getCurrentUser,
};
