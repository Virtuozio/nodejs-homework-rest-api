const Joi = require("joi");
exports.verifyValidator = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
}).messages({
  "string.email": "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
});
