import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loginoauth from "./Loginoauth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";

const ModalBackdrop = styled.div`
  /* position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.4); */
`;
const LoginForm = styled.div`
  text-align: center;
  padding-top: 50px;
  margin: 0 auto;
  width: 550px;
  height: 600px;
  font-weight: 700;
  /* transform: translateY(20%); */
  border-radius: 20px;
  /* border: 1px solid #ffba34; */
  background-color: white;
  padding-bottom: 50px;
`;
const Div = styled.div`
  margin: 0 auto;
  width: 440px;
  border-radius: 20px;
  /* border: 1px solid #ffba34; */
  transform: translateY(20%);
  background-color: white;
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

function Loginmodal({ setOpenModal, close }) {
  // document.body.style.overflow = 'hidden'
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    user_id: "",
    password: "",
  });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
  };
  console.log(loginInfo);

  const onClickLogin = () => {
    const { user_id, password } = loginInfo;
    if (user_id === "") {
      console.log("아이디를 입력하세요");
      return;
    } else if (password === "") {
      console.log("비밀번호를 입력하세요");
      return;
    }
    console.log("click login");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,
        {
          user_id,
          password,
        },
        { "Content-Type": "application/json", withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.data.accessToken);
        Cookies.set("accessToken", res.data.data.accessToken);
        Cookies.set("nickname", res.data.data.nickname);
        if (res.data.data.accessToken) {
          Cookies.set("accessToken", res.data.data.accessToken);
        }
        return router.push("/");
      })
      .catch((err) => {
        console.log(err);
        console.log("로그인실패");
        alert("아이디와 비밀번호를 확인해 주세요.");
      });
  };

  const enterLogin = (e) => {
    if (e.key === "Enter") return onClickLogin();
  };

  // const dispatch = useDispatch();
  return (
    <ModalBackdrop
      onClick={() => {
        // dispatch({ type: "login modal" });
      }}
    >
      <LoginForm onClick={(e) => e.stopPropagation()}>
        <Div>
          {/* <button
						onClick={() => {
							setOpenModal(false)
						}}
					>
						X
					</button> */}

          <InputForm>
            <h4>아이디</h4>
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
            <h4>비밀번호</h4>
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
          {/* <button
						onClick={() => {
							setOpenModal(false)
						}}
						id="cancelBtn"
					>∂
						Cancel
					</button> */}
        </Div>
      </LoginForm>
    </ModalBackdrop>
  );
}

export default Loginmodal;
