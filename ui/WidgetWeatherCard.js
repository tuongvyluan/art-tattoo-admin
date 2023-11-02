import { Card, CardBody } from "./Card";
import { capitalize, fetcher } from "lib";

import { Divider } from "./Divider";
import { Loading } from "./Loading";
import PropTypes from "prop-types";
import format from "date-fns/format";
import useSWR from "swr";

const units = {
  feels_like: "°",
  grnd_level: "cm",
  humidity: "%",
  pressure: "KPa",
  sea_level: "cm",
  temp: "°",
  temp_kf: "°",
  temp_max: "°",
  temp_min: "°",
};

const DescriptionItem = ({ title, content }) => (
  <div className="flex mb-2 justify-between items-center">
    <span>{capitalize(title.replace(/_/g, " "))}</span>
    <small className="px-2 inline-block">
      {content}
      &nbsp;{units[title]}
    </small>
  </div>
);

const ForecastItem = ({ content }) => (
  <span className="block my-1">{content}</span>
);

export const WidgetWeatherCard = ({ city, country, days }) => {
  const { data, error } = useSWR(
    `/api/weather?city=${city}&country=${country}&days=${days}`,
    fetcher
  );

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

  if (data.cod === 401)
    return (
      <div className="flex items-center justify-center h-full">
        {data.message}
      </div>
    );

  return (
    data && (
      <Card>
        <CardBody>
          <div className="flex mb-4 justify-between items-center">
            <div>
              <h5 className="mb-0 font-medium text-xl">{`${data.city.name}, ${data.city.country}`}</h5>
              <h6 className="mb-0">
                {format(data.list[0].dt * 1000, "MMMM dd yyyy")}
              </h6>
              <small>{capitalize(data.list[0].weather[0].description)}</small>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-4xl mb-0">
                <span>{data.list[0].main.temp}&deg;</span>
              </h3>
            </div>
          </div>
          <div className="block sm:flex justify-between items-center flex-wrap">
            {Object.keys(data.list[0].main)
              .filter((item) => item !== "temp_kf")
              .map((key, index) => (
                <div key={index} className="w-full sm:w-1/2">
                  <DescriptionItem
                    title={key}
                    content={data.list[0].main[key]}
                  />
                </div>
              ))}
          </div>
        </CardBody>
        <Divider text="Forecast" />
        <CardBody>
          <div
            className="text-center justify-between items-center flex"
            style={{ flexFlow: "initial" }}
          >
            {data.list.map(
              (day, index) =>
                index !== 0 && (
                  <div
                    className="text-center mb-0 flex items-center justify-center flex-col"
                    key={index}
                  >
                    <ForecastItem content={format(day.dt * 1000, "E")} />
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      className="block w-8 h-8"
                    />
                    <ForecastItem content={`${day.main.temp}°`} />
                  </div>
                )
            )}
          </div>
        </CardBody>
      </Card>
    )
  );
};

WidgetWeatherCard.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  days: PropTypes.number,
};
