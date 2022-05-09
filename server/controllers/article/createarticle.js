const { article } = require('../../models');

module.exports = async (req, res) => {
    console.log('get articles')

    let payload = req.body

    article.create(payload).then(
        res.status(200).json({
            message : "article updated",
            payload : {payload}
        })
    )
}

