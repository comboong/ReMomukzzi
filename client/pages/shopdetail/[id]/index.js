import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const shopdetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [selectedStar, setSelectedStar] = useState(0);

  return (
    <>
      <Header />
      <h1>{id}</h1>
      <p>Hello {id}!</p>

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

export default shopdetail;
