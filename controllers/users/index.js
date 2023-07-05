const { getCurrentUser } = require("./getCurrentUser");
const { login } = require("./login");
const { logout } = require("./logout");
const { registration } = require("./registration");
const { updateAvatar } = require("./updateAvatar");
const { updateUserSub } = require("./updateUserSub");
module.exports = {
  updateAvatar,
  registration,
  login,
  logout,
  updateUserSub,
  getCurrentUser,
};
