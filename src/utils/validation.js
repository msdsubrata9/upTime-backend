const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is invalid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditProfileFields = (req) => {
  const nonAllowedFieldsForEditProfile = ["password"];
  const isFieldsAllowedEdit = Object.keys(req.body).every(
    (field) => !nonAllowedFieldsForEditProfile.includes(field)
  );
  return isFieldsAllowedEdit;
};

module.exports = {
  validateSignupData,
  validateEditProfileFields,
};
