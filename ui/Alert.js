import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { X } from "icons/solid";
import classNames from "classnames";
import { useState } from "react";

export const Alert = ({ color = "blue", children, className, ...props }) => {
  const [shown, setShown] = useState(true);
  return (
    <Transition
      show={shown}
      appear={true}
      enter="transition ease-out duration-150"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-150"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      {...props}
      className={classNames(
        `bg-${color}-100 text-${color}-700 px-4 py-3 rounded-lg relative ring-1 ring-${color}-400 ring-opacity-50`,
        className
      )}
      role="alert"
    >
      {children}
      <span
        className="absolute top-0 bottom-0 ltr:right-0 rtl:left-0 px-4 py-3 cursor-pointer"
        onClick={() => setShown(false)}
      >
        <X width={16} height={16} />
      </span>
    </Transition>
  );
};

Alert.propTypes = {
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
