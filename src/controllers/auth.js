const admin = require("firebase-admin");
const { createUserProfile } = require("../services/firebase");

exports.renderSignup = (req, res) => {
  res.render("signup", { title: "Signup" });
};

exports.renderLogin = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.signup = async (req, res) => {
  const { email, password, displayName } = req.body;
  try {
    const user = await admin
      .auth()
      .createUser({ email, password, displayName });
    await createUserProfile(user);
    res.redirect("/auth/login");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    res.redirect(`/user/dashboard?uid=${user.uid}`);
  } catch (error) {
    res.status(400).send("Invalid email");
  }
};

exports.logout = (req, res) => {
  res.redirect("/auth/login");
};
