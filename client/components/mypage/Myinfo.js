import React from "react";
import styled from "styled-components";
import MoreviewLoader from "../MoreviewLoader";
import ChangeMyinfo from "./ChangeMyinfo/ChangeMyinfo";
import Myreview from "./Myreview/Myreview";
import Cookies from "js-cookie";

const MypageContainer = styled.div`
	padding: 10px;
	font-size: 14px;
	word-break: keep-all;
	min-height: 81vh;
	/* border: 1px solid black; */
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
