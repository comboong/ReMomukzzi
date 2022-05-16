import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import MoreviewLoader from "../MoreviewLoader";
import Cookies from "js-cookie";

function OauthCheck({ code }) {
  const router = useRouter();

  const REDIRECT_URI = "http://localhost:3000/oauthloading";

  const kakaocode = (code) => {
    if (code.length !== 20) {
      // KAKAO
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/users/oauth`,
              {
                oauth: "KaKao",
                code: res.data.access_token,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              Cookies.set("accessToken", res.data.data.accessToken);
              Cookies.set("email", res.data.data.email);
              Cookies.set("nickname", res.data.data.nickname);
              Cookies.set("Oauth", res.data.data.oauth);

              router.push("/");
            })
            .catch((e) => {
              console.log(e);
              alert("로그인 오류가 발생했습니다. 다시 시도해 주세요.");
              router.back();
            });
        });
    } else {
      // GITHUB
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/oauth`,
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
            router.back();
          } else {
            Cookies.set("accessToken", res.data.data.accessToken);
            Cookies.set("nickname", res.data.data.nickname);
            Cookies.set("Oauth", res.data.data.oauth);
            Cookies.set("bookmark", res.data.data.bookmark);

            router.push("/");
          }
        })
        .catch((err) => {
          console.log(err.response);
          alert("요청이 거부되었습니다. 다시 로그인 하세요");
          Cookies.remove("accessToken");
          Cookies.remove("nickname");
          Cookies.remove("Oauth");
          router.back();
        });
    }
  };

  useEffect(() => {
    kakaocode(code);
  }, []);

  return (
    <>
      <MoreviewLoader />
    </>
  );
}

export default OauthCheck;
