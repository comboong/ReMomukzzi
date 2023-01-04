import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import InputPassword from "./InputPassword";
import Confirmpassword from "./Confirmpassword";
import Cookies from "js-cookie";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ChangePasswordForm = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  font-weight: 700;
  transform: translateY(40%);
  background-color: white;
  padding-bottom: 50px;
  border: 3px solid #ffba34;
`;
const Div = styled.div`
  margin: 0 auto;
  width: 440px;
  border-radius: 20px;
  transform: translateY(-30%);
  background-color: white;
`;
const InputForm = styled.div`
  padding-left: 30px;
  margin: 5px;
`;
const SubmitBtnDiv = styled.div`
  float: right;
  margin-top: 50px;
  margin-right: 20px;
  & > button {
    background-color: #ffba34;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    height: 40px;
  }
`;
const CancelBtnDiv = styled.span`
  float: right;
  margin-top: 15px;
  margin-right: 20px;
  cursor: pointer;
`;

function Passwordchange({ setModalPassword }) {
  const accessToken = Cookies.get("accessToken");
  const modalRef = useRef();

  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [changeInfo, setchangeInfo] = useState({
    user_id: "",
    password: "",
  });

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

  const handlePasswordChange = e => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;
    const NewPasswordInput = {
      ...passwordInput,
      [passwordInputFieldName]: passwordInputValue,
    };
    setPasswordInput(NewPasswordInput);
  };
  const handleValidation = e => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;

    if (passwordInputFieldName === "password") {
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";

      if (!lowercasePassword) {
        errMsg = "소문자를 추가해주세요.";
      } else if (!digitsPassword) {
        errMsg = "숫자를 추가해주세요.";
      } else if (!specialCharPassword) {
        errMsg = "특수문자를 추가해주세요.";
      } else if (!minLengthPassword) {
        errMsg = "비밀번호는 8자~20자입니다.";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }

    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const fixPasswordHandler = () => {
    const { password } = passwordInput;
    if (passwordInput.confirmPassword === "" && passwordInput.password === "") {
      return setPasswordErr("비밀번호를 입력해주세요");
    }
    if (passwordInput.confirmPassword === passwordInput.password) {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
          { user_id: changeInfo.user_id, password },
          {
            headers: { authorization: `Bearer ${accessToken}` },
          }
        )
        .then(res => {
          if (changeInfo.password === passwordInput.password) {
            return alert("기존에 사용하는 비밀번호와 같습니다.");
          } else {
            alert("패스워드가 변경되었습니다.");
            return location.replace("/mypage");
          }
        })
        .catch(err => {
          alert("패스워드 변경 에러입니다.");
        });
    }
  };

  return (
    <ModalBackdrop
      ref={modalRef}
      onClick={e => {
        if (modalRef.current === e.target) {
          setModalPassword(false);
        }
      }}
    >
      <ChangePasswordForm>
        <img
          style={{ cursor: "pointer", width: "300px", height: "250px" }}
          onClick={() => location.replace("/")}
          src="https://cdn.discordapp.com/attachments/968002114511073283/977107063681478716/b8f3403718a83d04.png"
        ></img>
        <CancelBtnDiv
          onClick={() => {
            setModalPassword(false);
          }}
        >
          x
        </CancelBtnDiv>
        <Div>
          <InputForm>
            <InputPassword
              handlePasswordChange={handlePasswordChange}
              handleValidation={handleValidation}
              passwordValue={passwordInput.password}
              passwordError={passwordError}
            />
            <Confirmpassword
              handlePasswordChange={handlePasswordChange}
              handleValidation={handleValidation}
              confirmPasswordValue={passwordInput.confirmPassword}
              confirmPasswordError={confirmPasswordError}
            />
          </InputForm>
          <SubmitBtnDiv>
            <button onClick={fixPasswordHandler}>수정</button>
          </SubmitBtnDiv>
        </Div>
      </ChangePasswordForm>
    </ModalBackdrop>
  );
}
export default Passwordchange;
