import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import ShopInfo from "../components/ShopInfo";
import KaKaoMap from "../components/KaKaoMap";

const Home = () => {
  return (
    <>
      <Header />
      <ImageCarousel />
      <ShopInfo />
      {/* <KaKaoMap /> */}
      <Footer />
    </>
  );
};

export default Home;
