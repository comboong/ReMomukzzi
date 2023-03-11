import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

const StyledSlider = styled(Slider)`
  padding-top: 20px;
  padding-bottom: 20px;

  .slick-list {
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-dots {
    bottom: -10px;
    margin-top: 200px;
  }

  .slick-track {
    width: 100%;
  }
`;

const IMGWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 450px) {
    height: 180px;
  }
`;

const IMG = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const ImageCarousel = ({ imageInfo }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800,
    arrows: false,
  };

  return (
    <StyledSlider {...settings}>
      {imageInfo?.shopPics?.map((shopImg, i) => {
        return (
          <React.Fragment key={i}>
            <IMGWrapper>
              <IMG src={shopImg} />
            </IMGWrapper>
          </React.Fragment>
        );
      })}
    </StyledSlider>
  );
};
export default ImageCarousel;