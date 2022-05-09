import styled from "styled-components";
import Link from "next/link";
import React from "react";

const IntroImage = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
`;

function getShuffledArray(arr, n) {
  let newArr = [...arr];
  newArr.splice(n, 1);
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  console.log(newArr);
  return newArr;
}

const IntroImageSet = ({ imageInfo }) => {
  const imageInfoCut = imageInfo.slice(0, 8);
  return (
    <>
      {imageInfoCut.map((el) => {
        return (
          <React.Fragment key={el.shopinfo.shop_id}>
            <Link
              href="/shopdetail/[id]"
              as={`/shopdetail/${el.shopinfo.shop_id}`}
            >
              <IntroImage
                key={el.shopinfo.shop_id}
                src={el.shoppic.photodatas[0]}
              />
            </Link>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default IntroImageSet;
