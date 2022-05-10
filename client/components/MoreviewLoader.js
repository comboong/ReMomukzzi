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
  background-color: grey;
  opacity: 0.8;
`;

const Spinner = styled(ReactLoading)`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -32px; /* -1 * image width / 2 */
  margin-top: -32px; /* -1 * image height / 2 */
  display: block;
`;

const Loader = () => {
  return (
    <LoaderWrap>
      <Spinner type="spin" color="#ffba34" />
    </LoaderWrap>
  );
};

export default memo(Loader);
