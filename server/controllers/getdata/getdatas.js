const { shop, shop_pic, menu } = require("../../models");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const { data } = require("cheerio/lib/api/attributes");
const axios = require("axios");

process.setMaxListeners(0);

module.exports = async (req, res) => {
  // let address = req.body.road_address_name;
  let address = undefined;
  let crawling = []; // 크롤링 해야할 객체
  let database = []; // 데이터베이스에 있는 객체
  let result = []; // 최종 결과를 담을 객체
  // console.log(req.body);

  console.log("req.body.data.length " + req.body.data.length)

  for (let i = 0; i < req.body.data.length; i++) {
    // 데이터 베이스에 있는지 검증

    const shopinfo = await shop.findOne({
      where: {
        location: req.body.data[i].road_address_name,
      },
    });
    
    if (shopinfo && shopinfo.dataValues.status === true) {
      console.log("from database");
      let photodatas = []; //이미지 크롤링 결과
      let menulist = []; //메뉴 정보 크롤링 결과

      const shopid = shopinfo.id;

      const shoppic = await shop_pic.findAll({
        where: {
          shop_id: shopid,
        },
      });

      for (let i = 0; i < shoppic.length; i++) {
        photodatas.push(shoppic[i].pic_URL);
      }

      const menu_list = await menu.findAll({
        where: {
          shop_id: shopid,
        },
      });

      for (let i = 0; i < menu_list.length; i++) {
        menulist.push([menu_list[i].menu_name, menu_list[i].price]);
      }

      if (photodatas.length !== 0 && menulist.length !== 0) {
        result.push({
          shopinfo: {
            shop_id: shopid,
            shopinfo: req.body.data[i],
          },
          shoppic: {
            shop_id: shopid,
            photodatas,
          },
          menulist: {
            shop_id: shopid,
            menulist,
          },
        });
      }

    } else {
      
      console.log("crawling needed!");

      crawling.push(req.body.data[i])
    }
  }

  console.log("==============================================")
  console.log("req.body.data.length " + req.body.data.length)
  console.log("result.length " + result.length)
  console.log("crawling.length " + crawling.length)
  console.log("==============================================")

if(result.length < 10){
  let needed = crawling.slice(0, 10-result.length)
  console.log("==============================================")
  console.log("needed " + needed.length)
  console.log("==============================================")


  console.log("crawling start!");

  for (let i=0; i < needed.length; i++){
        let photodatas = []; //이미지 크롤링 결과
        let menulist = []; //메뉴 정보 크롤링 결과
        let genus = needed[i].category_name.split(" > ")[1];

        // 크롤링시작;;

        const browser = await puppeteer.launch({args:['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote']});
        const page = await browser.newPage();
        
        await page.setViewport({
        width: 1920,
        height: 1080,
        });

        await page.goto(needed[i].place_url,{waitUntil:"networkidle0"}
        );

        await scrollPageToBottom(page, {
            size: 500,
        });
        
        //await page.waitForSelector("#mArticle > div.cont_menu > ul > li > div")

        let content = await page.content(needed[i].place_url);

        const $ = await cheerio.load(content);
        const photolists = await $(
        "#mArticle > div.cont_photo > div.photo_area > ul >li"
        ).children("a");
        const menulists = await $(
        "#mArticle > div.cont_menu > ul >li > div"
        ).children("span");
        const price = await $(
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

        await browser.close();

        console.log("END!!!!!!!!!")

        //크롤링 종료!

        // 음식점 기본 정보 저장
        await shop.create({
        shop_name: needed[i].place_name,
        genus: genus,
        location: needed[i].road_address_name,
        work_time: "9:00 ~ 21:00",
        map_id: needed[i].id,
        x: needed[i].x,
        y: needed[i].y,
        status : true
        });

        // 저장한 기본 정보의 음식점 id 가져오기
        const newshopinfo = await shop.findOne({
        where: {
            shop_name: needed[i].place_name,
            location: needed[i].road_address_name,
        },
        });

        const shopid = newshopinfo.id;

        //사진 저장
        for (let i = 0; i < photodatas.length; i++) {
        await shop_pic.create({
            shop_id: shopid,
            pic_URL: photodatas[i],
        });
        }

        // 메뉴 저장
        for (let i = 0; i < menulist.length; i++) {
        const menu_name = menulist[i][0];
        const price_list = menulist[i][1];
          if (menu_name !== undefined && menu_name !== null) {
              await menu.create({
              shop_id: shopid,
              menu_name: menu_name,
              price: price_list,
              });
          }
        }

        //err check
        const checkerrpic = await shop_pic.findOne({
        where: {
            shop_id: shopid,
        },
        });

        const checkerrmenu = await menu.findOne({
          where: {
              shop_id: shopid,
          },
          });

        try {
        if (checkerrpic.dataValues.pic_URL === "" || checkerrmenu.dataValues.menu === "") {
          console.log("ERR!! destroy!!")
          await shop.update({
            status:false
          },{
            where: {
                id: shopid,
            },
          });
        }
        } catch (err) {
          console.log("ERR!! destroy!!")
          await shop.update({
            status:false
          },{
            where: {
              id: shopid,
            },
        });
        }

        if (photodatas.length !== 0 && menulist.length !== 0) {
          result.push({
              shopinfo: {
              shop_id: shopid,
              shopinfo: needed[i],
              },
              shoppic: {
              shop_id: shopid,
              photodatas,
              },
              menulist: {
              shop_id: shopid,
              menulist,
              }
            }
          );
        }
  }
}

  console.log(result.length)
  res.status(200).json({
    message: "shopinfo crawling",
    data: {
      result,
    },
  });

  console.log("everything done!")


//계속 크롤링 하기

for (let i=0; i < crawling.length; i++){
  let photodatas = []; //이미지 크롤링 결과
  let menulist = []; //메뉴 정보 크롤링 결과
  let genus = crawling[i].category_name.split(" > ")[1];

  // 크롤링시작;;
  const shopinfo = await shop.findOne({
    where: {
      location: req.body.data[i].road_address_name,
    },
  });

  if (!shopinfo) {
  const browser = await puppeteer.launch({args:['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote']});
  const page = await browser.newPage();
  
  await page.setViewport({
  width: 1920,
  height: 1080,
  });

  await page.goto(crawling[i].place_url,{waitUntil:"networkidle0"}
  );

  await scrollPageToBottom(page, {
      size: 500,
  });
  
  //await page.waitForSelector("#mArticle > div.cont_menu > ul > li > div")

  let content = await page.content(crawling[i].place_url);

  const $ = await cheerio.load(content);
  const photolists = await $(
  "#mArticle > div.cont_photo > div.photo_area > ul >li"
  ).children("a");
  const menulists = await $(
  "#mArticle > div.cont_menu > ul >li > div"
  ).children("span");
  const price = await $(
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

  await browser.close();

  console.log("END!!!!!!!!!")

  //크롤링 종료!

  // 음식점 기본 정보 저장
  await shop.create({
  shop_name: crawling[i].place_name,
  genus: genus,
  location: crawling[i].road_address_name,
  work_time: "9:00 ~ 21:00",
  map_id: crawling[i].id,
  x: crawling[i].x,
  y: crawling[i].y,
  status : true
  });

  // 저장한 기본 정보의 음식점 id 가져오기
  const newshopinfo = await shop.findOne({
  where: {
      shop_name: crawling[i].place_name,
      location: crawling[i].road_address_name,
  },
  });

  const shopid = newshopinfo.id;

  //사진 저장
  for (let i = 0; i < photodatas.length; i++) {
  await shop_pic.create({
      shop_id: shopid,
      pic_URL: photodatas[i],
  });
  }

  // 메뉴 저장
  for (let i = 0; i < menulist.length; i++) {
  const menu_name = menulist[i][0];
  const price_list = menulist[i][1];
    if (menu_name !== undefined && menu_name !== null) {
        await menu.create({
        shop_id: shopid,
        menu_name: menu_name,
        price: price_list,
        });
    }
  }

  //err check
  const checkerrpic = await shop_pic.findOne({
  where: {
      shop_id: shopid,
  },
  });

  const checkerrmenu = await menu.findOne({
    where: {
        shop_id: shopid,
    },
    });

  try {
    if (checkerrpic.dataValues.pic_URL === "" || checkerrmenu.dataValues.menu === "") {
        console.log("ERR!! destroy!!")
        await shop.update({
          status:false
        },{
          where: {
              id: shopid,
          },
        });;
      }
      } catch (err) {
        console.log("ERR!! destroy!!")
        await shop.update({
          status:false
        },{
          where: {
              id: shopid,
          },
        });;
      }
    }
  }
};
