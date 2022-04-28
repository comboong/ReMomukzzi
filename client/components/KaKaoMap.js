import styled from "styled-components";
import { useState, useEffect } from "react";

const KaKaoMap = ({ Info }) => {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    console.log(Info[0].shopinfo.shopinfo.y);
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        var locPosition = new kakao.maps.LatLng(
          Info[0].shopinfo.shopinfo.y,
          Info[0].shopinfo.shopinfo.x
        ); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        const container = document.getElementById("map");

        const options = {
          center: new window.kakao.maps.LatLng(
            Info[0].shopinfo.shopinfo.y,
            Info[0].shopinfo.shopinfo.x
          ),
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

  return <div id="map" style={{ width: 400, height: 300 }} />;
};

export default KaKaoMap;
