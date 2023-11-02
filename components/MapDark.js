import { Link, Loading } from "ui";
import MapGL, { Marker, NavigationControl, Popup } from "react-map-gl";

import { fetcher } from "lib";
import useSWR from "swr";
import { useState } from "react";

const CityPin = ({ size = 20, onClick }) => (
  <svg
    height={size}
    viewBox="0 0 24 24"
    style={{
      fill: "#d00",
      stroke: "none",
      transform: `translate(${-size / 2}px,${-size}px)`,
    }}
    onClick={onClick}
  >
    <path
      d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
    />
  </svg>
);

const CityInfo = ({ info }) => {
  const displayName = `${info.city}, ${info.state}`;

  return (
    <>
      <div>
        {displayName} |{" "}
        <Link
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
        >
          <a target="_new">Wikipedia</a>
        </Link>
      </div>
      <img width={240} src={info.image} />
    </>
  );
};

const MapDark = () => {
  const { data, error } = useSWR(`/api/cities`, fetcher);
  const [viewport, setViewport] = useState({
    latitude: 37.785164,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });
  const [popupInfo, setPopupInfo] = useState(null);

  const _updateViewport = (viewport) => {
    setViewport(viewport);
  };

  const _renderCityMarker = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
      >
        <CityPin size={20} onClick={() => setPopupInfo(city)} />
      </Marker>
    );
  };

  const _renderPopup = () =>
    popupInfo && (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => setPopupInfo(null)}
      >
        <CityInfo info={popupInfo} />
      </Popup>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load map data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={_updateViewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOXAPI}
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        overflow: "hidden",
        flex: "1 1 auto",
        flexDirection: "row",
        display: "flex",
      }}
    >
      {data.map(_renderCityMarker)}
      {_renderPopup()}
      <NavigationControl onViewportChange={_updateViewport} />
    </MapGL>
  );
};

export default MapDark;
