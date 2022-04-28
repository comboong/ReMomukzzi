const { article } = require('../../models');

module.exports = async (req, res) => {
    console.log('get articles')


    const targetarticle = await article.findOne({
    where: {
        id: req.params.article_id,
    },
    });

    console.log(targetarticle)

    res.status(200).json({
        message : "article called!",
        data : {targetarticle}
        }
    )
}

