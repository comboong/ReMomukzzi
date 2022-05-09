const { user, bookmark, shop, shop_pic } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  console.log("login");

  const userInfo = await user.findOne({
    where: {
      user_id: req.body.user_id,
      password: req.body.password,
    },
  });

  if (!userInfo) {
    console.log(userInfo);
    res.status(400).json({ data: null, message: "not authorized" });
  } else {
    let payload = {
      user_id: userInfo.dataValues.user_id,
      email: userInfo.dataValues.email,
    };

    const access_Token = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "10h",
    });
    const refresh_Token = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "2days",
    });

    const bookmarkInfo = await bookmark.findAll({
      where: {
        user_id: userInfo.dataValues.user_id,
      },
    });

    const cookie = [];
    for (let i = 0; i < bookmarkInfo.length; i++) {
      const shopInfo = await shop.findOne({
        where: {
          id: bookmarkInfo[i].dataValues.shop_id,
        },
      });

      const shopPicInfo = await shop_pic.findOne({
        where: {
          shop_id: shopInfo.id,
        },
      });

      const obj = {
        id: shopInfo.id,
        shop_name: shopInfo.shop_name,
        genus: shopInfo.genus,
        location: shopInfo.location,
        pic_URL: shopPicInfo.pic_URL,
      };

      cookie.push(obj);
    }
    console.log(cookie);
    res.cookie("bookmark", JSON.stringify(cookie));
    res
      .cookie("refreshToken", refresh_Token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        message: "Login success!",
        data: {
          accessToken: access_Token,
          nickname: userInfo.dataValues.nickname,
        },
      });
  }
};
