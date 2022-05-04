import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import ShopInfo from "../components/ShopInfo";
import KaKaoMap from "../components/KaKaoMap";

import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [shopInfo, setShopInfo] = useState([]);

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
                        `${process.env.NEXT_PUBLIC_SERVER_URL}:4000/data`,
                        { data: res },
                        {
                          withCredentials: true,
                        }
                      )
                      .then((res) => {
                        console.log(res.data.data.result);
                        setShopInfo(res.data.data.result);
                        setLoading(true);
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
    getLocation();
  }, []);

  return (
    <>
      {loading && (
        <>
          <Header />
          <ImageCarousel imageInfo={shopInfo} />
          <Row>
            <Col cs={24} md={12}>
              <ShopInfo shopInfo={shopInfo} />
            </Col>
            <Col cs={24} md={12}>
              <KaKaoMap Info={shopInfo} />
            </Col>
          </Row>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
