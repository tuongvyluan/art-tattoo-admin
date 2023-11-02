import { BackgroundImg, Carousel, CarouselIndicators, CarouselSlide } from "ui";

import { useState } from "react";

const TaskItem = ({ task, provided }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    const nextIndex =
      activeIndex === task.images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex =
      activeIndex === 0 ? task.images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  };

  return (
    <div
      className={`relative flex flex-col p-1 mb-4 min-w-0 break-words bg-white dark:bg-gray-600 rounded-lg shadow-sm ${
        task.color ? task.color : ""
      }`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="p-2">
        <p className="mb-0">{task.title}</p>
        <small className={`block ${task.images ? "mb-2" : ""}`}>
          {task.description}
        </small>

        {task.images && (
          <div className="relative w-full">
            <Carousel
              next={next}
              previous={previous}
              className="overflow-hidden rounded-lg"
              style={{ height: 150 }}
            >
              {task.images.map((image, index) => (
                <CarouselSlide
                  key={index}
                  index={index}
                  activeIndex={activeIndex}
                >
                  <BackgroundImg
                    className="relative w-full bg-top bg-center bg-cover"
                    image={image}
                    height={150}
                  />
                </CarouselSlide>
              ))}
              <CarouselIndicators
                items={task.images}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
