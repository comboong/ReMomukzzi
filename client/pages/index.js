import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import ShopInfo from "../components/ShopInfo";
import KaKaoMap from "../components/KaKaoMap";

import { useCallback, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import {
  loadingAction,
  getShopInfo,
  firstGetAction,
  setRandomInt,
  setShuffleArr,
  setMapXY,
} from "../reducers";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import IntroImageSet from "../components/IntroImageSet";
import MoreviewLoader from "../components/MoreviewLoader";
import FavoriteModal from "../components/FavoriteModal";

const Title = styled.div`
  display: flex;
  padding: 20px 0px 20px 0px;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  min-width: 550px;
  & > span {
    padding: 0px 20px 0px 20px;
    font-size: 32px;
    font-weight: bold;
  }
`;

const RandomButton = styled.div`
  text-align: center;
  min-width: 550px;

  & > button {
    width: 200px;
    height: 50px;
    background: #ffba34;
    border-radius: 30px;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const isFavoriteOn = useSelector((state) => state.isFavoriteOn);
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
    dispatch(
      setMapXY({
        x: shopInfo[n].shopInfo.y,
        y: shopInfo[n].shopInfo.x,
      })
    );
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
                        let n = getRandomInt(0, res.data.length);

                        dispatch(getShopInfo(res.data));
                        dispatch(setRandomInt(n));
                        dispatch(
                          setMapXY({
                            x: res.data[n].shopInfo.y,
                            y: res.data[n].shopInfo.x,
                          })
                        );
                        dispatch(setShuffleArr(getShuffledArray(res.data, n)));
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
      dispatch(
        setMapXY({
          x: shopInfo[randomInt].shopInfo.y,
          y: shopInfo[randomInt].shopInfo.x,
        })
      );
    }
    if (localStorage.getItem("visited") === null) {
      localStorage.setItem("visited", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Header />
          {isFavoriteOn && <FavoriteModal />}

          <Row>
            <Col lg={24} xl={16}>
              <Title>
                오늘은
                <span
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontSize: 32,
                    fontWeight: "bold",
                  }}
                >
                  {shopInfo[randomInt].shopInfo.place_name}
                </span>
                어떠세요?
              </Title>
              <RandomButton>
                <button onClick={handleReset}>다른메뉴 추천받기</button>
              </RandomButton>
              <ImageCarousel imageInfo={shopInfo[randomInt]} />
              <Row>
                <Col xs={24} md={12}>
                  <ShopInfo shopInfo={shopInfo[randomInt]} />
                </Col>
                <Col xs={24} md={12}>
                  <div>
                    <KaKaoMap />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={24} xl={8}>
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
