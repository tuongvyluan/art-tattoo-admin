import { Card, Loading } from "ui";
import { MinusCircle, PlusCircle, QuestionMarkCircle } from "icons/solid";

import AnimateHeight from "react-animate-height";
import { fetcher } from "lib";
import useSWR from "swr";
import { useState } from "react";
import { useTranslation } from "i18n";

const Accordion = ({data}) => {
  const [active, setActive] = useState(0);

  return data.map((item, index) => (
    <div
      className={`py-4 items-center ${
        index + 1 === item.length
          ? ""
          : "border-b border-solid border-gray-200 dark:border-gray-700 "
      }`}
      key={index}
    >
      <a
        onClick={() => setActive(index)}
        className={`flex items-center cursor-pointer ${
          active === index
            ? "text-indigo-500 font-medium"
            : "text-gray-900 dark:text-white"
        }`}
      >
        <QuestionMarkCircle width={16} height={16} />
        <span className="ltr:ml-3 rtl:mr-3 flex-1">
          {item.title}
        </span>
        {active === index ? (
          <MinusCircle width={16} height={16} />
        ) : (
          <PlusCircle width={16} height={16} />
        )}
      </a>
      <AnimateHeight
        duration={150}
        height={active === index ? "auto" : 0}
      >
        <div className={`mt-3 block text-gray-700 block pl-6 ml-1`}>
          {item.answer}
        </div>
      </AnimateHeight>
    </div>
  ))
}

const Faq = () => {
  const { t } = useTranslation("faq");

  const { data, error } = useSWR(`/api/faq`, fetcher);

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load media data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="bg-radial text-white p-5 mb-3 -mx-4 -my-4">
        <div className="p-8">
          <div className="text-center my-3">
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <h6>{t("subtitle")}</h6>

            <div className="bg-white mt-4 rounded-lg shadow-lg px-6 py-3 w-full flex items-center space-x-6">
              <input
                type="text"
                placeholder={t("ask")}
                className="text-base w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-2 -mt-12">
        <div className="w-full sm:w-full lg:w-2/4 px-2">
          <Card>
            <div className="rounded-b-lg p-5">
              <div className="p-5">
                <div className="flex flex-col">
                  <Accordion data={data} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full sm:w-full lg:w-2/4 px-2">
          <Card>
            <div className="rounded-b-lg p-5">
              <div className="p-5">
                <div className="flex flex-col">
                  <Accordion data={data} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default Faq;
