import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Rate, Image } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getShopDetailInfo } from "../../../reducers";

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const shopdetail = (data) => {
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
      {data.shop_pics.map((el, idx) => {
        return <Image key={idx} src={el.pic_URL} />;
      })}

      <Rate
        defaultValue={0}
        character={({ index }) => customIcons[index + 1]}
      />

      <Link href="/review/[id]" as={`/review/${id}`}>
        <a>이거 누르면 리뷰로 가짐</a>
      </Link>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/shops/${params.id}`
  );
  const data = res.data.data.targetshop;

  console.log(data);

  return { props: { data } };
}

export default shopdetail;
