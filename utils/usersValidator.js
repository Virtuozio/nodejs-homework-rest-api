const Joi = require("joi");

const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createUserDataValidator = (data) => {
  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().regex(PASSWD_REGEX).required(),
      email: Joi.string().email().required(),
    })
    .messages({
      "string.email": "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
      "string.pattern.base":
        "Field 'password' should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and has a length between 8 and 128 characters",
    })
    .validate(data);
};

exports.updateUserDataValidator = (data) => {
  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      subscription: Joi.string().required(),
    })
    .validate(data);
};
