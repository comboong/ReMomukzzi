const { article } = require('../../models');

module.exports = async (req, res) => {
    console.log('delete article')

    const targetarticle = await article.findOne({
        where : {
            id: req.body.article_id,
        }
    })


    if (targetarticle){

        article.destroy({
            where : {
                id : req.body.article_id
            }
        }).then(res.status(200).json({message : `article id ${req.body.article_id} has deleted!`}))
        
    }else{
        res.status(400).json({message : "no aricle"})}



}
