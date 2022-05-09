import Header from "../components/Header";
import Footer from "../components/Footer";
import Myinfo from "../components/mypage/Myinfo";
import Loginmodal from "../components/Login/Loginmodal";

const Mypage = () => {
	return (
		<>
			<Header />
			{/* <Loginmodal /> */}
			<Myinfo />
			<Footer />
		</>
	);
};
export default Mypage;
