import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import classNames from "classnames";

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};


export const Ripple = ({ duration = 850, color = "#fff", className }) => {
  const [rippleArray, setRippleArray] = useState([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = event => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <div className={classNames(`absolute top-0 right-0 bottom-0 left-0 overflow-hidden`, className)} duration={duration} color={color} onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={"span" + index}
              className="ripple rounded-full absolute opacity-20 bg-gray-300 overflow-hidden"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                backgroundColor: color,
                animationDuration: `${duration}ms`
              }}
            />
          );
        })}
    </div>
  );
};

Ripple.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string
};
