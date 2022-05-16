import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ChangeName from "./ChangeName";
import ChangePassword from "./ChangePassword";
import MoreviewLoader from "../../MoreviewLoader";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const MypageMyinfoName = styled.div`
	z-index: 10;
	font-size: 2rem;
	font-weight: bolder;
	margin-top: 20px;
	margin-bottom: 5px;
`;
const MypageFixMyinfoToggleBtn = styled.span`
	margin: 5px 0 5px 0;
	opacity: 0.5;
	cursor: pointer;
	width: -webkit-fit-content;
	width: -moz-fit-content;
	width: fit-content;
	font-size: 20px;
`;
const MypageFixToggleContainer = styled.form`
	padding: 5px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: start;
	-ms-flex-pack: start;
	justify-content: flex-start;
`;
const SubmitBtnDiv = styled.div`
	margin-top: 30px;
	width: 100%;
	height: 100px;
	margin-right: 10px;
	display: flex;
	& > button {
		padding: 6px 6px;
		background-color: #ffba34;
		border-radius: 4px;
		border: none;
		color: white;
		cursor: pointer;
		height: 40px;
	}
`;
function ChangeMyinfo() {
	const router = useRouter();
	const accessToken = Cookies.get("accessToken");

	const Oauth = Cookies.get("Oauth");

	const [userInfo, setUserInfo] = useState("");
	const [fixNameToggle, setFixNameToggle] = useState(false);
	const [fixPasswordToggle, setFixPasswordToggle] = useState(false);
	const [loading, setLoading] = useState(true);
	const fixNameToggleHandler = () => {
		setFixNameToggle(!fixNameToggle);
	};
	const fixPasswordToggleHandler = () => {
		setFixPasswordToggle(!fixPasswordToggle);
	};

	const userInfoHandler = () => {
		if (!accessToken) {
			router.push("/");
		} else {
			setLoading(true);
			axios
				.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
					headers: { authorization: `Bearer ${accessToken}` },
					"Content-Type": "application/json",
				})
				.then(res => {
					setUserInfo(res);
					setLoading(false);
				})
				.catch(err => {
					alert("잘못된 요청입니다.");
				});
		}
	};
	useEffect(() => {
		userInfoHandler();
	}, []);

	return (
		<>
			{loading ? (
				<MoreviewLoader />
			) : (
				<>
					<MypageMyinfoName>오늘 뭐먹지?</MypageMyinfoName>
					<MypageMyinfoName>
						닉네임: {userInfo && userInfo.data.data.userInfo.nickname} 님
					</MypageMyinfoName>
					<MypageMyinfoName>
						이메일: {userInfo && userInfo.data.data.userInfo.email}
					</MypageMyinfoName>
					<div>
						<MypageFixMyinfoToggleBtn onClick={fixNameToggleHandler}>
							닉네임 수정
						</MypageFixMyinfoToggleBtn>
					</div>
					{fixNameToggle ? (
						<MypageFixToggleContainer onSubmit={e => e.preventDefault()}>
							<div className="nickname-container">
								<ChangeName />
							</div>
						</MypageFixToggleContainer>
					) : null}
					{Oauth === "true" ? (
						<MypageFixMyinfoToggleBtn disabled={true}>
							소셜 계정은 비밀번호 수정을 하실 수 없습니다.
						</MypageFixMyinfoToggleBtn>
					) : (
						<MypageFixMyinfoToggleBtn onClick={fixPasswordToggleHandler}>
							비밀번호 수정
						</MypageFixMyinfoToggleBtn>
					)}
					{fixPasswordToggle ? (
						<MypageFixToggleContainer onSubmit={e => e.preventDefault()}>
							<div className="password-container">
								<ChangePassword />
							</div>
						</MypageFixToggleContainer>
					) : null}
					<SubmitBtnDiv>
						<button
							className="submit"
							onClick={() => {
								router.push("/signout");
							}}
						>
							회원탈퇴
						</button>
					</SubmitBtnDiv>
				</>
			)}
		</>
	);
}
export default ChangeMyinfo;
