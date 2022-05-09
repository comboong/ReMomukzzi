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
  console.log("817236498127364981237694812736948", req.body);
  const result = [];
  for (let i = 0; i < req.body.shop_ids.length; i++) {
    const reviewInfo = await review.findOne({
      where: {
        shop_id: req.body.shop_ids[i],
      },
    });
    if (!reviewInfo) {
      result.push([reviewInfo, null]);
    } else {
      const userInfo = await user.findOne({
        where: {
          id: reviewInfo.dataValues.user_id,
        },
      });

      result.push([reviewInfo, userInfo]);
    }
  }
  res.status(200).send({ data: result });
};
