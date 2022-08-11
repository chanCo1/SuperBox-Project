/**
 * 카카오맵
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState, useRef } from 'react';
import Map from 'react-kakao-maps-sdk';

const { kakao } = window;

const KakaoMap = memo(({ sendAddress, sendAddress2, arriveAddress, arriveAddress2 }) => {

  const mapRef = useRef();

  const [startPosition, setStartPosition] = useState('');
  const [arrivePosition, setArrivePosition] = useState('');
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    /**
     * 카카오맵 생성
     */
    const mapContainer = mapRef.current;
    // 지도 시작위치
    const mapOption = {
      center: new kakao.maps.LatLng(37.4979931764546, 127.02760161038849),
      level: 3,
    };
    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

    /** 
     * 주소로 출발지 좌표를 검색한다. 
     */
    sendAddress && geocoder.addressSearch(sendAddress, (result, status) => {
      if(status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setStartPosition(coords);
        setFlag(true);

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
        const startInfoContent = `<div style="padding: 20px">${sendAddress} &nbsp;</div>`;
        const startInfoPosition = new kakao.maps.LatLng(startPosition.Ma, startPosition.La);
    
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

        // 주소 입력시에만 화면 이동
        if(flag) {
          map.panTo(coords);
          setFlag(false);
        }
      }
    });

    /** 
     * 주소로 도착지 좌표를 검색한다. 
     */
    arriveAddress && geocoder.addressSearch(arriveAddress, (result, status) => {
      if(status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setArrivePosition(coords);
        setFlag(false);

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
        const arriveInfoContent = `<div style="padding: 20px;">${arriveAddress} &nbsp;</div>`;
        const arriveInfoPosition = new kakao.maps.LatLng(arrivePosition.Ma, arrivePosition.La);
    
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

        // map.panTo(coords);
      }
    });

    /**
     * 연결선 생성
     */
    const polyline = [
      new kakao.maps.LatLng(startPosition.Ma, startPosition.La),
      new kakao.maps.LatLng(arrivePosition.Ma, arrivePosition.La),
    ];

    arrivePosition && new kakao.maps.Polyline({
      map: map,
      path: polyline,
      strokeWeight: 7,
      strokeColor: 'red',
      strokeStyle: 'dashed'
    });

    // 컨트롤러 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    /** 
     * 지도 범위 재설정 
     */
    if(startPosition.La && arrivePosition.La) {

      let bounds = new kakao.maps.LatLngBounds();
      for(let i = 0; i < polyline.length; i++) {
        // LatLngBounds 객체에 좌표 추가
        // console.log(polyline[i]);
        bounds.extend(polyline[i]);
      }
  
      map.setBounds(bounds);
    }

    map.relayout();

  }, [sendAddress, arriveAddress, startPosition.La, startPosition.Ma, arrivePosition.La, arrivePosition.Ma]);

  return <div id="map" className="kakao-map" style={{ width: '100%', height: '500px' }} ref={mapRef} />
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
