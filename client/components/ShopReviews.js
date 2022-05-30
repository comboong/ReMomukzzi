import { Image, Comment, Tooltip, List } from "antd";
import moment from "moment";
import styled from "styled-components";

const ReviewsContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const ShopReviews = ({ data }) => {
  return (
    <ReviewsContainer>
      <List
        className="comment-list"
        header={`전체 (${data.length}) 개`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              key={item.id}
              actions={[<span>업로드 이미지 더 보기</span>]}
              author={item.user.nickname}
              avatar={"https://joeschmoe.io/api/v1/random"}
              content={[
                <p>{item.comment}</p>,

                // <Image
                //   src={item.review_pics[0].pic_URL}
                //   style={{ width: 50, height: 50 }}
                // />,
              ]}
            />
          </li>
        )}
      />
    </ReviewsContainer>
  );
};

export default ShopReviews;
