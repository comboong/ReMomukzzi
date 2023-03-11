import { memo } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: white;
  opacity: 0.8;
`;

const H2 = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: calc(-${(props) => props.width} / 2);
  margin-top: 12px;
  display: block;
  transform: translate(-48%, -100%);

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Spinner = styled(ReactLoading)`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -32px;
  margin-top: 12px;
  display: block;
`;

const Loader = () => {
  return (
    <>
      <LoaderWrap>
        <H2>
          주변 정보를 받아오고 있습니다. <br />
          잠시만 기다려주세요.
        </H2>

        <Spinner type="spin" color="#ffba34"></Spinner>
      </LoaderWrap>
    </>
  );
};

export default memo(Loader);