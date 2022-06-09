const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { RefreshToken } = require("../models/refreshTokenModel");
const Company = require("../models/companyModel");

/* ********************************************************* */

// secret key
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH = process.env.REFFRESH_TOKEN_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// handle Errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", email: "", password: "" };

  // Duplicate error
  if (err.code === 11000) {
    errors.email = "Email or Username is already registred";
    errors.username = "Email or Username is already registred";
    return errors;
  }

  // Validation Errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// Create a token
const createToken = (id, username, email, role,password , company) => {
  return jwt.sign({ id, username, email, role,password ,company }, SECRET_KEY, {
    expiresIn: "24h",
  });
};

/* ********************************************************* */

/*  Register  */

exports.register = async (req, res) => {
  const { username, email, password, role , company } = req.body;
  try {
    // Create user
    const user = await User.create({ username, email, password, role, company});

    // Generate token
    const token = createToken(user._id, user.username, user.email, user.role , user.password , user.company   );
    /* res.cookie("access_token", token, {
      httpOnly: true,
      JWT_EXPIRES_IN: JWT_EXPIRES_IN * 1000,
    }); */

    res.status(201).json({ Register: "success", user: user, token });
    // console.log({ status: 'success', user: user, EXPIRES_IN: JWT_EXPIRES_IN + " day" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
    console.log("message : ",errors.message);
  }
};

/*  Login  */

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    // Generate token
    const token = createToken(user._id, user.username,  user.email, user.role , user.password , user.company  );

    res.status(200).json({ login: "Seccess", user, token  });
  } catch (err) {
    //const errors = handleErrors(err);
    res.status(400).json({ err: err.message });
  }
};




