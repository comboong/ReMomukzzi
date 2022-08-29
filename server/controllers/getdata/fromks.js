const { shop, shop_pic, menu } = require("../../models");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const wait =require("waait");
const axios = require("axios");
const { shopinfo } = require("..");

process.setMaxListeners(0);

module.exports = async (req, res) => {
  let answer = []
  let needCrwaling = []

  async function checkInDB(shopInfoReq){
    for(i of shopInfoReq){
      const newshopinfo = await shop.findOne({
        where: {
            shop_name: i.place_name,
            location: i.road_address_name,
        },
        include:[
          {
            model : shop_pic,
            required: true,
            attributes: ["pic_URL"]
          },
          {
            model : menu,
            required: true,
            attributes: ["menu_name","price"]
          }
        ]
      })

      if(newshopinfo){
        let shopPics = []
        let shopMenus = []
        let shopId = newshopinfo.id
        i.id = shopId
  
      for (pic in newshopinfo.shop_pics){
        shopPics.push(newshopinfo.shop_pics[pic].dataValues.pic_URL)
      }

      for (m in newshopinfo.menus){
        shopMenus.push([newshopinfo.menus[m].dataValues.menu_name, newshopinfo.menus[m].dataValues.price])
      }


      let shopReturn = {
        shopInfo : i,
        shopPics :  shopPics,
        shopMenus : shopMenus
      }

      if(shopReturn.shopPics.length !== 0){
        answer.push(shopReturn)
      }
        
      }else{
        needCrwaling.push(i)
      }
    }
  }


  async function doCrawling(shopinfos){
    
    // for(i of shopinfos){
    //     let photodatas = []
    //     console.log(`https://place.map.kakao.com/main/v/${i.id}`)
    //     let data = await axios.get(`https://place.map.kakao.com/main/v/${i.id}`)
    //     for (shops of data.data.blogReview.list){
    //         for (photo of shops.photoList){
    //             photodatas.push(photo.orgurl)
    //         }
    //     }
    //     console.log(photodatas)
    // }

    let data = await axios.get(`https://place.map.kakao.com/main/v/25550206`)
        console.log(data.data.blogReview.list)
        for (shop of data.data.blogReview.list){
            console.log(shop)
            // for (photo of shops.photoList){
            //    console.log(photo)
            // }
        }
  }

    async function saveLogic(shopinfo){
          await shop.create({
                shop_name: shopinfo.shopInfo.place_name,
                genus: shopinfo.shopInfo.category_name.split(">")[1],
                location: shopinfo.shopInfo.road_address_name,
                work_time: "9:00 ~ 22:00",
                map_id: shopinfo.shopInfo.id,
                x: shopinfo.shopInfo.x,
                y: shopinfo.shopInfo.y,
                status : true
                });
          
          // 저장한 기본 정보의 음식점 id 가져오기
          const newshopinfo = await shop.findOne({
          where: {
              shop_name: shopinfo.shopInfo.place_name,
              location: shopinfo.shopInfo.road_address_name,
          },
          });
          
          const shopid = newshopinfo.id;
      
          //사진 저장
          for (i of shopinfo.shopPics) {
            await shop_pic.create({
                shop_id: shopid,
                pic_URL: i,
            });
          }
      
          // 메뉴 저장
          for (i of shopinfo.shopMenus) {
          const menu_name = i[0];
          const price_list = i[1];
            if (menu_name !== undefined && menu_name !== null) {
                await menu.create({
                shop_id: shopid,
                menu_name: menu_name,
                price: price_list,
                });
            }
          }

        return shopid
    }
  

  async function main(){
    // await checkInDB(req.body.data)
    await doCrawling(req.body.data)
    // try{
    //   if (needCrwaling.length > 0){
    //     await doCrawling(needCrwaling)
    //   }
    // }catch(err){
    //   console.log(err)
    // }finally{
    //   res.status(200).json(answer)
    // }
  }

  main ()
}; 
