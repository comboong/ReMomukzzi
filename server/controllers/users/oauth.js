const { user, bookmark, shop, shop_pic } = require("../../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { slice } = require("cheerio/lib/api/traversing");

module.exports = async (req, res) => {
  console.log("oauth login!!!!!!!!!!!!!!");
  const code = req.body.code;
  const REACT_APP_GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REACT_APP_GITHUB_CLIENT_SECRET =
    process.env.REACT_APP_GITHUB_CLIENT_SECRET;

  if (req.body.oauth === "KaKao") {
    axios //카카오
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${code}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(async (result) => {
        const id = result.data.id;
        const nickname = result.data.properties.nickname;
        const email = result.data.kakao_account.email;

        const oauthuser = await user.findOne({
          where: {
            user_id: id,
          },
        });

        if (oauthuser) {
          console.log("가입된 유저");

          const userInfo = await user.findOne({
            where: {
              user_id: id,
            },
          });

          let payload = {
            user_id: userInfo.dataValues.user_id,
            email: userInfo.dataValues.email,
          };

          const access_Token = jwt.sign(payload, "1234", { expiresIn: "10h" });
          const refresh_Token = jwt.sign(payload, "5678", {
            expiresIn: "2days",
          });

          console.log(nickname);
          const bookmarkInfo = await bookmark.findAll({
            where: {
              user_id: userInfo.dataValues.user_id,
            },
          });

          const cookie = [];
          for (let i = 0; i < bookmarkInfo.length; i++) {
            const shopInfo = await shop.findOne({
              where: {
                id: bookmarkInfo[i].dataValues.shop_id,
              },
            });
            const shopPicInfo = await shop_pic.findOne({
              where: {
                shop_id: shopInfo.id,
              },
            });

            const obj = {
              id: shopInfo.id,
              shop_name: shopInfo.shop_name,
              genus: shopInfo.genus,
              location: shopInfo.location,
              pic_URL: shopPicInfo.pic_URL,
            };

            cookie.push(obj);
          }

          res.cookie("bookmark", JSON.stringify(cookie));
          res
            .status(200)
            .cookie("refreshToken", refresh_Token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .json({
              message: "Login success!",
              data: {
                accessToken: access_Token,
                nickname: nickname,
                oauth: true,
              },
            });
        } else {
          console.log("신규 가입 유저");
          user.create({
            user_id: id,
            nickname: nickname,
            email: email,
            oauth: true,
          });

          const userInfo = await user.findOne({
            where: {
              user_id: id,
            },
          });

          let payload = {
            user_id: userInfo.dataValues.user_id,
            email: userInfo.dataValues.email,
          };

          const access_Token = jwt.sign(payload, "1234", { expiresIn: "10h" });
          const refresh_Token = jwt.sign(payload, "5678", {
            expiresIn: "2days",
          });

          console.log(payload);

          console.log(access_Token);

          const bookmarkInfo = await bookmark.findAll({
            where: {
              user_id: userInfo.dataValues.user_id,
            },
          });

          const cookie = [];
          for (let i = 0; i < bookmarkInfo.length; i++) {
            const shopInfo = await shop.findOne({
              where: {
                id: bookmarkInfo[i].dataValues.shop_id,
              },
            });
            const shopPicInfo = await shop_pic.findOne({
              where: {
                shop_id: shopInfo.id,
              },
            });

            const obj = {
              id: shopInfo.id,
              shop_name: shopInfo.shop_name,
              genus: shopInfo.genus,
              location: shopInfo.location,
              pic_URL: shopPicInfo.pic_URL,
            };

            cookie.push(obj);
          }

          res.cookie("bookmark", JSON.stringify(cookie));
          res
            .status(200)
            .cookie("refreshToken", refresh_Token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .json({
              message: "Login success!",
              data: {
                accessToken: access_Token,
                nickname: nickname,
                oauth: true,
              },
            });
        }
      })
      .catch((e) => {
        //오류 처리

        res.status(400).json({
          message: "Oauth login err",
        });
      });
  } else {
    axios //깃허브
      .post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: REACT_APP_GITHUB_CLIENT_ID,
          client_secret: REACT_APP_GITHUB_CLIENT_SECRET,

          code: code,
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result.data.access_token);

        axios
          .get("https://api.github.com/user", {
            headers: {
              Authorization: `Token ${result.data.access_token}`,
            },
          })
          .then(async (result) => {
            console.log("무언가 여기로 옴");
            console.log(result.data);
            console.log("끝");

            const id = result.data.id;

            let nickname;

            if (result.data.name) {
              nickname = result.data.name;
            } else {
              nickname = result.data.html_url.slice(
                19,
                result.data.html_url.length
              );
            }
            const email = result.data.url;

            console.log(
              id,
              result.data.html_url.slice(19, result.data.html_url.length),
              email
            );

            const oauthuser = await user.findOne({
              where: {
                user_id: id,
              },
            });

            if (oauthuser) {
              console.log("가입된 유저");
              const userInfo = await user.findOne({
                where: {
                  user_id: id,
                },
              });

              let payload = {
                user_id: userInfo.dataValues.user_id,
                email: userInfo.dataValues.email,
              };

              const access_Token = jwt.sign(payload, "1234", {
                expiresIn: "10h",
              });
              const refresh_Token = jwt.sign(payload, "5678", {
                expiresIn: "2days",
              });

              console.log(payload);

              console.log(access_Token);
              console.log("res 발송");
              const bookmarkInfo = await bookmark.findAll({
                where: {
                  user_id: userInfo.dataValues.user_id,
                },
              });

              const cookie = [];
              for (let i = 0; i < bookmarkInfo.length; i++) {
                const shopInfo = await shop.findOne({
                  where: {
                    id: bookmarkInfo[i].dataValues.shop_id,
                  },
                });
                const shopPicInfo = await shop_pic.findOne({
                  where: {
                    shop_id: shopInfo.id,
                  },
                });

                const obj = {
                  id: shopInfo.id,
                  shop_name: shopInfo.shop_name,
                  genus: shopInfo.genus,
                  location: shopInfo.location,
                  pic_URL: shopPicInfo.pic_URL,
                };

                cookie.push(obj);
              }

              res.cookie("bookmark", JSON.stringify(cookie));
              res
                .status(200)
                .cookie("refreshToken", refresh_Token, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "none",
                })
                .json({
                  message: "Login success!",
                  data: {
                    accessToken: access_Token,
                    nickname: userInfo.dataValues.nickname,
                    oauth: true,
                  },
                });
            } else {
              console.log("가입안된 유저");

              user.create({
                user_id: id,
                nickname: nickname,
                email: email,
                oauth: true,
              });

              const userInfo = await user.findOne({
                where: {
                  user_id: id,
                },
              });

              let payload = {
                user_id: userInfo.dataValues.user_id,
                email: userInfo.dataValues.email,
              };

              const access_Token = jwt.sign(payload, "1234", {
                expiresIn: "10h",
              });
              const refresh_Token = jwt.sign(payload, "5678", {
                expiresIn: "2days",
              });

              console.log(payload);

              console.log(access_Token);
              const bookmarkInfo = await bookmark.findAll({
                where: {
                  user_id: userInfo.dataValues.user_id,
                },
              });

              const cookie = [];
              for (let i = 0; i < bookmarkInfo.length; i++) {
                const shopInfo = await shop.findOne({
                  where: {
                    id: bookmarkInfo[i].dataValues.shop_id,
                  },
                });
                const shopPicInfo = await shop_pic.findOne({
                  where: {
                    shop_id: shopInfo.id,
                  },
                });

                const obj = {
                  id: shopInfo.id,
                  shop_name: shopInfo.shop_name,
                  genus: shopInfo.genus,
                  location: shopInfo.location,
                  pic_URL: shopPicInfo.pic_URL,
                };

                cookie.push(obj);
              }

              res.cookie("bookmark", JSON.stringify(cookie));
              res
                .status(200)
                .cookie("refreshToken", refresh_Token, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "none",
                })
                .json({
                  message: "Login success!",
                  data: {
                    accessToken: access_Token,
                    nickname: userInfo.dataValues.nickname,
                    oauth: true,
                  },
                });
            }
          })
          .then(console.log("인증절차 통과"))
          .catch((e) => {
            //오류 처리
            console.log("오류 발생")
            res.status(400).json({
              message: "Oauth login err",
            });
          });
      });
  }
};
