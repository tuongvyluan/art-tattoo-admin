import PropTypes from "prop-types";
import classNames from "classnames";

export const Card = ({ children, className, ...props }) => (
  <div
    {...props}
    className={classNames(
      `relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full bg-white dark:bg-gray-600`,
      className
    )}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardBody = ({ children, className, ...props }) => (
  <div {...props} className={classNames(`px-6 py-6 relative`, className)}>
    {children}
  </div>
);

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
