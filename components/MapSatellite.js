import MapGL, { GeolocateControl } from "react-map-gl";

import { useState } from "react";

const MapSatellite = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: 46,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });

  const _onViewportChange = (viewport) => setViewport(viewport);

  return (
    <div className="h-full">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onViewportChange={_onViewportChange}
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
        <GeolocateControl
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            margin: 10,
          }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  );
};

export default MapSatellite;
