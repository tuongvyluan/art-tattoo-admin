import PropTypes from "prop-types";
import { Ripple } from "./Ripple";

export const WidgetPricing = ({ title, subtitle, price, features, icon }) => (
  <>
    <div className="flex items-center justify-center mb-5 text-blue-500 py-4">
      {icon}
    </div>

    <div className="mb-5">
      <h5 className="mb-0">{title}</h5>
      <small className="mb-0 text-gray-500">{subtitle}</small>
    </div>

    <ul className="list-none mb-5">
      {features.map((feature, index) => (
        <li key={index}>{feature.title}</li>
      ))}
    </ul>

    <p className="mb-5 text-sm">
      Perfect for small startups that have less than 10 team members
    </p>

    <div className="mt-auto">
      <p className="font-bold text-5xl mb-4">
        <span className="symbol">$</span>
        <span>{price}</span>
      </p>

      <a className="relative inline-flex justify-center rounded-lg border border-gray-200 px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mb-4">
        <span>Choose plan</span>
        <Ripple color="black" />
      </a>
    </div>
  </>
);

WidgetPricing.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  price: PropTypes.number,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      available: PropTypes.bool,
    })
  ),
};
