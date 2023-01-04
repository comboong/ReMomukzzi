import styled from "styled-components";
import Cake from "../../../images/케이크.jpeg";

const ContentEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: black;
  font-size: 3rem;
  font-weight: bold;
  > img {
    justify-content: center;
  }
  .blur {
    filter: blur(6px);
  }
  .imtext {
    z-index: 1;
    position: absolute;
    font-size: 30px;
    height: 100px;
  }
`;

const Empty = () => {
  return (
    <ContentEmpty>
      <span className="imtext"> 새로운 리뷰를 작성해보세요 !</span>
      <img src={Cake} className="blur" width={500} height={500} />
    </ContentEmpty>
  );
};

export default Empty;
