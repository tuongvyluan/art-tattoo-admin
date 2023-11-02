import { Card, CardBody } from "./Card";
import { Carousel, CarouselIndicators, CarouselSlide } from "./Carousel";

import { BackgroundImg } from "./BackgroundImg";
import PropTypes from "prop-types";
import { useState } from "react";

export const WidgetPostCard = ({
  title,
  subtitle,
  text,
  images,
  imageHeight,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <Card>
      <div className="relative w-full">
        <Carousel
          next={next}
          previous={previous}
          className="rounded-t-lg overflow-hidden"
          style={{
            height: imageHeight,
          }}
        >
          {images.map((image, index) => (
            <CarouselSlide key={index} index={index} activeIndex={activeIndex}>
              <BackgroundImg
                className="relative w-full bg-top bg-center bg-cover bg-fallback"
                image={image}
                height={imageHeight}
              />
            </CarouselSlide>
          ))}
          <CarouselIndicators
            items={images}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
        </Carousel>
        <div
          className="absolute bottom-0 left-0 w-full p-4 z-0 bg-gradient-to-b from-transparent to-black"

        >
          <h6 className="mb-0 text-white">{title}</h6>
          <small className="mb-0 text-gray-400">{subtitle}</small>
        </div>
      </div>

      <CardBody>{text}</CardBody>
    </Card>
  );
};

WidgetPostCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  imageHeight: PropTypes.number.isRequired,
};
