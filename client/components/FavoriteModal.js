import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FavoriteAction } from "../reducers";
import Cookies from "js-cookie";
import Link from "next/link";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const BackDropModal = styled.div`
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ExampleBody = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  min-width: 320px;
  min-height: 500px;
  max-height: 500px;
  margin: 0 auto;
  border-radius: 5px;
  overflow: auto;
  background-color: white;
`;

const ButtonDiv = styled.div`
  display: flex;

  & > button {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 50%;
    background-color: white;
    border: none;
    cursor: pointer;
  }
  .clicked {
    border-bottom: 3px solid #ffba34;
    color: #ffba34;
    cursor: pointer;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  padding: 10px;

  & > img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    margin-right: 15px;
    flex-shrink: 0;
    cursor: pointer;
  }
  & > div {
    flex-grow: 1;
  }
  & > span {
    flex-shrink: 0;
    width: 30px;
  }
`;

const MenuScore = styled.div`
  & > span {
    margin-right: 5px;
  }
`;

const InfoContainer = styled.div`
  display: block;
`;

const FavoriteModal = () => {
  const dispatch = useDispatch();

  const visited = JSON.parse(localStorage.getItem("visited"));
  const [isBookMarkMenu, setIsBookMarkMenu] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  const [post, setPost] = useState(false);

  const handleStar = useCallback((id, flag) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark`,
        {
          headers: {
            Authorization: Cookies.get("accessToken"),
          },
          shop_id: id,
          bookmark: flag,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (
          res.data.message === "add success" ||
          res.data.message === "remove success"
        ) {
          setPost(true);
        }
      });
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark`,
        {
          headers: {
            authorization: Cookies.get("accessToken"),
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.bookmark);
        setBookmark(res.data.bookmark);
        setPost(false);
      });
  }, [post]);

  return (
    <BackDropModal
      onClick={() => {
        dispatch(FavoriteAction(false));
      }}
    >
      <ExampleBody onClick={(e) => e.stopPropagation()}>
        <ButtonDiv>
          <button
            className={isBookMarkMenu ? "none" : "clicked"}
            onClick={() => {
              setIsBookMarkMenu(false);
            }}
          >
            최근 본 맛집
          </button>
          <button
            className={isBookMarkMenu ? "clicked" : "none"}
            onClick={() => {
              setIsBookMarkMenu(true);
            }}
          >
            가고 싶다
          </button>
        </ButtonDiv>

        {isBookMarkMenu ? (
          <InfoContainer>
            {bookmark.map((obj, i) => {
              return (
                <InfoDiv key={i}>
                  <Link href="/shopdetail/[id]" as={`/shopdetail/${obj.id}`}>
                    <img
                      src={obj.pic_URL}
                      alt="shop_pic"
                      onClick={() => {
                        dispatch(FavoriteAction(false));
                      }}
                      cursor="pointer"
                    />
                  </Link>
                  <div>
                    <MenuScore>
                      <span>{obj.shop_name}</span>
                      <span style={{ color: "#ffba34" }}>
                        {!obj.star_avg ? "0.0" : obj.star_avg?.toFixed(1)}
                      </span>
                    </MenuScore>
                    <span style={{ color: "grey", fontSize: 12 }}>
                      {obj.genus}
                    </span>
                  </div>
                  <span>
                    <StarFilled
                      style={{ fontSize: 30, color: "#f1c83e" }}
                      onClick={() => handleStar(obj.id, true)}
                      cursor="pointer"
                    />
                  </span>
                </InfoDiv>
              );
            })}
          </InfoContainer>
        ) : (
          <InfoContainer>
            {visited !== null ? (
              visited.map((obj, i) => {
                return (
                  <InfoDiv key={i}>
                    <Link href="/shopdetail/[id]" as={`/shopdetail/${obj.id}`}>
                      <img
                        src={obj.shop_pic}
                        onClick={() => {
                          dispatch(FavoriteAction(false));
                        }}
                        cursor="pointer"
                      />
                    </Link>
                    <div>
                      <MenuScore>
                        <span>{obj.shop_name}</span>
                        <span style={{ color: "#ffba34" }}>
                          {!obj.star_avg ? "0.0" : obj.star_avg?.toFixed(1)}
                        </span>
                      </MenuScore>
                      <span style={{ color: "grey", fontSize: 12 }}>
                        {obj.genus}
                      </span>
                    </div>

                    <span>
                      {!Cookies.get("accessToken") ? (
                        <Link href="/login">
                          <StarOutlined
                            style={{ fontSize: 30 }}
                            onClick={() => {
                              alert("로그인이 필요합니다.");
                            }}
                            cursor="pointer"
                          />
                        </Link>
                      ) : bookmark.length === 0 ? (
                        <StarOutlined
                          style={{ fontSize: 30 }}
                          onClick={() => handleStar(obj.id, false)}
                          cursor="pointer"
                        />
                      ) : bookmark.filter((el) => el.id === obj.id).length ===
                        0 ? (
                        <StarOutlined
                          style={{ fontSize: 30 }}
                          onClick={() => handleStar(obj.id, false)}
                          cursor="pointer"
                        />
                      ) : (
                        <StarFilled
                          style={{ fontSize: 30, color: "#f1c83e" }}
                          onClick={() => handleStar(obj.id, true)}
                          cursor="pointer"
                        />
                      )}
                    </span>
                  </InfoDiv>
                );
              })
            ) : (
              <></>
            )}
          </InfoContainer>
        )}
      </ExampleBody>
    </BackDropModal>
  );
};

export default FavoriteModal;
