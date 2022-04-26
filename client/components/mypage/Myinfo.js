import styled from "styled-components";
import Emptyreview from "./Emptyreview";

const MypageContainer = styled.div`
	padding: 10px;
	font-size: 14px;
	word-break: keep-all;
	min-height: 81vh;
	width: 100%;
	border: 1px solid black;
`;
const MypageLeftContainer = styled.div`
	/* display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	width: 30%;
	margin-right: 50px; */
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
`;
const MypageMyinfoContainer = styled.div`
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	/* border: 3px solid rgb(39, 51, 67); */
	/* border-radius: 10px; */
	padding: 5px;
	margin-bottom: 15px;
	overflow: auto;
	/* border-right-style: solid; */
	border-right-width: 5px;
	border-right-color: #ffba34;
	/* background-image: url('${MypageImg}');
background-position: 80px 50px; */
`;

const Myinfo = () => {
	return (
		<>
			<MypageContainer>
				<MypageLeftContainer>
					<MypageTitle>내 정보</MypageTitle>
					<MypageMyinfoContainer></MypageMyinfoContainer>
				</MypageLeftContainer>
				<MypageRightContainer>
					<MypageTitle>내 리뷰</MypageTitle>
					<MypageReviewContainer>
						<Emptyreview />
					</MypageReviewContainer>
				</MypageRightContainer>
			</MypageContainer>
		</>
	);
};
export default Myinfo;
