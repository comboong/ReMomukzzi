const {
  shop,
  menu,
  shop_pic,
  shop_tag,
  tag,
  review,
  review_pic,
  user,
} = require("../../models");
const userinfo = require("../users/userinfo");

module.exports = async (req, res) => {
  // console.log("get shopinfo");
  // console.log(req.params.map_id);
  const targetshop = await shop.findOne({
    include: [
      {
        model: menu,
        attributes: ["menu_name", "price"],
      },
      {
        model: shop_pic,
        attributes: ["pic_URL"],
      },
      {
        model: review,
        include: [
          {
            model: user,
            attributes: ["user_id","nickname"],
          },
          {
            model: review_pic,
            attributes: ["pic_URL"],
          },
        ],
        attributes: ["id", "user_id", "comment", "star","updatedAt"],
      },
    ],

    where: {
      id: req.params.shop_id,
    },
  });

  res.status(200).json({
    message: "shopinfo called!",
    data: { targetshop },
  });
};
