import { ChevronLeft, ChevronRight } from "icons/solid";

import PropTypes from "prop-types";
import {Ripple} from "./Ripple";
import { Transition } from "@headlessui/react";
import classNames from "classnames";

export const CarouselLeftArrow = ({ onClick, className, ...props }) => (
  <a
    {...props}
    className={classNames(
      `z-40 cursor-pointer absolute top-0 left-0 h-full flex items-center pl-5 text-white`,
      className
    )}
    onClick={onClick}
  >
    <ChevronLeft width={18} height={18} />
    <Ripple />
  </a>
);

CarouselLeftArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const CarouselRightArrow = ({ onClick, className, ...props }) => (
  <a
    {...props}
    className={classNames(
      `z-40 cursor-pointer absolute top-0 right-0 h-full flex items-center pr-5 text-white`,
      className
    )}
    onClick={onClick}
  >
    <ChevronRight width={18} height={18} />
    <Ripple />
  </a>
);

CarouselRightArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const CarouselIndicators = ({
  activeIndex,
  items,
  onClickHandler,
  className,
  ...props
}) => (
  <ul
    {...props}
    className={classNames(
      `absolute bottom-0 z-20 text-center w-full flex flex-row justify-center py-3`,
      className
    )}
  >
    {items.map((item, index) => (
      <li key={index}>
        <a
          className={
            index == activeIndex
              ? "block w-5 h-1 bg-white mx-1 cursor-pointer"
              : "block w-5 h-1 bg-gray-500 mx-1 cursor-pointer"
          }
          onClick={() => onClickHandler(index)}
        />
      </li>
    ))}
  </ul>
);

CarouselIndicators.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const CarouselSlide = ({
  index,
  activeIndex,
  children,
  className,
  ...props
}) => (
  <Transition
    show={index === activeIndex}
    appear={true}
    enter="transition ease-out duration-300"
    enterFrom="transform opacity-0"
    enterTo="transform opacity-100"
    leave="transition ease-in duration-300"
    leaveFrom="transform opacity-100"
    leaveTo="transform opacity-0"
    {...props}
    className={classNames(
      "relative text-center ml-auto mr-auto z-10",
      className
    )}
  >
    {children}
  </Transition>
);

CarouselSlide.propTypes = {
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const Carousel = ({ next, previous, children, className, ...props }) => (
  <div
    {...props}
    className={classNames(`relative z-0 overflow-hidden`, className)}
  >
    <CarouselLeftArrow onClick={previous} />

    {children}

    <CarouselRightArrow onClick={next} />
  </div>
);

Carousel.propTypes = {
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
