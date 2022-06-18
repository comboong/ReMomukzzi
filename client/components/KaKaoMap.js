import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MapDiv = styled.div``;

const KaKaoMap = () => {
	const mapXY = useSelector(state => state.mapXY);

	useEffect(() => {
		const mapScript = document.createElement("script");

		mapScript.async = true;
		mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPKEY}&autoload=false`;

		document.head.appendChild(mapScript);

		const onLoadKakaoMap = () => {
			window.kakao.maps.load(() => {
				var locPosition = new kakao.maps.LatLng(mapXY.x, mapXY.y); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

				const container = document.getElementById("map");
				container.style.width = "400px";
				container.style.height = "350px";
				container.style.margin = "auto";

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
