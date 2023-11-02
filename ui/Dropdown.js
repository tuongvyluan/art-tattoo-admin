import { createContext, useContext, useReducer } from "react";

import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";

const DropdownContext = createContext({});
const { Provider } = DropdownContext;
const dropdownState = () => useContext(DropdownContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "toggle": {
      const newState = {
        ...state,
        open: typeof action.value !== "undefined" ? action.value : !state.open,
      };
      return newState;
    }

    default:
      return state;
  }
};

export const Dropdown = ({ children, className, ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    open: false,
  });
  const ref = useOnclickOutside(
    () => state.open && dispatch({ type: "toggle" })
  );

  return (
    <Provider value={[state, dispatch]}>
      <div
        ref={ref}
        {...props}
        className={classNames(`select-none inline-block`, className)}
      >
        {children}
      </div>
    </Provider>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const DropdownToggle = ({ children, className, ...props }) => {
  const [state, dispatch] = dropdownState();
  return (
    <div
      {...props}
      className={classNames(
        `flex items-center justify-between relative rounded cursor-pointer`,
        className
      )}
      onClick={(e) => dispatch({ type: "toggle" })}
    >
      {children}
    </div>
  );
};

DropdownToggle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const DropdownMenu = ({ children, className, style, ...props }) => {
  const [state] = dropdownState();

  return (
    <Transition
      show={state.open}
      enter="transition ease-out duration-150"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      {...props}
      className={classNames(
        `z-10 absolute bg-white ltr:right-0 rtl:left-0 ltr:origin-top-right rtl:origin-top-left mt-1 w-auto rounded-lg shadow-lg ltr:left-auto rtl:right-auto ring-1 ring-black ring-opacity-5 `,
        className
      )}
      style={{ minWidth: "150px", top: "100%", ...style }}
    >
      {children}
    </Transition>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};
