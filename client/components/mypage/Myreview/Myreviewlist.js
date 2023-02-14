import styled from 'styled-components';
import Myreviewdelete from './Myreviewdelete';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 20vh;
  position: relative;
  margin-top: 30px;
`;
const CommentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 20px;
  margin-bottom: 5%;
  transition: all 0.1s ease-in-out;
  &:hover {
    color: black;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }
  &:hover:after {
    left: 0;
    width: auto;
  }
`;
const Comment = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  height: auto;
  grid-template-columns: 1fr 3fr 0.5fr;
  border-radius: 20px;
  white-space: nowrap;
`;
const ProfileBox = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20%;
  margin-bottom: auto;
`;
const Profile = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  height: auto;
`;
const ProfileImgBox = styled.div`
  width: 80%;
  height: 0;
  padding-top: 50%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;
const ShopName = styled.div`
  position: relative;
  font-size: 1rem;
  text-align: center;
  line-height: 60px;
`;
const ContentBox = styled.form`
  position: relative;
  display: grid;
  grid-template-rows: auto auto;
  width: auto;
  height: auto;
  padding-top: 5%;
  padding-bottom: 10%;
  text-align: center;
`;
const ContentWrapper = styled.div`
  position: relative;
  width: auto;
  height: auto;
`;
const Content = styled.div`
  flex-wrap: wrap;
  position: relative;
  width: auto;
  height: auto;
  padding: 1%;
  font-size: 1.4rem;
  line-height: 100px;
`;
const Star = styled.div`
  text-align: center;
  weight: 100%;
`;
const UserLocationWrapper = styled.div`
  width: auto;
  height: auto;
  font-size: 0.8rem;
`;
const StarText = styled.span`
  color: #ffba34;
`;
const BtnBox = styled.div`
  position: relative;
  width: 60%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15%;
  margin-bottom: 15%;
`;
const BtnWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 150%;
  margin-left: auto;
  margin-right: auto;
`;
const BtnOne = styled.div`
  position: absolute;
  top: 0;
  height: 33.33%;
  width: 100%;
  .delete-button {
    cursor: pointer;
    color: gray;
  }
`;
const Date = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  color: gray;
  font-size: 0.8rem;
`;

const Myreviewlist = ({ comment, shop_name, createdAt, star, pic, id }) => {
  return (
    <>
      <Wrapper>
        <CommentWrapper>
          <Comment>
            <ProfileBox>
              <Profile>
                {!pic ? (
                  <ProfileImgBox>
                    <ProfileImg src='http://www.billking.co.kr/index/skin/board/basic_support/img/noimage.gif' />
                  </ProfileImgBox>
                ) : (
                  <ProfileImgBox>
                    <ProfileImg src={pic} />
                  </ProfileImgBox>
                )}
                <ShopName>{shop_name}</ShopName>
              </Profile>
            </ProfileBox>
            <ContentBox>
              <ContentWrapper>
                <Content name='comment' className='comment-read'>
                  {comment}
                </Content>
                <Star>
                  <UserLocationWrapper>
                    <span>평점</span>
                    <StarText>{` ${star}`}</StarText>
                  </UserLocationWrapper>
                </Star>
              </ContentWrapper>
            </ContentBox>
            <BtnBox>
              <BtnWrapper>
                <BtnOne>
                  <Myreviewdelete id={id} />
                </BtnOne>
              </BtnWrapper>
            </BtnBox>
            <Date>{`작성날짜: ${createdAt}`}</Date>
          </Comment>
        </CommentWrapper>
      </Wrapper>
    </>
  );
};
export default Myreviewlist;
