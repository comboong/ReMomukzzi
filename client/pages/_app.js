import Head from "next/head";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import wrapper from "../store/configureStore";

// TODO: 페이지의 공통부는 _app.js에서 관리하자. (pages들의 공통부분)

const ReMomukzzi = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>오늘 뭐 먹지?</title>
        <link rel="shortcut icon" href="/favicon/ms-icon-310x310.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(ReMomukzzi);
