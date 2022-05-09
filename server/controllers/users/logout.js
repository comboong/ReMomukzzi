const { user } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log("logout!");

  res.clearCookie("bookmark");
  res.clearCookie("refreshToken");
  res.status(200).send({ message: "logout success" });
};
