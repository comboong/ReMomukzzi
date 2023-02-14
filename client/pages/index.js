import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import IntroImageSet from '../components/IntroImageSet';
import MoreviewLoader from '../components/MoreviewLoader';
import ShopInfo from '../components/ShopInfo';
import KaKaoMap from '../components/KaKaoMap';
import FavoriteModal from '../components/FavoriteModal';

import { useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import {
  loadingAction,
  getShopInfo,
  firstGetAction,
  setRandomInt,
  setShuffleArr,
  setMapXY,
} from '../reducers';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useShuffledArray from '../hooks/useShuffledArray';
import useRandomInt from '../hooks/useRandomInt';

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

  const isLoading = useSelector(state => state.isLoading);
  const isFavoriteOn = useSelector(state => state.isFavoriteOn);
  const shopInfo = useSelector(state => state.shopInfo);
  const isFirstGet = useSelector(state => state.isFirstGet);
  const randomInt = useSelector(state => state.randomInt);
  const shuffleArr = useSelector(state => state.shuffleArr);

  function useHandleChange() {
    let n = useRandomInt(0, shopInfo.length);
    dispatch(setRandomInt(n));
    dispatch(setShuffleArr(useShuffledArray(shopInfo, n)));
    dispatch(
      setMapXY({
        x: shopInfo[n].shopInfo.y,
        y: shopInfo[n].shopInfo.x,
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
            page =>
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
            .then(res => {
              const n = useRandomInt(0, res.data.length);
              dispatch(getShopInfo(res.data));
              dispatch(setRandomInt(n));
              dispatch(
                setMapXY({
                  x: res.data[n].shopInfo.y,
                  y: res.data[n].shopInfo.x,
                })
              );
              dispatch(setShuffleArr(useShuffledArray(res.data, n)));
              dispatch(loadingAction());
              dispatch(firstGetAction());
            });
        } else {
          alert('GPS를 지원하지 않습니다');
        }
      } catch (error) {
        console.error(error);
        alert('위치 정보를 가져오는데 실패했습니다. 새로고침 해주세요.');
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

    if (localStorage.getItem('visited') === null) {
      localStorage.setItem('visited', JSON.stringify([]));
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
                <span
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontSize: 32,
                    fontWeight: 'bold',
                  }}
                >
                  {randomShopInfo.shopInfo.place_name}
                </span>
                어떠세요?
              </Title>
              <RandomButton>
                <button onClick={useHandleChange}>다른메뉴 추천받기</button>
              </RandomButton>
              <ImageCarousel imageInfo={randomShopInfo} />
              <Row>
                <Col xs={24} md={12}>
                  <ShopInfo shopInfo={randomShopInfo} />
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
