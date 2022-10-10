import styled from "styled-components";
import kakao_oauth from "./kakao_oauth.png";
import github_oauth from "./github_oauth.png";

const OauthContainer = styled.div`
  width: 100%;
  height: 7rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  div {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: white;
  }
`;
const IconBox = styled.span`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 3.5rem;
    height: 3.5rem;
    margin: 0 0.5rem 0 0.5rem;
  }
`;

function Loginouath() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REACT_APP_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
  const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REACT_APP_GITHUB_CLIENT_ID}`;

  return (
    <OauthContainer>
      <IconBox>
        <a id="kakao" href={KAKAO_AUTH_URL}>
          <img src={kakao_oauth} />
        </a>
        <a id="github" href={GITHUB_LOGIN_URL}>
          <img src={github_oauth} />
        </a>
      </IconBox>
    </OauthContainer>
  );
}
export default Loginouath;
