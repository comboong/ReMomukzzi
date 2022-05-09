const {
  shop,
  menu,
  shop_pic,
  shop_tag,
  tag,
  review,
  review_pic,
} = require("../../models");

module.exports = async (req, res) => {
  // body에 topic code가 'total_review' 면
  // 리뷰가 가장 많은순으로 8개 데이터 전송

  // body에 topic code가 'star_avg' 면
  // 평점이 가장 높은 순으로 8개 데이터 전송

  if (req.params.topic === "total_review") {
    const shopInfo = await shop.findAll({
      limit: 8,
      order: [["total_review", "DESC"]],
    });

    if (!shopInfo || shopInfo.length === 0) {
      res.status(400).send({ message: "shop is not exist" });
    } else {
      const shopPicInfos = [];
      // console.log(shopInfo);
      for (let i = 0; i < Object.keys(shopInfo).length; i++) {
        const shopPicInfo = await shop_pic.findOne({
          where: {
            shop_id: shopInfo[i].dataValues.id,
          },
        });
        // console.log(shopPicInfo);
        shopPicInfos.push(shopPicInfo);
      }
      res.status(200).send({ data: { shopInfo, shopPicInfos } });
    }
  } else if (req.body.topic_code === "star_avg") {
    
  }
};
