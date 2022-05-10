import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import ShopInfo from "../components/ShopInfo";
import KaKaoMap from "../components/KaKaoMap";

import { useCallback, useEffect } from "react";
import axios from "axios";
import { Image, Row, Col, Button } from "antd";
import {
  loadingAction,
  getShopInfo,
  firstGetAction,
  setRandomInt,
  setShuffleArr,
} from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import IntroImageSet from "../components/IntroImageSet";
import MoreviewLoader from "../components/MoreviewLoader";

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const shopInfo = useSelector((state) => state.shopInfo);
  const isFirstGet = useSelector((state) => state.isFirstGet);
  const randomInt = useSelector((state) => state.randomInt);
  const shuffleArr = useSelector((state) => state.shuffleArr);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  function getShuffledArray(arr, n) {
    let newArr = [...arr];
    newArr.splice(n, 1);
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  }

  const handleReset = useCallback(() => {
    let n = getRandomInt(0, shopInfo.length);
    dispatch(setRandomInt(n));
    dispatch(setShuffleArr(getShuffledArray(shopInfo, n)));
  });

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            let temp = [];
            for (let i = 1; i < 4; i++) {
              axios
                .get(
                  `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=${i}&size=15&sort=accuracy&x=${position.coords.longitude}&y=${position.coords.latitude}&radius=2000`,
                  {
                    headers: {
                      Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION_KEY,
                    },
                  }
                )
                .then((res) => {
                  temp = [...temp, ...res.data.documents];
                  return temp;
                })
                .then((res) => {
                  console.log(res)
                  if (res.length === 45) {
                    axios
                      .post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/data`,
                        { data: res },
                        {
                          withCredentials: true,
                        }
                      )
                      .then((res) => {
                        let n = getRandomInt(0, res.data.data.result.length);
                        console.log(res.data.data.result);
                        dispatch(getShopInfo(res.data.data.result));
                        dispatch(setRandomInt(n));
                        dispatch(
                          setShuffleArr(
                            getShuffledArray(res.data.data.result, n)
                          )
                        );
                        dispatch(loadingAction());
                        dispatch(firstGetAction());
                      });
                  }
                });
            }
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다");
      }
    }
    if (!isFirstGet) {
      getLocation();
    } else {
      console.log("다시 불러오지 않음");
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Header />
          <Button onClick={handleReset}>다른메뉴추천받기</Button>
          <Row>
            <Col cs={24} md={16}>
              <ImageCarousel imageInfo={shopInfo[randomInt]} />
              <Row>
                <Col cs={24} md={12}>
                  <ShopInfo shopInfo={shopInfo[randomInt]} />
                </Col>
                <Col cs={24} md={12}>
                  <div>
                    <KaKaoMap Info={shopInfo[randomInt]} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col cs={24} md={8}>
              <IntroImageSet imageInfo={shuffleArr} />
            </Col>
          </Row>
          <Footer />
        </>
      ) : (
        <MoreviewLoader />
      )}
    </>
  );
};

export default Home;
