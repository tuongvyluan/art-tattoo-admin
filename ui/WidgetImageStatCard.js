import { Card, CardBody } from "./Card";
import { Carousel, CarouselIndicators, CarouselSlide } from "./Carousel";

import { BackgroundImg } from "./BackgroundImg";
import PropTypes from "prop-types";
import { useState } from "react";

export const WidgetImageStatCard = ({ images, imageHeight, stats }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
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
                className="relative w-full bg-top bg-center bg-cover"
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
      </div>
      <CardBody>
        <div className="flex justify-around">
          {stats.map((stat, index) => (
            <div className="text-center" key={index}>
              <h5 className="mb-0 font-medium">{stat.value}</h5>
              <small>{stat.title}</small>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

WidgetImageStatCard.propTypes = {
  images: PropTypes.array.isRequired,
  imageHeight: PropTypes.number.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
};
