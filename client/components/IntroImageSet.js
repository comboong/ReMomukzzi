import styled from "styled-components";
import Link from "next/link";
import React from "react";
import { Row, Col } from "antd";

const IntroImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 30px;
  cursor: pointer;
`;

const ImageSetTitle = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 32px;
  font-weight: bold;
`;

const PlaceName = styled.div`
  font-size: 18px;
  padding-bottom: 10px;
  min-width: 200px;
`;

const IntroImageSet = ({ imageInfo }) => {
  const imageInfoCut = imageInfo.slice(0, 6);
  return (
    <>
      <ImageSetTitle>주변 추천 음식점 리스트</ImageSetTitle>
      <Row gutter={[32, 32]}>
        {imageInfoCut.map((el) => {
          return (
            <Col span={12}>
              <div
                key={el.shopinfo.shopinfo.id}
                style={{ textAlign: "center" }}
              >
                <PlaceName>{el.shopinfo.shopinfo.place_name}</PlaceName>
                <Link
                  href="/shopdetail/[id]"
                  as={`/shopdetail/${el.shopinfo.shop_id}`}
                >
                  <IntroImage
                    key={el.shopinfo.shop_id}
                    src={el.shoppic.photodatas[0]}
                  />
                </Link>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default IntroImageSet;
