import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import KaKaoMap from "../../../components/KaKaoMap";
import ShopDetailInfo from "../../../components/ShopDetailInfo";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { StarOutlined, StarFilled } from "@ant-design/icons";

import Link from "next/link";
import { Image, Row, Col, Button } from "antd";
import axios from "axios";
import styled from "styled-components";
import { setMapXY } from "../../../reducers";
import { useState, useCallback, useEffect } from "react";
import ShopReviews from "../../../components/ShopReviews";
import { useRouter } from "next/router";
import FavoriteModal from "../../../components/FavoriteModal";

const ShopImages = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  overflow: auto;
  margin: 0 auto;
  border-bottom: 1px solid gainsboro;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Photo = styled(Image)`
  min-width: 300px;
  max-width: 300px;
  object-fit: fill;
`;

const ShopTitle = styled.div`
  display: flex;
`;

const shopdetail = ({ data, id }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isFavoriteOn = useSelector((state) => state.isFavoriteOn);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = useCallback(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark`,
        {
          headers: {
            Authorization: Cookies.get("accessToken"),
          },
          shop_id: id,
          bookmark: isFavorite,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (
          res.data.message === "add success" ||
          res.data.message === "remove success"
        ) {
        }
        setIsFavorite(!isFavorite);
      });
  });

  useEffect(() => {
    dispatch(setMapXY({ x: data.y, y: data.x }));

    const visited = JSON.parse(localStorage.getItem("visited"));

    if (visited.filter((el) => el.id === Number(id)).length === 0) {
      visited.unshift({
        shop_pic: data.shop_pics[0]?.pic_URL,
        shop_name: data.shop_name,
        location: data.location,
        genus: data.genus,
        id: data.id,
        star_avg: data.star_avg,
      });
      localStorage.setItem("visited", JSON.stringify(visited));
    }

    if (Cookies.get("accessToken")) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark`,
          {
            headers: {
              authorization: Cookies.get("accessToken"),
            },
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (
            res.data.bookmark.filter((el) => el.id === Number(id)).length === 1
          ) {
            setIsFavorite(true);
          }
        });
    }
  }, []);

  return (
    <>
      <Header />
      {isFavoriteOn && <FavoriteModal />}
      <ShopImages>
        {data.shop_pics.map((el, idx) => {
          return <Photo key={idx} src={el.pic_URL} />;
        })}
      </ShopImages>
      <ShopTitle>
        <div>
          <span
            style={{
              marginLeft: 30,
              marginRight: 15,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {data.shop_name}
          </span>
          <span style={{ fontSize: 24, fontWeight: "bold", color: "red" }}>
            {!data.star_avg ? "0.0" : data.star_avg?.toFixed(1)}
          </span>
        </div>

        {Cookies.get("accessToken") ? (
          <Link
            href={{
              pathname: `/review/[id]`,
              query: { shopName: data.shop_name, id: id },
            }}
            as={`/review/${id}`}
          >
            <a>
              <Button>리뷰</Button>
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a>
              <Button onClick={() => alert("로그인이 필요합니다.")}>
                리뷰
              </Button>
            </a>
          </Link>
        )}

        {!isFavorite ? (
          <StarOutlined onClick={handleFavorite} style={{ fontSize: 30 }} />
        ) : (
          <StarFilled
            onClick={handleFavorite}
            style={{ fontSize: 30, color: "#f1c83e" }}
          />
        )}
      </ShopTitle>
      <Row align="middle" justify="center">
        <Col cs={24} md={12}>
          <ShopDetailInfo data={data} />
        </Col>
        <Col cs={24} md={12}>
          <KaKaoMap />
        </Col>
      </Row>
      <ShopReviews data={data.reviews} />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/shops/${params.id}`
  );

  const data = res.data.data.targetshop;
  const id = params.id;

  return { props: { data, id } };
}

export default shopdetail;
