import { Avatar } from "./Avatar";
import PropTypes from "prop-types";

export const WidgetActivityStream = ({ stream }) => (
  <div className="activity relative">
    {stream.map((item, index) => (
      <div
        key={index}
        className="activity-item relative bg-transparent pb-3 m-0"
      >
        <div className="flex items-start justify-start">
          <span className="flex ltr:mr-3 rtl:ml-3 rounded-full relative border border-white">
            <Avatar size={48} src={item.avatar} alt={item.title} />
          </span>

          <div className="ltr:pl-3 rtl:pr-3">
            <span className="block pb-2">
              <small className="text-gray-600">
                <span>{item.subtitle}</span>
              </small>
              <span className="block">{item.title}</span>
            </span>
            <p>{item.body}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

WidgetActivityStream.propTypes = {
  stream: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      avatar: PropTypes.string,
      body: PropTypes.string,
    })
  ).isRequired,
};
