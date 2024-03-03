const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/user.js");
const passport = require("passport");

router.post("/signUp", wrapAsync(userController.postSignUp));

router.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('failure', 'Incorrect username or password'); // Set custom flash message
            return res.redirect('/listings');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash("success","Welcome");
            return res.redirect('/listings');
        });
    })(req, res, next);
}, userController.postLogin);

router.get("/logout", userController.getLogout)

module.exports = router;