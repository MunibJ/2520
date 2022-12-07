let passport = require("passport");
let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },
//Things to ensure:

// - Logging in with the credentials of a registered user ***should*** create a session and redirect you to the reminders page.
// - The reminders page should ***not*** be accessibl e to any user who is **not logged in.**
  loginSubmit: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res, next);
  },

  registerSubmit: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let user = database.userModel.findOne({
      username: username,
    });
    if (user) {
      res.redirect("/register");
    }
    database.userModel.create({
      username: username,
      password: password,
    });
    res.redirect("/login");
  },
  };
module.exports = authController;
