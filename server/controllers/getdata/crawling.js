const { shop, shop_pic, menu } = require("../../models");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const axios = require('axios');

process.setMaxListeners(0);

module.exports = async (req, res) => {
  console.log("CRAWLING!!")
  const resp = await axios.get(
    'http://place.map.kakao.com/1503746075'
  );

  const $ = cheerio.load(resp.data); // ❷ HTML을 파싱하고 DOM 생성하기
  const photolists = $(
    "#mArticle > div.cont_photo > div.photo_area > ul >li"
    ).children("a");
  
  console.log(photolists.html())


};