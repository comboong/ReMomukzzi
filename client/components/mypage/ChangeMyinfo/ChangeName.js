import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const NameTilte = styled.div`
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 3px;
`;
const WrongName = styled.div`
  font-size: 20px;
  color: red;
  margin-top: 10px;
`;
const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ChangeNameForm = styled.div`
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
  transform: translateY(-40%);
  background-color: white;
`;
const InputForm = styled.div`
  margin: 0 auto;
  margin: 5px;
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
const InputBox = styled.div`
  width: 420px;
  border: solid 2px gainsboro;
`;

const NameText = styled.div`
  font-size: 20px;
  color: #00bf00;
  margin-top: 10px;
`;
const InfoNameText = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const SubmitBtnDiv = styled.span`
  float: right;
  margin-top: 50px;
  margin-right: 15px;
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
const CancelBtnDiv = styled.span`
  float: right;
  margin-top: 15px;
  margin-right: 20px;
  cursor: pointer;
`;

function ChangeName({ setModalOpen }) {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  const modalRef = useRef();
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

  const handleInputValue = (key) => (e) => {
    setchangeInfo({ ...changeInfo, [key]: e.target.value });
  };

  const isNickname = (asValue) => {
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
        .then((res) => {
          setchangeInfo(res.data.data.userInfo);
        })
        .catch((err) => {
          alert("잘못된 요청입니다.");
        });
    }
  };

  useEffect(() => {
    userInfoHandler();
  }, []);

  const nicknameCheck = (key) => (e) => {
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
      .then((res) => {
        setValidation({ ...validation, nickname: true });
        setMessage({ ...message, nickname: "사용 가능한 닉네임입니다." });
      })
      .catch((err) => {
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
      .then((res) => {
        alert("닉네임이 변경되었습니다.");
        Cookies.set("nickname", nickname);
        router.back();
      })
      .catch((err) => {
        alert("닉네임 변경 에러입니다.");
      });
  };

  return (
    <ModalBackdrop
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setModalOpen(false);
        }
      }}
    >
      <ChangeNameForm>
        <img
          style={{ cursor: "pointer", width: "300px", height: "250px" }}
          onClick={() => location.replace("/")}
          src="https://cdn.discordapp.com/attachments/968002114511073283/977107063681478716/b8f3403718a83d04.png"
        ></img>
        <CancelBtnDiv
          onClick={() => {
            setModalOpen(false);
          }}
        >
          x
        </CancelBtnDiv>
        <Div>
          <InputForm>
            <NameTilte>닉네임 수정</NameTilte>
            <InputBox>
              <Input
                onChange={handleInputValue("nickname")}
                placeholder="닉네임"
                onBlur={nicknameCheck("nickname")}
              />
            </InputBox>
            <NameTilte>
              {message.nickname ===
              "닉네임은 특수문자를 제외한 2 ~ 6 글자이어야 합니다." ? (
                <InfoNameText>{message.nickname}</InfoNameText>
              ) : message.nickname === "사용 가능한 닉네임입니다." ? (
                <NameText>{message.nickname}</NameText>
              ) : (
                <WrongName>{message.nickname}</WrongName>
              )}
            </NameTilte>
          </InputForm>
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
        </Div>
      </ChangeNameForm>
    </ModalBackdrop>
  );
}
export default ChangeName;
