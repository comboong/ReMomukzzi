import Link from "next/link";
import styled from "styled-components";
import { Col, Row } from "antd";

const IntroImage = styled.img`
  width: 250px;
  height: 200px;
  border-radius: 30px;
  cursor: pointer;
  padding: 10px;
  object-fit: cover;

  @media (max-width: 1550px) {
    width: 220px;
  }

  @media (max-width: 1280px) {
    width: 200px;
  }
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
  text-align: center;
`;

const IntroImageSet = ({ imageInfo }) => {
  const introPlaceInfo = imageInfo.slice(0, 6);

  return (
    <>
      <ImageSetTitle>주변 추천 음식점 리스트</ImageSetTitle>
      <Row>
        {introPlaceInfo.map((shopInfo, i) => {
          return (
            <Col span={12} key={i} style={{ textAlign: "center" }}>
              <PlaceName>{shopInfo?.shopInfo?.place_name}</PlaceName>
              <Link
                href="/shopdetail/[id]"
                as={`/shopdetail/${shopInfo.shopInfo.id}`}
              >
                <IntroImage src={shopInfo?.shopPics[0]} />
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default IntroImageSet;