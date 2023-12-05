import PropTypes from "propTypes";

const Heading = ({ children }) => {
	return <div className="font-semibold text-xl pb-2">{children}</div>;
};

Heading.propTypes = {
  children: PropTypes.node
}

export default Heading;