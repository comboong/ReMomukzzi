import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import KaKaoMap from "../../../components/KaKaoMap";
import ShopDetailInfo from "../../../components/ShopDetailInfo";
import { getShopDetailInfo } from "../../../reducers";

import Link from "next/link";
import { Rate, Image, Row, Col, Button } from "antd";
import axios from "axios";
import styled from "styled-components";

export const ShopImages = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;
  overflow: auto;
  margin: 0 auto;
  border-bottom: 1px solid gainsboro;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const shopdetail = ({ data, id }) => {
  return (
    <>
      <Header />
      <ShopImages>
        {data.shop_pics.map((el, idx) => {
          return (
            <Image
              key={idx}
              src={el.pic_URL}
              style={{
                maxWidth: 300,
                minWidth: 300,
                objectFit: "fill",
              }}
            />
          );
        })}
      </ShopImages>
      <div>
        <Link
          href={{
            pathname: `/review/[id]`,
            query: { shopName: data.shop_name, id: id },
          }}
          as={`/review/${id}`}
        >
          <a>리뷰</a>
        </Link>
      </div>
      <Row>
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
