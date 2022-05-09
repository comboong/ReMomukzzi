const { article } = require('../../models');

module.exports = async (req, res) => {
    console.log('patch article')

    const newarticle = req.body

    await article.update(newarticle, {where : {id : newarticle.article_id}}
    ).then(async ()=> { 
        const changed = await article.findOne({
        where : {
            id : newarticle.article_id
        }})
        res.status(200).json({
            message : "done!",
            data : {changed}
        })
    }
    )
}