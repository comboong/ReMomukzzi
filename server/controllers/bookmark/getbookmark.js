const {
    shop,
    menu,
    shop_pic,
    shop_tag,
    tag,
    review,
    review_pic,
    user,
    bookmark,
  } = require("../../models");
  const userinfo = require("../users/userinfo");
  const jwt = require("jsonwebtoken");
  const dotenv = require("dotenv");

  dotenv.config();

  module.exports = async (req, res) => {
    if (req.headers.authorization === null) {
      return res.status(203).send({ message: "not authorized" });
    }
    const payload = jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_SECRET
    );
    // console.log(payload);

    if (!payload) {
      return res.send({ message: "not authorizesd" });
    } else {
      const userInfo = await user.findOne({
        where: {
          user_id: payload.user_id,
        },
      });
      // console.log(userInfo);
      if (!userInfo) {
        res.send({ message: "not authorized" });
      } else {
        if (!req.body.bookmark) {
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
 if (!shopInfo) {
} else {
    console.log("098sd7f9sd87f", shopInfo.id);
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
      star_avg: shopInfo.star_avg,
  };

  cookie.push(obj);
  }
}

res
  .status(200)
  .send({ bookmark : cookie });
}
};
}
}
