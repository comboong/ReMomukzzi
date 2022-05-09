import styled from "styled-components";
import { useState, useEffect } from "react";

const MapDiv = styled.div`
  width: 400px;
  height: 400px;
  padding: 30px;
`;

const KaKaoMap = ({ Info, randomInt, detailXY }) => {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        let X;
        let Y;
        if (detailXY) {
          X = detailXY.y;
          Y = detailXY.x;
        } else {
          X = Info[randomInt].shopinfo.shopinfo.y;
          Y = Info[randomInt].shopinfo.shopinfo.x;
        }
        var locPosition = new kakao.maps.LatLng(X, Y); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        const container = document.getElementById("map");

        const options = {
          center: new window.kakao.maps.LatLng(X, Y),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: locPosition,
        });
        marker.setMap(map);
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  return <MapDiv id="map" />;
};

export default KaKaoMap;
