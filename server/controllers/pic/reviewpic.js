const { review_pic } = require("../../models");
var multer = require("multer");

module.exports = {
  post: async (req, res) => {
    // console.log("review pic create!")
    // console.log(req.files)
    // console.log(req.body)
    let payload = req.body;
    // review_pic.create(payload).then(
    //     res.status(200).json({
    //         message : "review pics uploaded",
    //         payload : {payload}
    //         })
    //     )
  },

  delete: async (req, res) => {
    console.log("review pic delete!");

    let payload = req.body;

    review_pic
      .destroy({
        where: {
          review_id: req.body.review_id,
          pic_URL: req.body.pic_URL,
        },
      })
      .then(
        res
          .status(200)
          .json({ message: "review pic deleted!", payload: { payload } })
      );
  },

  patch: async (req, res) => {
    console.log("review pic patch!");

    const newreivewpic = req.body;

    await review_pic
      .update(newreivewpic, { where: { id: newreivewpic.review_id } })
      .then(async () => {
        const changed = await review_pic.findOne({
          where: {
            id: newreivewpic.review_id,
          },
        });
        res.status(200).json({
          message: "done!",
          data: { changed },
        });
      });
  },
};
