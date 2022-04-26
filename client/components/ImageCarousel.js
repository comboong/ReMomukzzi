import styled from "styled-components";
import Slider from "react-slick";

const SlideContainer = styled.div`
  padding: 50px;
  height: 30%;
`;

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SlideContainer>
      <Slider {...settings}>
        <div>
          <img src="https://t1.daumcdn.net/cfile/tistory/9926614F5F0661AC20" />
        </div>
        <div>
          <img src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201903/08/52cf07ea-c8da-4574-b0e9-21e0e3b31118.jpg" />
        </div>
      </Slider>
    </SlideContainer>
  );
};

export default ImageCarousel;
