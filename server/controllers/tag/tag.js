const { tag } = require('../../models');

module.exports = {
    post : async (req, res) => {
        console.log("new tag upload")
        let payload = req.body
        tag.create(payload).then(
            res.status(200).json({
                message : "new tag uploaded",
                payload : {payload}
                })
            )
        },
    
    delete : async (req, res) => {
        console.log("review pic delete!")

        let payload = req.body

        tag.destroy({
                where : {
                    tag : req.body.tag,
                }
            }).then(res.status(200).json({message : "tag deleted!", payload : {payload}}))
        },

    patch : async (req, res) => {
        console.log("tag patch!")

        const newtag = req.body

        await tag.update(newtag, {where : {id : newtag.tag}}
        ).then(async ()=> { 
            const changed = await tag.findOne({
            where : {
                id : newtag.tag
            }})
            res.status(200).json({
                message : "done!",
                data : {changed}
            })
        }
        )
        }
}

