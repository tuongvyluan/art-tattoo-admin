import {
  Bar,
  Bubble,
  Doughnut,
  HorizontalBar,
  Line,
  Pie,
  Polar,
  Radar,
  defaults,
} from "react-chartjs-2";

import PropTypes from "prop-types";

defaults.global.defaultFontColor = `rgb(107, 114, 128)`;

export const Chart = ({ type, data, height, options }) => {
  return (
    <>
      {type === "bar" && <Bar data={data} height={height} options={options} />}
      {type === "horizontalbar" && (
        <HorizontalBar data={data} height={height} options={options} />
      )}
      {type === "line" && (
        <Line data={data} height={height} options={options} />
      )}
      {type === "bubble" && (
        <Bubble data={data} height={height} options={options} />
      )}
      {type === "doughnut" && (
        <Doughnut data={data} height={height} options={options} />
      )}
      {type === "pie" && <Pie data={data} height={height} options={options} />}
      {type === "polar" && (
        <Polar data={data} height={height} options={options} />
      )}
      {type === "radar" && (
        <Radar data={data} height={height} options={options} />
      )}
    </>
  );
};

Chart.propTypes = {
  type: PropTypes.oneOf([
    "bar",
    "horizontalbar",
    "line",
    "bubble",
    "doughnut",
    "pie",
    "polar",
    "radar",
  ]).isRequired,
  data: PropTypes.any.isRequired,
  height: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
};
