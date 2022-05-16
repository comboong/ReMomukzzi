import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";

const Input = styled.input`
	width: 200px;
	border-style: none;
	height: 39px;
	padding-left: 5px;
	font-size: 13px;
	border-bottom: solid 2px gainsboro;
	:focus {
		outline: none;
	}
`;
const NameText = styled.div`
	font-size: 20px;
`;
const SubmitBtnDiv = styled.span`
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
	.cancel {
		margin-left: 7px;
	}
`;

function ChangeName() {
	const accessToken = Cookies.get("accessToken");
	const [changeInfo, setchangeInfo] = useState({
		user_id: "",
		nickname: "",
	});
	const [message, setMessage] = useState({
		nickname: "닉네임은 특수문자를 제외한 2 ~ 6 글자이어야 합니다.",
	});
	const [validation, setValidation] = useState({
		nickname: false,
	});

	const isValidForNickname = validation.nickname;

	const handleInputValue = key => e => {
		setchangeInfo({ ...changeInfo, [key]: e.target.value });
	};

	const isNickname = asValue => {
		let regExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/;
		return regExp.test(asValue);
	};

	const userInfoHandler = () => {
		if (!accessToken) {
			return;
		} else {
			axios
				.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
					headers: { authorization: `Bearer ${accessToken}` },
					"Content-Type": "application/json",
				})
				.then(res => {
					setchangeInfo(res.data.data.userInfo);
				})
				.catch(err => {
					alert("잘못된 요청입니다.");
				});
		}
	};

	useEffect(() => {
		userInfoHandler();
	}, []);

	const nicknameCheck = key => e => {
		const { nickname } = changeInfo;
		if (!isNickname(changeInfo.nickname)) {
			setMessage({
				...message,
				nickname: "닉네임 양식을 맞춰주세요.",
			});
			return;
		}
		if (changeInfo.nickname.length > 6 || changeInfo.nickname.length < 2) {
			setMessage({ ...message, nickname: "2 ~ 6 글자이어야 합니다." });
			return;
		}
		axios
			.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/check`, {
				nickname,
			})
			.then(res => {
				setValidation({ ...validation, nickname: true });
				setMessage({ ...message, nickname: "사용 가능한 닉네임입니다." });
			})
			.catch(err => {
				setValidation({ ...validation, nickname: false });
				setMessage({ ...message, nickname: "사용 불가능한 닉네임입니다." });
			});
	};

	const fixNicknameHandler = () => {
		const { nickname } = changeInfo;
		axios
			.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
				user_id: changeInfo.user_id,
				nickname,
			})
			.then(res => {
				alert("닉네임이 변경되었습니다.");
				return location.replace("/mypage");
			})
			.catch(err => {
				alert("닉네임 변경 에러입니다.");
			});
	};
	return (
		<div>
			<div>
				<Input
					onChange={handleInputValue("nickname")}
					placeholder="닉네임"
					onBlur={nicknameCheck("nickname")}
				/>
				<span>
					{message.nickname ===
					"닉네임은 특수문자를 제외한 2 ~ 6 글자이어야 합니다." ? (
						<NameText>{message.nickname}</NameText>
					) : message.nickname === "사용 가능한 닉네임입니다." ? (
						<NameText>{message.nickname}</NameText>
					) : (
						<NameText>{message.nickname}</NameText>
					)}
				</span>
				<SubmitBtnDiv>
					<button className="submit" onClick={nicknameCheck("nickname")}>
						중복확인
					</button>
					{isValidForNickname ? (
						<button className="cancel" onClick={fixNicknameHandler}>
							수정
						</button>
					) : (
						<button className="cancel" disabled={true}>
							수정
						</button>
					)}
				</SubmitBtnDiv>
			</div>
		</div>
	);
}
export default ChangeName;
