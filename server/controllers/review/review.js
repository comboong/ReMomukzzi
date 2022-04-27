const { review, user,shop } = require('../../models');

module.exports = async (req, res) => {
    console.log('get reviews')

    console.log(req.query.shopid)
    console.log(req.query.userid)

    
    const shopid = req.query.shopid
    const userid = req.query.userid

    if (shopid){
        const shopreviews = await review.findAll(
            {include:[{
                model : shop,
                attributes : ['shop_name']
            }],
            where : 
                {shop_id : shopid}})
        
        res.status(200).json({
            message : "shop review called",
            data : {
                shopreviews
            }
        })
    } else if (userid){
        const userreviews = await review.findAll(
            {include:[{
                model : user,
                attributes : ['user_id']
            }],
                where : 
                {user_id : userid}})
        
        res.status(200).json({
            message : "user review called",
            data : {
                userreviews
            }
        })
    } else {
        res.status(400).json({
            message : "please enter query"
        })
    }


    // await users.update(newuserinfo, {where : {userid : newuserinfo.userid}})
    // .then(res.status(200).json("done!"))
}
