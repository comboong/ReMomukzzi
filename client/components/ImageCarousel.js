import styled from "styled-components";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const StyledSlider = styled(Slider)`
  height: 40%;
  margin: 30px;

  .slick-list {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-slide img {
    //슬라이더  컨텐츠
    width: 400px;
    height: 300px;
    cursor: pointer;
    object-fit: fill;
    margin: 0 auto;
  }

  .slick-dots {
    //슬라이드의 위치
    bottom: -10px;
    margin-top: 200px;
  }

  .slick-track {
    width: 100%;
  }
`;

const ImageCarousel = ({ imageInfo }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 800,
  };

  return (
    <StyledSlider {...settings}>
      {imageInfo.shoppic.photodatas.map((el, idx) => {
        return (
          <div key={idx}>
            <img src={el} />
          </div>
        );
      })}
    </StyledSlider>
  );
};

export default ImageCarousel;
