import styled from "styled-components";
import ChangeMyinfo from "./ChangeMyinfo/ChangeMyinfo";
import Myreview from "./Myreview/Myreview";
import Cookies from "js-cookie";

const MypageContainer = styled.div`
	padding: 10px;
	font-size: 14px;
	word-break: keep-all;
	min-height: 81vh;
	overflow: auto;
`;
const MypageLeftContainer = styled.div`
	width: 50%;
	float: left;
	box-sizing: border-box;
`;
const MypageTitle = styled.div`
	margin-bottom: 5px;
	font-size: 100%;
	font-weight: bolder;
	text-align: center;
`;
const MypageRightContainer = styled.div`
	width: 100%;
`;
const MypageReviewContainer = styled.div`
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	border: 3px solid white;
	border-radius: 10px;
	padding: 5px;
	overflow: auto;
	height: 550px;
`;
const MypageMyinfoContainer = styled.div`
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	padding: 5px;
	margin-bottom: 15px;
	overflow: auto;
	padding-left: 100px;
	height: 550px;
`;

const Myinfo = () => {
	return (
		<>
			{Cookies.get("accessToken") ? (
				<MypageContainer>
					<MypageLeftContainer>
						<MypageTitle>내 정보</MypageTitle>
						<MypageMyinfoContainer>
							<ChangeMyinfo />
						</MypageMyinfoContainer>
					</MypageLeftContainer>
					<MypageRightContainer>
						<MypageTitle>내 리뷰</MypageTitle>
						<MypageReviewContainer>
							<Myreview />
						</MypageReviewContainer>
					</MypageRightContainer>
				</MypageContainer>
			) : (
				<div>로그인을 해주세요.</div>
			)}
		</>
	);
};
export default Myinfo;
