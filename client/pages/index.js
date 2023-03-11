import Header from "../components/Header";
import IntroImageSet from "../components/IntroImageSet";
import MoreviewLoader from "../components/MoreviewLoader";
import ShopInfo from "../components/ShopInfo";
import FavoriteModal from "../components/FavoriteModal";
import KaKaoMap from "../components/KaKaoMap";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";

import { useEffect } from "react";
import axios from "axios";
import { Col, Row } from "antd";
import {
  firstGetAction,
  getShopInfo,
  loadingAction,
  setMapXY,
  setRandomInt,
  setShuffleArr,
} from "../reducers";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useShuffledArray from "../hooks/useShuffledArray";
import useRandomInt from "../hooks/useRandomInt";

const Title = styled.div`
  display: flex;
  padding: 20px 0px 20px 0px;
  font-size: 24px;
  justify-content: center;
  align-items: center;

  & > span {
    padding: 0px 20px 0px 20px;
    font-size: 32px;
    font-weight: bold;
  }

  @media (max-width: 600px) {
    font-size: 18px;

    & > span {
      font-size: 28px;
    }
  }

  @media (max-width: 450px) {
    font-size: 15px;

    & > span {
      font-size: 25px;
    }
  }

  @media (max-width: 380px) {
    font-size: 13px;

    & > span {
      font-size: 23px;
    }
  }

  @media (max-width: 300px) {
    font-size: 10px;

    & > span {
      font-size: 15px;
    }
  }
`;

const RandomButton = styled.div`
  text-align: center;

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

const Invisible = styled.div`
  @media (max-width: 450px) {
    display: none;
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

  function useHandleChange() {
    let n = useRandomInt(0, shopInfo.length);
    dispatch(setRandomInt(n));
    dispatch(setShuffleArr(useShuffledArray(shopInfo, n)));
    dispatch(
      setMapXY({
        x: shopInfo[n]?.shopInfo?.y,
        y: shopInfo[n]?.shopInfo?.x,
      })
    );
  }

  useEffect(() => {
    async function getLocation() {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: Infinity,
            });
          });

          const kakaoShopInfo = Array.from({ length: 4 }, (_, i) => i + 1).map(
            (page) =>
              axios.get(
                `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=${page}&size=15&sort=accuracy&x=${position.coords.longitude}&y=${position.coords.latitude}&radius=1000`,
                {
                  headers: {
                    Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION_KEY,
                  },
                }
              )
          );

          const results = await axios.all(kakaoShopInfo);

          const shopInfoForServer = results.reduce(
            (acc, result) => [...acc, ...result.data.documents],
            []
          );

          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/data`,
              { data: shopInfoForServer },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              const n = useRandomInt(0, res.data.length);
              dispatch(getShopInfo(res?.data));
              dispatch(setRandomInt(n));
              dispatch(
                setMapXY({
                  x: res.data[n]?.shopInfo?.y ?? "x좌표",
                  y: res.data[n]?.shopInfo?.x ?? "y좌표",
                })
              );
              dispatch(setShuffleArr(useShuffledArray(res.data, n)));
              dispatch(loadingAction());
              dispatch(firstGetAction());
            });
        } else {
          alert("GPS를 지원하지 않습니다");
        }
      } catch (error) {
        console.error(error);
        alert("위치 정보를 가져오는데 실패했습니다. 새로고침 해주세요.");
      }
    }

    if (!isFirstGet) {
      getLocation();
    } else {
      dispatch(
        setMapXY({
          x: shopInfo[randomInt]?.shopInfo?.y,
          y: shopInfo[randomInt]?.shopInfo?.x,
        })
      );
    }

    if (localStorage.getItem("visited") === null) {
      localStorage.setItem("visited", JSON.stringify([]));
    }
  }, []);

  const randomShopInfo = shopInfo[randomInt];

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
                <span>{randomShopInfo?.shopInfo?.place_name}</span>
                어떠세요?
              </Title>
              <RandomButton>
                <button onClick={useHandleChange}>다른메뉴 추천받기</button>
              </RandomButton>

              <ImageCarousel imageInfo={randomShopInfo} />

              <Row>
                <Col
                  xs={24}
                  md={12}
                  style={{
                    paddingTop: "30px",
                  }}
                >
                  <ShopInfo shopInfo={randomShopInfo} />
                </Col>
                <Col
                  xs={22}
                  md={10}
                  offset={1}
                  style={{
                    paddingTop: "30px",
                  }}
                >
                  <KaKaoMap />
                </Col>
              </Row>
            </Col>
            <Col lg={24} xl={8}>
              <Invisible>
                <IntroImageSet imageInfo={shuffleArr} />
              </Invisible>
            </Col>
          </Row>

          <Footer />
        </>
      ) : (
        <>
          <Header />
          <MoreviewLoader />
        </>
      )}
    </>
  );
};

export default Home;