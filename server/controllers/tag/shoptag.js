const { shop_tag, tag } = require('../../models');


module.exports = {
    get : async (req,res) =>{
        console.log("get tag list")
        const shop_id = req.query.shopid

        if(shop_id){
            const taglist = await shop_tag.findAll({
                include :[{
                    model : tag,
                    attributes : ['tag']
                }],
                where :{
                    shop_id : shop_id
                }
            })

            res.status(200).json({
                message : "shop tag list called",
                data : {
                    taglist
                }
            })

        }
    },

    post : async (req, res) => {
        console.log("new shop tag create!")
        let payload = req.body
        shop_tag.create(payload).then(
            res.status(200).json({
                message : "shop tag uploaded",
                payload : {payload}
                })
            )
        },
    
    delete : async (req, res) => {
        console.log("shop tag delete!")

        let payload = req.body

        shop_tag.destroy({
                where : {
                    shop_id : req.body.shop_id,
                    tag_id : req.body.tag_id
                }
            }).then(res.status(200).json({message : "shop tag deleted!", data : {payload}}))
        },

    patch : async (req, res) => {
        console.log("shop tag patch!")

        const newshoptag = req.body

        await shop_tag.update(newshoptag, {where : {id : newshoptag.shop_id}}
        ).then(async ()=> { 
            const changed = await shop_pic.findOne({
            where : {
                id : newshoptag.shop_id
            }})
            res.status(200).json({
                message : "shop tag patched!",
                data : {changed}
            })
        }
        )
    }
}

