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
	font-size: 20px;
	word-spacing: 50px;
	margin: 0 auto;
	padding-top: 50px;
	:after {
		content: "";
		display: block;
		width: 350px;
		border-bottom: 1px solid #bcbcbc;
	}
`;
const MypageFixMyinfoToggleBtn = styled.span`
	margin: 0 auto;
	opacity: 0.5;
	cursor: pointer;
	width: -webkit-fit-content;
	width: -moz-fit-content;
	width: fit-content;
	font-size: 20px;
	padding-top: 20px;
`;
const MypageFixMyinfoOauth = styled.span`
	margin: 0 auto;
	opacity: 0.5;
	padding-top: 20px;
	font-size: 20px;
`;
const SubmitBtnDiv = styled.div`
	padding-top: 30px;
	height: 100px;
	margin-right: 10px;
	display: flex;
	margin: 0 auto;
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
	const [modalOpen, setModalOpen] = useState(false);
	const [modalPassword, setModalPassword] = useState(false);
	const [userInfo, setUserInfo] = useState("");
	const [loading, setLoading] = useState(true);
	const [newNick, setNewNick] = useState();

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
					setNewNick(res.data.data.nickname);
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
					<MypageMyinfoName>
						닉네임 {userInfo && userInfo.data.data.userInfo.nickname}
					</MypageMyinfoName>
					<MypageMyinfoName>
						이메일 {userInfo && userInfo.data.data.userInfo.email}
					</MypageMyinfoName>
					<MypageFixMyinfoToggleBtn
						onClick={() => {
							setModalOpen(true);
						}}
					>
						닉네임 수정
					</MypageFixMyinfoToggleBtn>
					{modalOpen && (
						<ChangeName
							setModalOpen={setModalOpen}
							close={() => {
								setModalOpen(false);
							}}
						/>
					)}
					{Oauth === "true" ? (
						<MypageFixMyinfoOauth disabled={true}>
							소셜 계정은 비밀번호 수정을 하실 수 없습니다.
						</MypageFixMyinfoOauth>
					) : (
						<>
							<MypageFixMyinfoToggleBtn
								onClick={() => {
									setModalPassword(true);
								}}
							>
								비밀번호 수정
							</MypageFixMyinfoToggleBtn>
							{modalPassword && (
								<ChangePassword
									setModalPassword={setModalPassword}
									close={() => {
										setModalPassword(false);
									}}
								/>
							)}
						</>
					)}
					<SubmitBtnDiv>
						{Oauth === "true" ? (
							<></>
						) : (
							<button
								className="submit"
								onClick={() => {
									router.push("/signout");
								}}
							>
								회원탈퇴
							</button>
						)}
					</SubmitBtnDiv>
				</>
			)}
		</>
	);
}
export default ChangeMyinfo;
