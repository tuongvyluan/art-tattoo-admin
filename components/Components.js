import {
  Alert,
  Avatar,
  BackgroundImg,
  Badge,
  Card,
  CardBody,
  Carousel,
  CarouselIndicators,
  CarouselSlide,
  Ripple
} from "ui";
import { InformationCircle, LockClosed } from "icons/solid";

import { useState } from "react";
import { useTranslation } from "i18n";

const Components = () => {
  const { t } = useTranslation("components");
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    `images/unsplash/2.jpg`,
    `images/unsplash/1.jpg`,
    `images/unsplash/13.jpg`,
  ];

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
    <div className="flex flex-wrap -mx-2">
      <div className="w-full xl:w-1/2 px-2">
        <div className="mb-5">
          <h2 className="mb-2 text-md font-medium">{t("alerts")}</h2>
          <Alert color="blue" className="mb-2">
            <strong className="font-bold mr-1 rtl:ml-1">
              Holy smokes!
            </strong>
            <span className="block sm:inline">
              Something seriously bad happened.
            </span>
          </Alert>

          <Alert color="gray" className="mb-2">
            <strong className="font-bold mr-1 rtl:ml-1">
              Holy smokes!
            </strong>
            <span className="block sm:inline">
              Something seriously bad happened.
            </span>
          </Alert>

          <Alert color="green" className="mb-2">
            <strong className="font-bold mr-1 rtl:ml-1">
              Holy smokes!
            </strong>
            <span className="block sm:inline">
              Something seriously bad happened.
            </span>
          </Alert>

          <Alert color="red" className="mb-2">
            <strong className="font-bold mr-1 rtl:ml-1">
              Holy smokes!
            </strong>
            <span className="block sm:inline">
              Something seriously bad happened.
            </span>
          </Alert>

          <Alert color="yellow" className="mb-2">
            <strong className="font-bold mr-1 rtl:ml-1">
              Holy smokes!
            </strong>
            <span className="block sm:inline">
              Something seriously bad happened.
            </span>
          </Alert>

          <Alert color="indigo" className="mb-2">
            <div className="flex">
              <div className="py-1">
                <InformationCircle
                  width={24}
                  height={24}
                  className="mr-4 rtl:ml-4"
                />
              </div>
              <div>
                <p className="font-bold">Our privacy policy has changed</p>
                <p className="text-sm">
                  Make sure you know how these changes affect you.
                </p>
              </div>
            </div>
          </Alert>
        </div>

        <div className="mb-5">
          <h2 className="mb-2 text-md font-medium">{t("badge")}</h2>
          <Badge color="blue" className="mr-2 rtl:ml-2">
            1
          </Badge>

          <Badge color="gray" className="mr-2 rtl:ml-2">
            2
          </Badge>

          <Badge color="green" className="mr-2 rtl:ml-2">
            3
          </Badge>

          <Badge color="red" className="mr-2 rtl:ml-2">
            4
          </Badge>

          <Badge color="yellow" className="mr-2 rtl:ml-2">
            5
          </Badge>

          <Badge color="indigo" className="mr-2 rtl:ml-2">
            Badge
          </Badge>
        </div>

        <div className="mb-5">
          <h2 className="mb-2 text-md font-medium">{t("pagination")}</h2>
          <div className="inline-flex flex-wrap">
            <button className="relative inline-flex justify-center rounded-l-lg rtl:rounded-r-lg border border-white px-4 py-3 bg-white font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
              {t("previous")}
              <Ripple color="black" />
            </button>
            <button className="relative inline-flex justify-center border-t border-b border-r rtl:border-l border-white px-4 py-3 bg-white font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
              1
              <Ripple color="black" />
            </button>
            <button className="relative inline-flex justify-center border-t border-b border-r rtl:border-l border-white px-4 py-3 bg-white font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
              2
              <Ripple color="black" />
            </button>
            <button className="relative inline-flex justify-center border-t border-b border-r rtl:border-l border-white px-4 py-3 bg-white font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
              3
              <Ripple color="black" />
            </button>
            <button className="relative inline-flex justify-center rounded-r-lg rtl:rounded-l-lg border border-white px-4 py-3 bg-white font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
              {t("next")}
              <Ripple color="black" />
            </button>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="mb-2 text-md font-medium">{t("card")}</h2>
          <Card className="max-w-sm w-full lg:max-w-full lg:flex">
            <BackgroundImg
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg lg:rtl:rounded-r-lg text-center overflow-hidden"
              image="images/unsplash/1.jpg"
            />
            <CardBody>
              <div className="mb-8">
                <p className="text-sm flex items-center">
                  <LockClosed
                    width={14}
                    height={14}
                    className="mr-2 rtl:ml-2"
                  />
                  Members only
                </p>
                <div className="font-bold text-xl mb-2">
                  Can coffee make you a better developer?
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="flex items-center">
                <Avatar
                  size={48}
                  src={`images/face4.jpg`}
                  alt={`avatar`}
                  className="mr-4 rtl:ml-4"
                  status="green"
                />
                <div className="text-sm">
                  <p className="leading-none">Jonathan Reinink</p>
                  <ps>Aug 18</ps>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="w-full xl:w-1/2 px-2">
        <div className="mb-5">
          <h2 className="mb-2 text-md font-medium">{t("buttons")}</h2>
          <div className="flex flex-wrap mb-2">
            <a className="relative inline-block rounded-lg px-4 py-3 bg-white text-sm leading-none text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple color="black" />
            </a>
            <a className="relative inline-block rounded-lg px-4 py-3 bg-indigo-500 text-gray-100 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple />
            </a>
            <a className="relative inline-block rounded-lg px-4 py-3 bg-green-500 text-gray-100 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple />
            </a>
            <a className="relative inline-block rounded-lg px-4 py-3 bg-blue-500 text-gray-100 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple />
            </a>
            <a className="relative inline-block rounded-lg px-4 py-3 bg-yellow-500 text-gray-100 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple />
            </a>
            <a className="relative inline-block rounded-lg border border-white px-4 py-2 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mt-1">
              <InformationCircle width={20} height={20} />
              <Ripple />
            </a>
          </div>

          <div className="flex flex-wrap mb-2">
            <a className="relative inline-block rounded-lg ring-1 ring-gray-400 ring-opacity-50 px-4 py-3 text-gray-600 hover:text-gray-500 focus:outline-none focus:border-gray-400 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple color="black" />
            </a>
            <a className="relative inline-block rounded-lg ring-1 ring-indigo-400 ring-opacity-50 px-4 py-3 text-indigo-400 hover:text-indigo-500 focus:outline-none focus:border-indigo-400 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple color="black" />
            </a>
            <a className="relative inline-block rounded-lg ring-1 ring-green-400 ring-opacity-50 px-4 py-3 text-green-400 hover:text-green-500 focus:outline-none focus:border-green-400 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple color="black" />
            </a>
            <a className="relative inline-block rounded-lg ring-1 ring-blue-400 ring-opacity-50 px-4 py-3 text-blue-400 hover:text-blue-500 focus:outline-none focus:border-blue-400 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple color="black" />
            </a>
            <a className="relative inline-block rounded-lg ring-1 ring-yellow-400 ring-opacity-50 px-4 py-3 text-yellow-400 hover:text-yellow-500 focus:outline-none focus:border-yellow-400 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              Button
              <Ripple color="black" />
            </a>
            <a className="relative inline-block rounded-lg border border-gray-500 px-4 py-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:border-gray-400 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none mr-1 rtl:ml-1 mt-1">
              <InformationCircle width={20} height={20} />
              <Ripple color="black" />
            </a>
          </div>

          <div className="flex flex-wrap">
            <button className="relative inline-flex justify-center rounded-l-lg rtl:rounded-r-lg border border-white px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
              Button
              <Ripple color="black" />
            </button>
            <button className="relative inline-flex justify-center border-t border-b border-white px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
              Button
              <Ripple color="black" />
            </button>
            <button className="relative inline-flex justify-center rounded-r-lg rtl:rounded-l-lg border border-white px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
              Button
              <Ripple color="black" />
            </button>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="mb-2 text-md font-medium">{t("avatar")}</h2>

          <div className="block sm:flex mb-2">
            <div className="inline-flex mr-4 rtl:ml-4">
              <Avatar size={16} src={`images/face1.jpg`} alt={`avatar`} />
              <Avatar size={32} src={`images/face2.jpg`} alt={`avatar`} />
              <Avatar size={48} src={`images/face3.jpg`} alt={`avatar`} />
              <Avatar size={64} src={`images/face4.jpg`} alt={`avatar`} />
            </div>
            <div className="inline-flex">
              <Avatar
                size={64}
                src={`images/face4.jpg`}
                alt={`avatar`}
                status={
                  ["red", "green", "blue", "yellow", "gray"][
                    Math.floor(Math.random() * 5)
                  ]
                }
              />
              <Avatar
                size={48}
                src={`images/face3.jpg`}
                alt={`avatar`}
                status={
                  ["red", "green", "blue", "yellow", "gray"][
                    Math.floor(Math.random() * 5)
                  ]
                }
              />
              <Avatar
                size={32}
                src={`images/face2.jpg`}
                alt={`avatar`}
                status={
                  ["red", "green", "blue", "yellow", "gray"][
                    Math.floor(Math.random() * 5)
                  ]
                }
              />
              <Avatar
                size={16}
                src={`images/face1.jpg`}
                alt={`avatar`}
                status={
                  ["red", "green", "blue", "yellow", "gray"][
                    Math.floor(Math.random() * 5)
                  ]
                }
              />
            </div>
          </div>
          <div className="flex">
            <Avatar
              size={64}
              src={`images/face1.jpg`}
              alt={`avatar`}
              className="ring-4 ring-gray-100 ring-opacity-95"
            />
            <Avatar
              size={64}
              src={`images/face2.jpg`}
              alt={`avatar`}
              className="-ml-5 ring-4 ring-gray-100 ring-opacity-95"
            />
            <Avatar
              size={64}
              src={`images/face3.jpg`}
              alt={`avatar`}
              className="-ml-5 ring-4 ring-gray-100 ring-opacity-95"
            />
            <Avatar
              size={64}
              src={`images/face4.jpg`}
              alt={`avatar`}
              className="-ml-5 ring-4 ring-gray-100 ring-opacity-95"
            />
          </div>
          <div className="flex">
            <Avatar
              size={64}
              src={`images/face1.jpg`}
              alt={`avatar`}
              className="ring-4 ring-gray-100 ring-opacity-95"
              circular={false}
            />
            <Avatar
              size={64}
              src={`images/face2.jpg`}
              alt={`avatar`}
              className="-ml-5 ring-4 ring-gray-100 ring-opacity-95"
              circular={false}
            />
            <Avatar
              size={64}
              src={`images/face3.jpg`}
              alt={`avatar`}
              className="-ml-5 ring-4 ring-gray-100 ring-opacity-95"
              circular={false}
            />
            <Avatar
              size={64}
              src={`images/face4.jpg`}
              alt={`avatar`}
              className="-ml-5 ring-4 ring-gray-100 ring-opacity-95"
              circular={false}
            />
          </div>
        </div>

        <div className="mb-5">
          <h2 className="mb-2 text-md font-medium">{t("carousel")}</h2>
          <Carousel
            next={next}
            previous={previous}
            className="rounded-lg overflow-hidden"
            style={{
              height: "350px",
            }}
          >
            {images.map((image, index) => (
              <CarouselSlide
                key={index}
                index={index}
                activeIndex={activeIndex}
              >
                <BackgroundImg
                  className="relative w-full bg-top bg-cover"
                  image={image}
                  height="350px"
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
      </div>
    </div>
  );
};

export default Components;
