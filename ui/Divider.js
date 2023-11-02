import PropTypes from "prop-types";

export const Divider = ({ text }) => {
  return (
    <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap">
      <span className="inline-block px-3">
        <small>{text}</small>
      </span>
    </div>
  );
};

Divider.propTypes = {
  text: PropTypes.string,
};
