import { Card, CardBody } from "./Card";

import PropTypes from "prop-types";
import { Ripple } from "./Ripple";

export const WidgetStatCard = ({
  reverse,
  fill,
  title,
  subtitle,
  value,
  icon,
  type,
}) => {
  let before = null,
    after = null;

  const cardIcon = (
    <button
      className={`${fill ? 'bg-white bg-opacity-20':'bg-'+type+'-100'} text-${type}-600 relative rounded-full flex justify-center w-12 h-12 flex items-center justify-center focus:outline-none`}
    >
      {icon}
      <Ripple className="rounded-full" />
    </button>
  );

  if (icon) {
    reverse ? (before = cardIcon) : (after = cardIcon);
  }

  return (
    <Card
      className={`bg-${fill ? type : "white"}-500 dark:bg-${
        fill ? type : "white"
      }-500`}
    >
      <CardBody>
        <div className="flex-auto">
          <div className="flex flex-wrap items-center">
            {before}
            {reverse && <span className="flex-auto" />}
            <div className={`relative ${reverse ? "text-right" : ""}`}>
              <h5
                className={`uppercase font-semibold text-xs  ${
                  fill ? "text-gray-300" : "text-gray-500"
                }`}
              >
                <small>{title}</small>
              </h5>
              <span
                className={`mb-0 font-semibold text-md text-lg ${
                  fill ? "text-white" : "text-current"
                }`}
              >
                {value}
              </span>
            </div>
            {!reverse && <span className="flex-auto" />}
            {after}
          </div>
          {subtitle && (
            <p
              className={`text-xs mt-2 ${reverse ? "text-right" : ""} ${
                fill ? "text-gray-200" : "text-gray-500"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

WidgetStatCard.propTypes = {
  fill: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.element,
  type: PropTypes.oneOf([
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
  ]),
};
