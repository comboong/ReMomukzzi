import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loginoauth from "./Loginoauth";
import Cookies from "js-cookie";

const LoginForm = styled.div`
  text-align: center;
  padding-top: 50px;
  margin: 0 auto;
  width: 550px;
  height: 600px;
  font-weight: 700;
  border-radius: 20px;
  background-color: white;
  padding-bottom: 50px;
`;
const Div = styled.div`
	margin: 0 auto;
	width: 440px;
`;
const InputForm = styled.div`
  margin: 0 auto;
  margin: 5px;
`;
const LoginButton = styled.div`
  width: 430px;
  height: 45px;
  margin: 30px auto 0 auto;
  border: solid 1px gainsboro;
  text-align: center;
  background-color: #ffba34;
  color: white;
  cursor: pointer;
  line-height: 40px;
`;
const InputBox = styled.div`
  width: 430px;
  border: solid 2px gainsboro;
  margin-bottom: 20px;
`;
const Input = styled.input`
  width: 390px;
  border-style: none;
  height: 39px;
  padding-left: 5px;
  font-size: 13px;
  :focus {
    outline: none;
  }
`;
const LoginText = styled.div`
  font-size: 20px;
`;

function Loginmodal() {
	const [loginInfo, setLoginInfo] = useState({
		user_id: "",
		password: "",
	});

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
  };

	const onClickLogin = () => {
		const { user_id, password } = loginInfo;
		if (user_id === "") {
			return;
		} else if (password === "") {
			return;
		}
		axios
			.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,
				{
					user_id,
					password,
				},
				{ "Content-Type": "application/json", withCredentials: true }
			)
			.then(res => {
				Cookies.set("accessToken", res.data.data.accessToken);
				Cookies.set("nickname", res.data.data.nickname);
				return location.replace("/");
			})
			.catch(err => {
				alert("아이디와 비밀번호를 확인해 주세요.");
			});
	};

  const enterLogin = (e) => {
    if (e.key === "Enter") return onClickLogin();
  };

	return (
		<>
			<LoginForm>
				<Div>
					<img
						style={{ cursor: "pointer", width: "300px", height: "250px" }}
						onClick={() => location.replace("/")}
						src="https://cdn.discordapp.com/attachments/968002114511073283/977107063681478716/b8f3403718a83d04.png"
					></img>
					<InputForm>
						<LoginText>아이디</LoginText>
						<InputBox>
							<Input
								type="text"
								placeholder="아이디"
								name="input_id"
								onKeyPress={enterLogin}
								onChange={handleInputValue("user_id")}
							/>
						</InputBox>
					</InputForm>
					<InputForm>
						<LoginText>비밀번호</LoginText>
						<InputBox>
							<Input
								type="password"
								name="input_Password"
								placeholder="비밀번호"
								onKeyPress={enterLogin}
								onChange={handleInputValue("password")}
							/>
						</InputBox>
					</InputForm>
					<LoginButton onClick={onClickLogin}>로그인</LoginButton>
					<hr />
					<Loginoauth />
				</Div>
			</LoginForm>
		</>
	);
}

export default Loginmodal;
