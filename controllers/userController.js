
//Import the database models so we can access the User model
const db = require('../models');

//Get input validation
const validateRegisterInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller functions:
module.exports = {

    
        login: (req, res) => {
            // Form validation
            const { errors, isValid } = validateLoginInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const email = req.body.email;
            const password = req.body.password;
            // Find user by email
            User.findOne({ email }).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({ emailnotfound: "Email not found" });
                }
                // Check password
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            class: user.class
                        };
                        // Sign token
                        jwt.sign(
                            payload,
                            "cats got your tongue",
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res
                            .status(400)
                            .json({ passwordincorrect: "Password incorrect" });
                    }
                });
            });
        },
        register: (req, res) => {
            // Form validation
            const { errors, isValid } = validateRegisterInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            User.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    return res.status(400).json({ email: "Email already exists" });
                }
                const newUser = new User({
                    name: req.body.name,
                    class: req.body.class,
                    email: req.body.email,
                    password: req.body.password
                });
                // Hash out the password before putting it into the database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            });
        }
    }
