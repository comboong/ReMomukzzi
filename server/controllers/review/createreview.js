const { review, shop, user,review_pic } = require('../../models');
const Sequelize = require('sequelize');
const jwt = require("jsonwebtoken");
const { end } = require('cheerio/lib/api/traversing');

module.exports = async (req, res) => {
    console.log('create review')
    console.log(Object.keys(req))
    console.log(req.body)
    console.log(req.files)
    
    const newreview = req.body
    const newreviewpic = req.files
    const logininfo = req.headers.authorization;
    let data 

    console.log(logininfo)

    if (logininfo) {
        const token = logininfo.split(" ")[1];
        data = jwt.verify(logininfo, "1234")
    } else {
        res.status(400).json({
            message : "token reuired!"
        })

        return
    }

// 유저 아이디는 토큰으로 오게된다.

    targetuser = await user.findOne({
        where : {
            user_id : data.user_id
        }
    })

    console.log(targetuser.id)

    const reviewpayload = await {
        user_id : targetuser.id,
        shop_id : req.body.shop_id,
        comment : req.body.comment,
        star : req.body.star
    }

    // console.log(reviewpayload)
    
    review.create(reviewpayload).then( async (newone)=> { 

            const averagestar = await review.findAll({
                where : {
                    shop_id : newreview.shop_id
                },
                attributes : 
                    ['shop_id',[Sequelize.fn('AVG', Sequelize.col('star')), 'star_avg']],
                group: 'shop_id'
            })

            const star_avg = averagestar[0].dataValues.star_avg


            const totalreview = await review.findAll({
                where : {
                    shop_id : newreview.shop_id
                },
                attributes : 
                    ['shop_id',[Sequelize.fn('COUNT', Sequelize.col('star')), 'totalreview']],
                group: 'shop_id'
            })

            const totalrev = await totalreview[0].dataValues.totalreview


            const userreview = await review.findAll({
                where : {
                    user_id : reviewpayload.user_id
                },
                attributes : 
                    ['user_id',[Sequelize.fn('COUNT', Sequelize.col('star')), 'totalreviewbyuser']],
                group: 'user_id'
            })

            const userreviewcount = userreview[0].dataValues.totalreviewbyuser


            await shop.update({star_avg : star_avg, total_review : totalrev}, {where : {id : newreview.shop_id}}) 
            await user.update({total_review : userreviewcount}, {where : {id : reviewpayload.user_id}}) 

              //리뷰 사진 올리는 로직

            for(let i =0; i < newreviewpic.length; i++){
                const payload = {
                    review_id : newone.dataValues.id, 
                    pic_URL : newreviewpic[i].location }

                review_pic.create(payload)
            }
        }).then(
            res.status(200).json({
                message : "new review updated!",
                data : {newreview}
            }))

    } 
    
    