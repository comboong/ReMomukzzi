import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";

const review = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
      <h1>{id}</h1>
      <p>Hello {id}!</p>
      <Footer />
    </>
  );
};

export default review;
