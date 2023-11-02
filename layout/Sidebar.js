import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";

const Sidebar = ({
  open,
  width,
  onSetOpen,
  sidebar,
  children,
  breakpoint,
  rootClass,
  sidebarClass,
  contentClass,
  overlayClass,
}) => {
  const isOverlayVisibile = open && breakpoint;

  return (
    <div className={`app-root relative flex flex-row flex-auto ${rootClass}`}>
      <Transition show={open}>
        <Transition.Child
          enter="transition ease-in-out duration-150 transform"
          enterFrom="ltr:-translate-x-full rtl:translate-x-full"
          enterTo="ltr:translate-x-0 rtl:-translate-x-0"
          leave="transition ease-in-out duration-150 transform"
          leaveFrom="ltr:translate-x-0 rtl:-translate-x-0"
          leaveTo="ltr:-translate-x-full rtl:translate-x-full"
          className={`app-sidebar z-40 md:z-40 top-0 bottom-0 flex-auto flex-shrink-0 shadow-lg h-screen md:h-full ${sidebarClass} fixed ${
            breakpoint ? "" : "ltr:left-0 rtl:right-0"
          }`}
          style={{
            maxWidth: `${width}px`,
            minWidth: `${width}px`,
          }}
        >
          {sidebar}
        </Transition.Child>

        <Transition.Child
          enter="transition-opacity ease-linear duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div
              ref={ref}
              className="z-30 fixed inset-0 block md:hidden"
              onClick={() => isOverlayVisibile && onSetOpen(false)}
            >
              <div className="absolute inset-0 opacity-75 bg-gray-900" />
            </div>
          )}
        </Transition.Child>
      </Transition>

      <div
        className={`relative flex flex-col flex-auto min-w-0 overflow-visible ${contentClass}`}
      >
        {children}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onSetOpen: PropTypes.func,
};

Sidebar.defaultProps = {
  open: false,
  onSetOpen: () => {},
};

export default Sidebar;
