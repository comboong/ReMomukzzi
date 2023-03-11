import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MapDiv = styled.div`
  width: 350px;
  height: 350px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    width: 340px;
    height: 340px;
  }

  @media (max-width: 1024px) {
    width: 320px;
    height: 320px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    margin-bottom: 10px;
  }

  @media (max-width: 380px) {
    width: 270px;
    height: 270px;
    margin-bottom: 10px;
  }

  @media (max-width: 300px) {
    width: 250px;
    height: 250px;
    margin-bottom: 10px;
  }
`;

const KaKaoMap = () => {
  const mapXY = useSelector((state) => state.mapXY);

  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        var locPosition = new kakao.maps.LatLng(mapXY.x, mapXY.y);

        const container = document.getElementById("map");

        const options = {
          center: new window.kakao.maps.LatLng(mapXY.x, mapXY.y),
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
  }, [mapXY]);

  return <MapDiv id="map" />;
};

export default KaKaoMap;