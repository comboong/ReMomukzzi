import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import KaKaoMap from "../../../components/KaKaoMap";
import ShopDetailInfo from "../../../components/ShopDetailInfo";
import { getShopDetailInfo } from "../../../reducers";

import Link from "next/link";
import { Rate, Image, Row, Col, Button } from "antd";
import axios from "axios";
import styled from "styled-components";

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
  return (
    <>
      <Header />
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
        <Button>즐겨찾기</Button>
      </ShopTitle>
      <Row align="middle" justify="center">
        <Col cs={24} md={12}>
          <ShopDetailInfo data={data} />
        </Col>
        <Col cs={24} md={12}>
          <KaKaoMap detailXY={{ x: data.x, y: data.y }} />
        </Col>
      </Row>
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

  console.log(data);

  return { props: { data, id } };
}

export default shopdetail;
