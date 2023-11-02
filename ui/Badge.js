import PropTypes from "prop-types";
import classNames from "classnames";

export const Badge = ({ color = "blue", children, className, ...props }) => {
  return (
    <small
      {...props}
      className={classNames(
        `bg-${color}-500 border border-${color}-500 text-white inline-flex items-center rounded-lg px-1 h-4 font-bold text-xs`,
        className
      )}
    >
      {children}
    </small>
  );
};

Badge.propTypes = {
  color: PropTypes.oneOf([
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
