const User = require("../../models/usersModel");
const { catchAsync } = require("../../utils");
const path = require("path");
const Jimp = require("jimp");
const { unlink } = require("fs/promises");
exports.updateAvatar = catchAsync(async (req, res) => {
  const { filename } = req.file;
  const { id } = req.user;

  if (!filename) res.status(401).json({ message: "File is require!" });

  const newFileName = `${id}_${filename}`;
  const tmpPath = path.resolve(__dirname, "../../tmp", filename);
  console.log(tmpPath);
  const avatarPath = path.resolve(__dirname, "../../public/avatars", newFileName);
  console.log(avatarPath);

  const image = await Jimp.read(tmpPath);
  await image.resize(250, 250).quality(60).writeAsync(avatarPath);
  await unlink(tmpPath);
  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

  res.status(200).json({
    avatarURL,
  });
});
