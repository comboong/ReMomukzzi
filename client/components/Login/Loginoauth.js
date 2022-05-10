import React from "react";
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
	/* border: 1px solid blue; */
	div {
		width: 100%;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		color: white;
		/* border: 1px solid white; */
	}
`;
const IconBox = styled.span`
	width: 100%;
	height: 80%;
	/* margin-top: 1rem; */
	display: flex;
	align-items: center;
	justify-content: center;
	/* border: 1px solid red; */
	img {
		width: 3.5rem;
		height: 3.5rem;
		margin: 0 0.5rem 0 0.5rem;
		/* border: 1px solid white; */
	}
`;

function OauthLoading() {
	const REACT_APP_REST_API_KEY = "2af87592ef59bb8f2f504dc1544a0a89";
	//process.env.REACT_APP_REST_API_KEY;
	const REACT_APP_GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
	const REDIRECT_URI = "https://localhost:3000/oauthloding";
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=https://localhost:3000/oauthloding&response_type=code`;

	const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_CLIENT_ID}`;

	return (
		<OauthContainer>
			<IconBox>
				<a id="kakao" href={KAKAO_AUTH_URL}>
					<img src={kakao_oauth} />
				</a>
				<a id="kakao" href={GITHUB_LOGIN_URL}>
					<img src={github_oauth} />
				</a>
			</IconBox>
		</OauthContainer>
	);
}
export default OauthLoading;
