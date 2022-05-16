import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Myreviewlist from "./Myreviewlist";
import Emptyreview from "./Emptyreview";
import MoreviewLoader from "../../MoreviewLoader";
import Cookies from "js-cookie";

const ReviewContainer = styled.div`
	font-size: 14px;
	padding: 0 5px 0 5px;
	margin-bottom: 10px;
	word-break: keep-all;
`;
const MoreMyreviewBtn = styled.button`
	margin: 5px 5px;
	width: 98%;
	border: none;
	background-color: white;
`;

function Myreview() {
	const [userReview, setUserReview] = useState([]);
	const accessToken = Cookies.get("accessToken");

	const getReviewHandler = () => {
		if (!accessToken) {
			return;
		} else {
			axios
				.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
					headers: { authorization: `Bearer ${accessToken}` },
					"Content-Type": "application/json",
				})
				.then(res => {
					setUserReview(res.data.data.userInfo.reviews);
				})
				.catch(err => {
					alert("잘못된 요청입니다.");
				});
		}
	};
	useEffect(() => {
		getReviewHandler();
	}, []);

	let newUserReview = [...userReview];

	const [isLoaded, setIsLoaded] = useState(false);
	const [reviewCount, setReviewCount] = useState(4);

	const handleReviewMore = async () => {
		setIsLoaded(true);
		await new Promise(resolve => setTimeout(resolve, 1000));
		setReviewCount(reviewCount + 4);
		setIsLoaded(false);
	};

	return (
		<ReviewContainer>
			{newUserReview.length !== 0 ? (
				newUserReview.slice(0, reviewCount).map((el, i) => {
					return (
						<Myreviewlist
							id={el.id}
							comment={el.comment.slice(0, 25)}
							createdAt={el.createdAt.slice(0, 10)}
							shop_name={el.shop.shop_name}
							star={el.star}
							pic={el.review_pics[0]?.pic_URL}
						/>
					);
				})
			) : (
				<Emptyreview />
			)}
			{isLoaded ? (
				<MoreviewLoader />
			) : (
				<MoreMyreviewBtn onClick={handleReviewMore}>
					{reviewCount < newUserReview.length ? "더 보기" : " "}
				</MoreMyreviewBtn>
			)}
		</ReviewContainer>
	);
}

export default Myreview;
