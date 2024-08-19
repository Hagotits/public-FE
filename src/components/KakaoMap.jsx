import React, { useState, useEffect } from "react";
import { Map, CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import "./KakaoMap.css";

const KakaoMapAPI = ({ detailLocation, onLocationChange }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState(null);
  const [position, setPosition] = useState(null);
  const [addressConfirmed, setAddressConfirmed] = useState(false);

  // 현재 위치 불러옴(geolocation)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  // 주소 얻기
  const getAddress = (lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);
    const callback = (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
        setAddressConfirmed(true);
        onLocationChange({
          lat,
          lng,
          address: result[0].address.address_name,
        });
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  return (
    <div>
      <Map
        center={{
          lat: location.latitude,
          lng: location.longitude,
        }}
        level={4}
        style={{
          position: "relative",
          width: "500px",
          height: "300px",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(_t, mouseEvent) => {
          const lat = mouseEvent.latLng.getLat();
          const lng = mouseEvent.latLng.getLng();
          setPosition({ lat, lng });
          getAddress(lat, lng);
        }}
      >
        {position && <MapMarker position={position} />}
        {position && (
          <CustomOverlayMap position={position} yAnchor={1.3}>
            <div
              style={{
                minWidth: "160px",
                minHeight: "50px",
                position: "relative",
                zIndex: 1000,
              }}
            >
              <div style={{ padding: "2px" }}>
                {address && (
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      border: "1.5px solid gray",
                      borderRadius: "10px",
                      backgroundColor: "white",
                      textAlign: "center",
                      position: "relative",
                      zIndex: 1001,
                    }}
                  >
                    {address.address_name}
                  </div>
                )}
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </div>
  );
};

export default KakaoMapAPI;
