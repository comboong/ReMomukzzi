import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Loginoauth from "./Loginoauth";
import { useDispatch } from "react-redux";
import LoadingIndicator from "../Loading/LoadingIndicator";

const Div = styled.div`
  margin: 0 auto;
  width: 440px;
  border: 1px solid black;
  transform: translateY(20%);
`;

function OauthLoading() {
  let code = new URL(window.location.href).searchParams.get("code");

  const REACT_APP_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = "https://localhost:3000/oauthloding";
  const REACT_APP_GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REACT_APP_GITHUB_CLIENT_SECRET =
    process.env.REACT_APP_GITHUB_CLIENT_SECRET;

  const kakaocode = (code) => {
    console.log(
      "함수 실행됨!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );

    if (code.length !== 20) {
      console.log("kakao", code);
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((result) => {
          console.log("서버로 데이터 전송 시작");
          console.log(result.data);

          axios
            .post(
              `${process.env.REACT_APP_API_URL}/users/oauth`,
              {
                oauth: "KaKao",
                code: result.data.access_token,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              console.log(res);
              localStorage.setItem("accessToken", res.data.data.accessToken);
              localStorage.setItem("email", res.data.data.email);
              localStorage.setItem("nickname", res.data.data.nickname);
              localStorage.setItem("Oauth", res.data.data.oauth);

              window.location.replace("/");
            })
            .catch((e) => {
              alert("로그인 오류가 발생했습니다. 다시 시도해 주세요.");
              window.location.replace("/");
            });
        });
    } else {
      console.log("github", code);

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/oauth`,
          {
            oauth: "github",
            code: code,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 400) {
            alert("로그인 오류가 발생했습니다. 다시 시도해 주세요.");

            window.location.replace("/");
          } else {
            console.log("응답 나가는 중");
            console.log(res.data.data);
            localStorage.setItem("accessToken", res.data.data.accessToken);
            localStorage.setItem("nickname", res.data.data.nickname);
            localStorage.setItem("Oauth", res.data.data.oauth);

            window.location.replace("/");
          }
        })
        .catch((err) => {
          console.log(err.response);
          alert("요청이 거부되었습니다. 다시 로그인 하세요");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("nickname");
          localStorage.removeItem("Oauth");
          window.location.replace("/");
        });
    }
  };

  useEffect(() => {
    kakaocode(code);
  }, []);

  return (
    <>
      <LoadingIndicator />
    </>
  );
}

export default OauthLoading;
