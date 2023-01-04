import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import MoreviewLoader from "../MoreviewLoader";
import Cookies from "js-cookie";

function OauthCheck({ code }) {
  const router = useRouter();

  const kakaocode = code => {
    if (code.length !== 20) {
      // KAKAO
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_REACT_APP_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&code=${code}`,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(res => {
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
            .then(res => {
              Cookies.set("accessToken", res.data.data.accessToken);
              Cookies.set("email", res.data.data.email);
              Cookies.set("nickname", res.data.data.nickname);
              Cookies.set("Oauth", res.data.data.oauth);

              router.push("/");
            })
            .catch(err => {
              console.log(err);
              alert("로그인 오류가 발생했습니다. 다시 시도해 주세요.");
              router.back();
            });
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
