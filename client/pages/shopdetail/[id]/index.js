import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import KaKaoMap from "../../../components/KaKaoMap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Rate, Image } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getShopDetailInfo } from "../../../reducers";
import styled from "styled-components";

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

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
  // const router = useRouter();
  // const { id } = router.query;
  // const dispatch = useDispatch();
  // const shopDetailInfo = useSelector((state) => state.shopDetailInfo);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/shops/${id}`)
  //     .then((res) => {
  //       dispatch(getShopDetailInfo(res.data.data.targetshop));
  //       console.log(res.data.data.targetshop);
  //     });
  // }, []);

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

      <KaKaoMap detailXY={{ x: data.x, y: data.y }} />
      {/* <Rate
        defaultValue={0}
        character={({ index }) => customIcons[index + 1]}
      /> */}
      {/* 
      <Link href="/review/[id]" as={`/review/${id}`}>
        <a>이거 누르면 리뷰로 가짐</a>
      </Link> */}
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
