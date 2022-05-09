import styled from "styled-components";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SlideContainer = styled.div`
  height: 40%;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
  max-width: 100%;
  object-fit: container;
`;

const ImageCarousel = ({ imageInfo, randomInt }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  return (
    <SlideContainer>
      <StyledSlider {...settings}>
        {imageInfo[randomInt].shoppic.photodatas.map((el, idx) => {
          return (
            <div key={idx}>
              <ImageContainer>
                <Image src={el} />
              </ImageContainer>
            </div>
          );
        })}
      </StyledSlider>
    </SlideContainer>
  );
};

export default ImageCarousel;
