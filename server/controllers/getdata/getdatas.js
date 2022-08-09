const { shop, shop_pic, menu } = require("../../models");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const wait =require("waait")

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
        answer.push(newshopinfo)
      }else{
        needCrwaling.push(i)
      }
    }
  }

  async function doCrawling(shopinfo){
    const browser = await puppeteer.launch({args:['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote'],headless:false});
  
    for (i of shopinfo){
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(0); 
      page.setExtraHTTPHeaders({
        'accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    })
      page.goto(i.place_url,{waitUntil:"domcontentloaded"})
    }
    
    let pagesCount = await browser.pages()
    console.log(pagesCount.length)
    
    await wait(8000);
    
    for (let i=1; i<pagesCount.length; i++){

      let photodatas = []; //이미지 크롤링 결과
      let menulist = []; //메뉴 정보 크롤링 결과
      let content = await pagesCount[i].content()
      const $ = cheerio.load(content);
      const photolists = $(
      "#mArticle > div.cont_photo > div.photo_area > ul >li"
      ).children("a");
      const menulists = $(
      "#mArticle > div.cont_menu > ul >li > div"
      ).children("span");
      const price = $(
      "#mArticle > div.cont_menu > ul > li > div "
      ).children("em.price_menu");

      for (let i = 0; i < photolists.length; i++) {
        let word =
            "https:" +
            photolists[i].attribs.style.slice(22, 55) +
            "R0x420/" +
            photolists[i].attribs.style.slice(64, -2);

        photodatas.push(word);
      }
      
      if (menulists.length === 0){
        menulist.push(["메뉴 없음", "가격 없음"])
      }else{
        for (let i = 0; i < menulists.length; i++) {
          if (price.length !== 0) {
              try {
              const somemenu = menulists[i].children[0].data;
              const eachprice = price[i].children[1].data;
              if (somemenu !== null){
                  menulist.push([somemenu, eachprice]);
              }
              } catch (err) {
              const somemenu = menulists[i].children[0].data;
              const eachprice = "가격 정보 없음"; //상품 가격 (가끔 가격이 없는 곳도 있음)
              if (somemenu !== null){
                  menulist.push([somemenu, eachprice]);
              }
              }
          } else {
              const somemenu = menulists[i].children[0].data;
              const eachprice = "가격 정보 없음"; //상품 가격 (가끔 가격이 없는 곳도 있음)
              // menulist[somemenu] = eachprice;
              if (somemenu !== null) {
              menulist.push([somemenu, eachprice]);
              }
          }
        }
      }

      let shopRetrun = {
        shopInfo : shopinfo[i-1],
        shopPics :  photodatas,
        shopMenus : menulist
      }

      saveLogic(shopRetrun)
      answer.push(shopRetrun)
    }


    browser.close()

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
  }


  async function main(){
    await checkInDB(req.body.data)

    try{
      if (needCrwaling.length > 0){
        await doCrawling(needCrwaling)
      }
    }catch(err){
      console.log(err)
    }finally{
      res.status(200).json(answer)
    }
  }

  main ()
}; 
