const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {
    //For the validator to let something through, there can't be any errors. Any errors are stored in this object
    //with the associated property and its error message. 
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name checks. Please put a name into the field.
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // Email checks

    //The email field must have text
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } //The text must be in an email format (ie abcd@notanactualemail.com)
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks

    //First, the password fields must be filled with text
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    //The password must be between 6 and 10 characters long
    if (!Validator.isLength(data.password, { min: 6, max: 10 })) {
        errors.password = "Password must be at least 6 characters, but no more than 10";
    }

    //And naturally, the passwords must match
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};