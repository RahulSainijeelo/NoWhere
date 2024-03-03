const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");

module.exports.postSignUp = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      req.flash("failure", "Username is already taken");
      return res.redirect("/listings");
    }
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Sign up successfull");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/listings");
  }
};

module.exports.postLogin = async (req, res) => {
  req.flash("success", "Welcome");
  res.redirect("/listings");
};


module.exports.getLogout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout successfully");
    res.redirect("/listings");
  });
};
