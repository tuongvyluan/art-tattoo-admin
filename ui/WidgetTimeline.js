import { Card, CardBody } from "./Card";

import PropTypes from "prop-types";
import { formatDistance } from "date-fns";

export const WidgetTimeline = ({ title, timeline }) => {
  timeline.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="relative">
      {title && (
        <div className="relative flow-root sm:text-center mb-5">
          <button className="inline-flex justify-center rounded-lg border border-transparent px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
            {timeline ? title : "Loading ..."}
          </button>
        </div>
      )}
      {timeline &&
        timeline.map((item, index) => (
          <div
            key={index}
            className={`relative flow-root py-5 timeline-item ${
              index === 0 ? "timeline-item-first" : ""
            }`}
          >
            <span
              className={`sm:w-1/2  hidden sm:inline-block sm:absolute sm:top-0 mt-2 ${
                index % 2
                  ? "sm:ltr:text-left sm:rtl:text-right sm:ltr:right-0 sm:rtl:left-0"
                  : "sm:ltr:text-right sm:rtl:text-left sm:ltr:left-0 sm:rtl:right-0"
              }`}
            >
              <span
                className={`block w-10 h-1 bg-gray-300 ${
                  index % 2
                    ? "sm:ltr:float-left sm:rtl:float-right"
                    : "sm:ltr:float-right sm:rtl:float-left"
                }`}
              />
            </span>
            <small
              className={`sm:w-1/2 inline-block sm:absolute sm:top-0 text-gray-800 ${
                index % 2
                  ? "ltr:pl-4 rtl:pr-4 sm:ltr:text-right sm:rtl:text-left sm:ltr:pr-10 sm:rtl:pl-10 sm:ltr:left-0 sm:rtl:right-0"
                  : "ltr:pl-4 rtl:pr-4 sm:ltr:pl-10 sm:rtl:pr-10 sm:ltr:right-0 sm:rtl:left-0"
              }`}
            >
              {formatDistance(new Date(item.date), new Date())}&nbsp;ago
            </small>
            <div
              className={`sm:w-1/2 block sm:inline-block relative mt-0 sm:-mt-5 ${
                index % 2
                  ? "sm:ltr:float-right sm:rtl:float-left"
                  : "sm:ltr:float-left sm:rtl:float-right"
              }`}
            >
              <div
                className={`${
                  index % 2
                    ? "sm:ltr:float-left sm:rtl:float-right sm:ltr:ml-4 sm:rtl:mr-4"
                    : "sm:ltr:float-right sm:rtl:float-left sm:ltr:mr-4 sm:rtl:ml-4"
                }`}
              >
                <Card>
                  <CardBody>
                    <p className="mb-0">{item.text}</p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

WidgetTimeline.propTypes = {
  title: PropTypes.string,
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};
