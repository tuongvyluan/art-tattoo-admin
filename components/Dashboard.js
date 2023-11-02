import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import {
  Card,
  CardBody,
  Chart,
  Loading,
  Ripple,
  WidgetPostCard,
  WidgetStatCard,
  WidgetWeatherCard
} from "ui";
import { LightningBolt, ThumbUp, UserAdd, Users } from "icons/solid";
import { memo, useState } from "react";

import { fetcher } from "lib";
import { geoCentroid } from "d3-geo";
import { scaleQuantile } from "d3-scale";
import useSWR from "swr";
import { useTranslation } from "i18n";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const colorMap = [
  "rgb(223, 98, 34)",
  "rgb(234, 142, 79)",
  "rgb(238, 185, 122)",
  "rgb(235, 227, 167)",
  "rgb(125, 195, 174)",
  "rgb(84, 153, 144)",
];

const MapCard = memo((states) => {
  const { t } = useTranslation("dashboard");
  const colorScale = scaleQuantile()
    .domain(states.data.map(({ value1 }) => value1))
    .range(colorMap);

  return (
    <Card>
      <CardBody>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full xl:w-1/2 px-2">
            <div className="w-full text-center flex flex-col justify-center">
              <h3 className="uppercase font-bold text-sm">{t("mapTitle")}</h3>

              <div className="inline-flex justify-center">
                <span className="h-5 font-medium text-xs hidden sm:visible">
                  {t("failed")}
                </span>
                {colorMap.map((color, index) => (
                  <span
                    className="w-8 h-5 mx-3 rounded-lg cursor-pointer hover:opacity-50"
                    style={{ background: color }}
                    key={index}
                  ></span>
                ))}
                <span className="h-5 font-medium text-xs hidden sm:visible">
                  {t("passed")}
                </span>
              </div>
            </div>

            <ComposableMap projection="geoAlbersUsa">
              <Geographies geography={geoUrl}>
                {({ geographies }) => (
                  <>
                    {geographies.map((geo) => {
                      const cur = states.data.find((s) => s.val === geo.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          stroke="#FFF"
                          geography={geo}
                          strokeWidth={0.5}
                          fill={colorScale(cur.value1)}
                          className="cursor-pointer hover:opacity-50 outline-none"
                        />
                      );
                    })}
                    {geographies.map((geo) => {
                      const centroid = geoCentroid(geo);
                      const cur = states.data.find((s) => s.val === geo.id);
                      return (
                        <g key={geo.rsmKey + "-name"}>
                          {cur &&
                            centroid[0] > -160 &&
                            centroid[0] < -67 &&
                            (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                              <Marker coordinates={centroid}>
                                <text
                                  y="2"
                                  fontSize={14}
                                  textAnchor="middle"
                                  className="font-medium text-xs fill-current"
                                >
                                  {cur.id}
                                </text>
                              </Marker>
                            ) : (
                              <Annotation
                                subject={centroid}
                                dx={offsets[cur.id][0]}
                                dy={offsets[cur.id][1]}
                              >
                                <text
                                  x={4}
                                  fontSize={14}
                                  alignmentBaseline="middle"
                                  className="font-medium text-xs fill-current"
                                >
                                  {cur.id}
                                </text>
                              </Annotation>
                            ))}
                        </g>
                      );
                    })}
                  </>
                )}
              </Geographies>
            </ComposableMap>
          </div>
          <div className="w-full xl:w-1/2 px-2">
            <table className="border-collapse w-full relative">
              <colgroup>
                <col span="1" style={{ width: "150px" }} />
                <col span="1" style={{ width: "120px" }} />
                <col span="1" style={{ width: "120px" }} />
                <col span="1" style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="ltr:text-right rtl:text-left py-2 px-1"></th>
                  <th className="ltr:text-right rtl:text-left py-2 px-1">
                    <span className="bg-green-100 ring-1 ring-green-400 ring-opacity-50 text-green-700 px-2 py-1 rounded-lg font-medium uppercase text-xs">
                      {t("passed")}
                    </span>
                  </th>
                  <th className="ltr:text-right rtl:text-left py-2 px-1">
                    <span className="bg-red-100 ring-1 ring-red-400 ring-opacity-50 text-red-700 px-2 py-1 rounded-lg font-medium uppercase text-xs">
                      {t("failed")}
                    </span>
                  </th>
                  <th className="py-2 px-1"></th>
                </tr>
              </thead>
              <tbody>
                {states.data
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 8)
                  .map((state) => (
                    <tr key={state.id}>
                      <td className="ltr:text-right rtl:text-left py-3 px-1">
                        {state.name}
                      </td>
                      <td className="ltr:text-right rtl:text-left py-3 px-1">
                        {state.value1}
                      </td>
                      <td className="ltr:text-right rtl:text-left py-3 px-1">
                        {state.value2}
                      </td>
                      <td className="py-3 px-1">
                        <div className="w-full my-1 rounded-lg ltr:ml-3 rtl:mr-3">
                          <div
                            className="py-1 text-center text-white h-1 rounded-lg"
                            style={{
                              width: `${state.val}%`,
                              background: colorScale(state.value1),
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap -mx-2 text-left md:text-center">
          <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
            <div className="px-4 py-4 relative">
              <div className="flex-auto">
                <div className="flex flex-wrap items-center justify-start md:justify-center">
                  <div className="relative">
                    <h5 className="uppercase font-bold text-xs  text-gray-500">
                      <small>{t("newTests")}</small>
                    </h5>
                    <span className="mb-0 font-medium text-md text-lg text-current">
                      576,789
                      <span className="text-xs font-normal">
                        <span className="text-green-500"> 1.6% ▲ </span>
                        {t("totalTests")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
            <div className="px-4 py-4 relative">
              <div className="flex-auto">
                <div className="flex flex-wrap items-center justify-start md:justify-center">
                  <div className="relative">
                    <h5 className="uppercase font-bold text-xs text-gray-500">
                      <small>{t("weeklyTests")}</small>
                    </h5>
                    <span className="mb-0 font-medium text-md text-lg text-current">
                      99.99%
                      <span className="text-xs font-normal">
                        <span className="text-green-500"> 2% ▲ </span>
                        {t("totalTests")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
            <div className="px-4 py-4 relative">
              <div className="flex-auto">
                <div className="flex flex-wrap items-center justify-start md:justify-center">
                  <div className="relative">
                    <h5 className="uppercase font-bold text-xs text-gray-500">
                      <small>{t("weeklyPasses")}</small>
                    </h5>
                    <span className="mb-0 font-medium text-md text-lg text-current">
                      465,563
                      <span className="text-xs font-normal">
                        <span className="text-red-500"> 3.4% ▼ </span>
                        {t("totalTests")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
            <div className="px-4 py-4 relative">
              <div className="flex-auto">
                <div className="flex flex-wrap items-center justify-start md:justify-center">
                  <div className="relative">
                    <h5 className="uppercase font-bold text-xs text-gray-500">
                      <small>{t("weeklyFails")}</small>
                    </h5>
                    <span className="mb-0 font-medium text-md text-lg text-current">
                      7,578
                      <span className="text-xs font-normal">
                        <span className="text-green-500"> 1.9% ▲ </span>
                        {t("totalTests")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
});

const Dashboard = () => {
  const { t } = useTranslation("dashboard");
  const { data, error } = useSWR(`/api/dashboard`, fetcher);
  const [dataSet, setDataSet] = useState("gold");

  if (error) return <div>Failed to load dashboard data</div>;
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("newUsers")}
            value={"576,789"}
            icon={<Users width={16} height={16} />}
            type={"blue"}
          />
        </div>
        <div className="w-full md:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("weeklyUptime")}
            value={"99.99%"}
            icon={<LightningBolt width={16} height={16} />}
            type={"gray"}
          />
        </div>
        <div className="w-full md:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("weeklyVisitors")}
            value={"465,563"}
            icon={<UserAdd width={16} height={16} />}
            type={"indigo"}
          />
        </div>
        <div className="w-full md:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("pageLikes")}
            value={"7,578"}
            icon={<ThumbUp width={16} height={16} />}
            type={"red"}
          />
        </div>
      </div>

      <MapCard data={data.allStates} />

      <Card>
        <div className="block sm:flex items-center content-center px-4 py-4">
          <div className="flex-auto">
            <h5 className="uppercase font-medium text-xs text-gray-500">
              <small className="block">{t("performance")}</small>
            </h5>
            <span className="mb-0 font-medium text-base">
              {t("salesAnalytics")}
            </span>
          </div>
          <div className="inline-flex mt-1 sm:mt-0">
            <button
              className={`relative inline-flex justify-center ltr:rounded-l-lg rtl:rounded-r-lg border border-indigo-500 px-5 py-1 ${
                dataSet === "gold"
                  ? "bg-indigo-500 text-gray-200 hover:text-white"
                  : "bg-white text-gray-700 hover:text-indigo-500"
              } focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm`}
              onClick={() => setDataSet("gold")}
            >
              {t("gold")}
              <Ripple className="ltr:rounded-l-lg rtl:rounded-r-lg" />
            </button>
            <button
              className={`relative inline-flex justify-center border-t border-b border-indigo-500 px-5 py-1 ${
                dataSet === "silver"
                  ? "bg-indigo-500 text-gray-200 hover:text-white"
                  : "bg-white text-gray-700 hover:text-indigo-500"
              } focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm`}
              onClick={() => setDataSet("silver")}
            >
              {t("silver")}
              <Ripple />
            </button>
            <button
              className={`relative inline-flex justify-center ltr:rounded-r-lg rtl:rounded-l-lg border border-indigo-500 px-5 py-1 ${
                dataSet === "bronze"
                  ? "bg-indigo-500 text-gray-200 hover:text-white"
                  : "bg-white text-gray-700 hover:text-indigo-500"
              } focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm`}
              onClick={() => setDataSet("bronze")}
            >
              {t("bronze")}
              <Ripple className="ltr:rounded-r-lg rtl:rounded-l-lg" />
            </button>
          </div>
        </div>
        <div className="py-4 relative px-1">
          <Chart
            type="line"
            data={(canvas) => {
              let chartData = data.dashboardData.chart.data;
              const ctx = canvas.getContext("2d");
              let gradient = ctx.createLinearGradient(0, 0, 0, 150);
              gradient.addColorStop(
                0,
                chartData.datasets[0].borderColor
                  .replace(/rgb/i, "rgba")
                  .replace(/\)/i, ",0.4)")
              );
              gradient.addColorStop(
                1,
                chartData.datasets[0].borderColor
                  .replace(/rgb/i, "rgba")
                  .replace(/\)/i, ",0)")
              );

              chartData.datasets[0].backgroundColor = gradient;
              chartData.datasets[0].data = data.dashboardData.chart[dataSet];
              return chartData;
            }}
            height={data.dashboardData.chart.height}
            options={data.dashboardData.chart.options}
          />
        </div>
      </Card>

      <div className="flex flex-wrap -mx-2">
        {data.dashboardData.charts.map((chart, index) => (
          <div className="w-full xl:w-1/3 px-2" key={index}>
            <Card>
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <h5 className="w-full flex justify-between uppercase font-medium text-xs text-gray-500">
                    <small>{t("overview")}</small>
                  </h5>
                  <span className="mb-0 font-medium text-base">
                    {chart.title}
                  </span>
                </div>
                <span className="font-medium text-xl">{chart.value}</span>
              </div>
              <CardBody
                className={`${
                  chart.type !== "pie" ? "pl-0 pr-0 pt-0 pb-0" : ""
                }`}
              >
                <Chart
                  type={chart.type}
                  data={(canvas) => {
                    let chartData = chart.data;
                    const ctx = canvas.getContext("2d");
                    let gradient = ctx.createLinearGradient(0, 0, 0, 100);
                    gradient.addColorStop(
                      0,
                      chartData.datasets[0].borderColor
                        .replace(/rgb/i, "rgba")
                        .replace(/\)/i, ",0.4)")
                    );
                    gradient.addColorStop(
                      1,
                      chartData.datasets[0].borderColor
                        .replace(/rgb/i, "rgba")
                        .replace(/\)/i, ",0)")
                    );

                    chartData.datasets[0].backgroundColor = gradient;
                    return chartData;
                  }}
                  height={chart.height}
                  options={chart.options}
                />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full lg:w-1/2 px-2">
          <WidgetWeatherCard city="london" country="gb" days={7} />
        </div>

        <div className="w-full lg:w-1/2 px-2">
          <WidgetPostCard
            title={t("shrimpChorizo")}
            subtitle={t("yesterday")}
            images={[`images/unsplash/1.jpg`, `images/unsplash/15.jpg`]}
            imageHeight={285}
            text="Phileas Fogg and Aouda went on board, where they found Fix already installed. Below deck was a square cabin, of which the walls bulged out in the form of cots, above a circular divan; in the centre was a table provided with a swinging lamp."
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
