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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-48%, -100%);
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
        <H2>정보를 받아오고 있습니다. 잠시만 기다려주세요.</H2>
        <Spinner type="spin" color="#ffba34" />
      </LoaderWrap>
    </>
  );
};

export default memo(Loader);
