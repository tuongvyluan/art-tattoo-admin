import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";

import { Loading } from "ui";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapVector = () => (
  <div className="absolute inset-0 overflow-x-auto overflow-y-hidden whitespace-nowrap">
    <div className="h-workspace w-full">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-20.0, -52.0, 0],
          scale: 700,
        }}
        className="h-workspace w-full"
      >
        <ZoomableGroup zoom={1}>
          <Graticule stroke="#EAEAEC" />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#7f9cf5"
                  stroke="#f9f9fa"
                  strokeWidth="0.5"
                  className="cursor-pointer hover:opacity-80 outline-none"
                />
              ))
            }
          </Geographies>
          <Annotation
            subject={[2.3522, 48.8566]}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: "#4a5568",
              strokeWidth: 2,
              strokeLinecap: "round",
            }}
          >
            <text
              x="-8"
              textAnchor="end"
              alignmentBaseline="middle"
              fill="#1a202c"
            >
              {"Paris"}
            </text>
          </Annotation>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  </div>
);

export default MapVector;
