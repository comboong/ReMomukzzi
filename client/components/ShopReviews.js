import { Image, Comment, Tooltip, List } from "antd";
import moment from "moment";
import styled from "styled-components";

const ex = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 21px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ShopReviews = ({ data }) => {
  return (
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
          <hr />
        </li>
      )}
    />
  );
};

export default ShopReviews;
