const { review } = require('../../models');

module.exports = async (req, res) => {
    console.log('changeinfo')

    const newreview = req.body

    await review.update(newreview, {where : {id : newreview.review_id}}
    ).then(async ()=> { 
        const changed = await review.findOne({
        where : {
            id : newreview.review_id
        }})
        res.status(200).json({
            message : "review id " +  newreview.review_id + "has patched!",
            data : {changed}
        })
    }
    )
}

