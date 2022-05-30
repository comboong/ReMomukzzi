import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import React from "react";
import { Input, Rate } from "antd";
import styled from "styled-components";
import { useState, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";

const ReviewContainer = styled.div`
  width: 50%;
  height: 700px;
  padding-top: 100px;
  margin: 0 auto;
  @media (max-width: 992px) {
    width: 60%;
    height: 700px;
    padding-top: 100px;
    margin: 0 auto;
  }
  @media (max-width: 660px) {
    width: 70%;
    height: 700px;
    padding-top: 100px;
    margin: 0 auto;
  }
`;
const TextArea = styled(Input.TextArea)`
  height: 120px;
  border: 1px solid gainsboro;
  resize: none;
`;

export const ReviewThumbnail = styled.div`
  margin: 10px 0 0 0;
  width: 100%;
  height: 100px;
  display: flex;
  & > img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid grey;
    margin-right: 5px;
  }
`;

export const ReviewLabelButton = styled.label`
  padding: 6px 6px;
  background-color: white;
  border-radius: 4px;
  color: black;
  border: 1px dotted grey;
  font-size: 24px;
  cursor: pointer;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReviewSubmitButtonDiv = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100px;
  display: flex;

  & > button {
    padding: 6px 6px;
    background-color: #ffba34;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    width: 100px;
    height: 50px;
  }
  .cancel {
    margin-left: auto;
    margin-right: 5px;
  }
  .submit {
  }
`;

const review = () => {
  const router = useRouter();
  const { shopName, id } = router.query;
  // const shop_name = JSON.parse(shopName);
  // const { TextArea } = Input;
  const [inputText, setInputText] = useState("");
  const [uploadImage, setUploadImage] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState([]);
  const [star, setStar] = useState(0);

  const handleInputText = useCallback((e) => {
    setInputText(e.target.value);
  });

  const handleStar = useCallback((value) => {
    setStar(value);
  });

  const deleteImage = (idx) => {
    if (window.confirm("해당 사진을 업로드 취소하시겠습니까?")) {
      setThumbnailImage([
        ...thumbnailImage.slice(0, idx),
        ...thumbnailImage.slice(idx + 1),
      ]);
    }
  };

  const onImageChange = (e) => {
    setThumbnailImage([
      ...thumbnailImage,
      URL.createObjectURL(e.target.files[0]),
    ]);
    setUploadImage([...uploadImage, e.target.files[0]]);
  };

  const uploadReview = () => {
    // if (selectedStar === 0) {
    //   alert("평점을 선택해주세요.");
    //   return;
    // }
    try {
      const reviewData = new FormData();
      reviewData.append("star", star);
      reviewData.append("comment", inputText);
      reviewData.append("shop_id", id);
      // for (var pair of reviewData.entries()) {
      //   console.log(pair[0] + "," + pair[1]);
      // }
      uploadImage.map((item) => {
        return reviewData.append("img", item);
      });

      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/reviews`, reviewData, {
          headers: {
            authorization: Cookies.get("accessToken"),
          },
        })
        .then((res) => {
          console.log(res);
          alert("리뷰 작성이 완료되었습니다.");
          router.back();
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <ReviewContainer>
        <div>
          <span style={{ fontSize: 24, fontWeight: "bold" }}>{shopName}</span>에
          대한 리뷰를 작성해주세요.
        </div>
        <Rate onChange={handleStar} value={star} />
        <TextArea
          showCount
          maxLength={200}
          placeholder="이 곳에 리뷰를 작성해 주세요"
          onChange={handleInputText}
          style={{ marginTop: 20 }}
        />

        <div style={{ marginTop: 20, fontWeight: "bold" }}>사진 업로드</div>
        <ReviewThumbnail>
          {thumbnailImage.map((item, idx) => {
            return (
              <img key={idx} src={item} onClick={() => deleteImage(idx)} />
            );
          })}
          <ReviewLabelButton htmlFor="upload_file">+</ReviewLabelButton>
          <input
            type="file"
            id="upload_file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onImageChange}
          />
        </ReviewThumbnail>
        <ReviewSubmitButtonDiv>
          <button
            className="cancel"
            onClick={() => {
              if (window.confirm("리뷰 작성을 취소하시겠습니까?")) {
                // window.location.replace(`/shopdetail/${match.params.shop_id}`);
              }
            }}
          >
            취소
          </button>

          <button className="submit" onClick={uploadReview}>
            리뷰 올리기
          </button>
        </ReviewSubmitButtonDiv>
      </ReviewContainer>
      <Footer />
    </React.Fragment>
  );
};

export default review;
