/**
 * 카카오맵 컴포넌트 (보류)
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState, useRef } from 'react';
import Map from 'react-kakao-maps-sdk';

const { kakao } = window;

const KakaoMap = memo(({ startMyAddress, arriveMyAddress }) => {

  const mapRef = useRef();

  const [startPosition, setStartPosition] = useState('');
  console.log("startPosition >>> ", startPosition);
  const [arrivePosition, setArrivePosition] = useState('');
  console.log("arrivePosition >>> ",arrivePosition);

  useEffect(() => {
    /**
     * 카카오맵 생성
     */
    const mapContainer = mapRef.current;
    // 지도 시작위치
    const mapOption = {
      center: new kakao.maps.LatLng(37.566535, 126.97796919),
      level: 3,
    };
    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

    /** 주소로 출발지 좌표를 검색한다. */
    startMyAddress && geocoder.addressSearch(startMyAddress, (result, status) => {
      if(status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setStartPosition(coords);

        map.panTo(coords)

        /** 결과값으로 출발 마커 생성 */
        const startMarkerSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png';
        const startMarkerarkerSize = new kakao.maps.Size(50, 47);
        const startMarkerOption = {
          offset: new kakao.maps.Point(15, 43),
        };
        
        const startImage = new kakao.maps.MarkerImage(startMarkerSrc, startMarkerarkerSize, startMarkerOption);
        
        const startMarker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: startImage,
        });
    
        // 정보 표시
        const startInfoContent = `<div style="padding: 30px">${startMyAddress}</div>`;
        const startInfoPosition = new kakao.maps.LatLng(37.462882421, 127.139002132);
    
        const startInfoWindow = new kakao.maps.InfoWindow({
          content: startInfoContent,
          position: startInfoPosition,
        });
    
        // 마우스 이벤트
        kakao.maps.event.addListener(startMarker, 'mouseover', () => {
          startInfoWindow.open(map, startMarker);
        });
        kakao.maps.event.addListener(startMarker, 'mouseout', () => {
          startInfoWindow.close();
        });
      }
    })
    // 경기 성남시 수정구 수정로 319 (산성역포레스티아아파트)
    /** 주소로 도착지 좌표를 검색한다. */
    arriveMyAddress && geocoder.addressSearch(arriveMyAddress, (result, status) => {
      if(status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setArrivePosition(coords);

        map.panTo(coords);

        /** 결과값으로 도착 마커 생성 */
        const arriveMarkerSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png';
        const arriveMarkerarkerSize = new kakao.maps.Size(50, 64);
        const arriveMarkerOption = {
          offset: new kakao.maps.Point(15, 54),
        };
    
        const arriveMarkerImage = new kakao.maps.MarkerImage(arriveMarkerSrc, arriveMarkerarkerSize, arriveMarkerOption);
    
        const arriveMarker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: arriveMarkerImage,
        });
    
        // 정보 표시
        const arriveInfoContent = "<div style='padding: 30px'></div>";
        const arriveInfoPosition = new kakao.maps.LatLng(37.462882421, 127.139002132);
    
        const arriveInfoWindow = new kakao.maps.InfoWindow({
          content: arriveInfoContent,
          position: arriveInfoPosition,
        });
    
        // 마우스 이벤트
        kakao.maps.event.addListener(arriveMarker, 'mouseover', () => {
          arriveInfoWindow.open(map, arriveMarker);
        });
        kakao.maps.event.addListener(arriveMarker, 'mouseout', () => {
          arriveInfoWindow.close();
        });
      }
    })

    /**
     * 연결선 생성
     */
    const firstPolyline = [
      new kakao.maps.LatLng(startPosition.Ma, startPosition.La ),
      new kakao.maps.LatLng(arrivePosition.Ma, arrivePosition.La),
    ];

    startPosition && new kakao.maps.Polyline({
      map: map,
      path: firstPolyline,
      strokeWeight: 5,
      strokeColor: 'red',
      strokeStyle: 'dashed'
    });

    // 컨트롤러 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  }, [startMyAddress, arriveMyAddress]);

  return <div id="map" className="kakao-map" style={{ width: '100%', height: '600px' }} ref={mapRef} />;
});

export default KakaoMap;


















/*
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

const KakaoMap = memo(({ address }) => {
  const [info, setInfo] = useState('ㅋㅋㅋ');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState('');
  const [search, setSearch] = useState('경기 용인시 수지구 포은대로 435');
  console.log('search >>>', search);

  const { kakao } = window;

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(search, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds에 좌표 추가
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });

          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    });
  }, [map, search, kakao.maps]);
  
  useEffect(() => {
    // setSearch(address);

  }, [address]);

  return (
    <div>
      <Map
        center={{
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: '50%',
          height: '500px',
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => {
          console.log('map에 있는 마커 >>> ', marker);
          return (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat}, ${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && <div>{marker.contnet}</div>}
            </MapMarker>
          );
        })}
      </Map>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(address);
        }}
      >
        <input type="text" name="search" placeholder="검색어 입력" />
        <button type="submit">검색</button>
      </form>
    </div>
  );
});
*/
