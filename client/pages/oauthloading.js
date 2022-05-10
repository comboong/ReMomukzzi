import Header from "../components/Header";
import Footer from "../components/Footer";
import Myinfo from "../components/mypage/Myinfo";
import Loginmodal from "../components/Login/Loginmodal";
import Oauthlogin from "../components/Login/OauthLoading"

const Mypage = () => {
	return (
		<>
			<Header />
			<Oauthlogin />
			<Footer />
		</>
	);
};
export default Mypage;
