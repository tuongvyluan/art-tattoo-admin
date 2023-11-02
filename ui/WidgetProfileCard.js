import { Card, CardBody } from "./Card";
import { Carousel, CarouselIndicators, CarouselSlide } from "./Carousel";

import { Avatar } from "./Avatar";
import { BackgroundImg } from "./BackgroundImg";
import PropTypes from "prop-types";
import { useState } from "react";

export const WidgetProfileCard = ({
  name,
  avatar,
  imageHeight,
  location,
  stats,
  images,
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
          className="rounded-t-lg overflow-hidden w-full h-full absolute top-0"
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
        <div className="absolute top-0 w-full text-center p-4">
          <div className="flex mb-4 justify-around items-center">
            <Avatar alt={name} src={avatar} size={100} />
          </div>
          <h6 className="mb-0 text-white">
            {name} - <small className="text-white">{location}</small>
          </h6>
        </div>
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

WidgetProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  imageHeight: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
};
