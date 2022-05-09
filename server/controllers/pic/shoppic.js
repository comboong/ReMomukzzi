const { shop_pic } = require('../../models');

module.exports = {
    post : async (req, res) => {
        console.log("shop pic create!")
        let payload = req.body
        shop_pic.create(payload).then(
            res.status(200).json({
                message : "shop pics uploaded",
                payload : {payload}
                })
            )
        },
    
    delete : async (req, res) => {
        console.log("shop pic delete!")

        let payload = req.body

        shop_pic.destroy({
                where : {
                    shop_id : req.body.shop_id,
                    pic_URL : req.body.pic_URL
                }
            }).then(res.status(200).json({message : "shop pic deleted!", payload : {payload}}))
        },

    patch : async (req, res) => {
        console.log("shop pic patch!")

        const newshoppic = req.body

        await shop_pic.update(newshoppic, {where : {id : newshoppic.shop_id}}
        ).then(async ()=> { 
            const changed = await shop_pic.findOne({
            where : {
                id : newshoppic.shop_id
            }})
            res.status(200).json({
                message : "done!",
                data : {changed}
            })
        }
        )
        }
}

