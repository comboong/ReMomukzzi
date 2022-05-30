import Header from "../components/Header";
import Myinfo from "../components/mypage/Myinfo";
import FavoriteModal from "../components/FavoriteModal";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Mypage = () => {
	const isFavoriteOn = useSelector(state => state.isFavoriteOn);
	return (
		<>
			<Header />
			{isFavoriteOn && <FavoriteModal />}
			<Myinfo />
			<Footer />
		</>
	);
};
export default Mypage;
