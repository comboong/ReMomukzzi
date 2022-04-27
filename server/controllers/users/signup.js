const { user } = require("../../models");
require("dotenv").config();

module.exports = async (req, res) => {
  const userInfo = await user.findOne({
    where: {
      user_id: req.body.userid,
    },
  });

  if (!userInfo) {
    user
      .create({
        user_id: req.body.userid,
        password: req.body.password,
        nickname: req.body.nickname,
        email: req.body.email,
        oauth: false
      })
      .then((response) => {
        res.status(201).send({ message: "created" });
      })
      .catch((err) => {
        throw err;
      });
  } else {
    res.status(226).send({ message: "exist" });
  }
};

