import { ChevronLeft, ChevronRight } from "icons/solid";

import { Avatar } from "./Avatar";
import { Card } from "./Card";
import PropTypes from "prop-types";

export const WidgetNewsCard = ({ title, subtitle, feed }) => (
  <Card>
    <div className="w-full flex flex-row items-center justify-between py-2 px-2 ring-1 ring-black ring-opacity-5">
      <div className="list-none flex flex-row overflow-auto w-0 min-w-full -mb-10 pb-10">
        <div
          className={`text-center py-3 px-3 cursor-pointer flex flex-1`}
        >
          <a className="text-gray-900 dark:text-white hover:text-indigo">
            {title}
          </a>
        </div>
        {subtitle}
      </div>
    </div>
    <div className="flex flex-col">
      {feed.map((item, index) => (
        <a
          href="#"
          key={index}
          className={`relative block py-2 px-5 w-full text-gray-900 dark:text-white ${
            feed.length !== index + 1 &&
            "border-b border-solid border-gray-100 dark:border-gray-700"
          }`}
        >
          <div className="flex items-center py-1">
            <Avatar size={32} src={item.avatar} alt={item.subject} circular={false} />

            <div className="ltr:pl-3 rtl:pr-3">
              <span className="block font-medium">{item.subject}</span>
              <small>{item.message}</small>
            </div>
          </div>
        </a>
      ))}
    </div>
  </Card>
);

WidgetNewsCard.propTypes = {
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string,
      avatar: PropTypes.string,
      subject: PropTypes.string,
      message: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.element,
};
