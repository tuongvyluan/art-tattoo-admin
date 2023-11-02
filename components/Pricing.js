import { Card, CardBody, WidgetPricing } from "ui";
import { ColorSwatch, CursorClick, Link, Moon } from "icons/solid";

import { useTranslation } from "i18n";

const data = [
  {
    icon: <ColorSwatch width={32} height={32} />,
    title: "Standard Licence",
    subtitle: "Test account",
    price: 0,
    features: [
      {
        title: "Secure",
      },
      {
        title: "1 user",
      },
      {
        title: "Analytics",
      },
    ],
  },
  {
    icon: <Moon width={32} height={32} />,
    title: "Basic License",
    subtitle: "Freelancer",
    price: 10,
    features: [
      {
        title: "Secure",
      },
      {
        title: "2 users",
      },
      {
        title: "Analytics",
      },
    ],
  },
  {
    icon: <CursorClick width={32} height={32} />,
    title: "Managed License",
    subtitle: "Small business",
    price: 49,
    features: [
      {
        title: "Secure",
      },
      {
        title: "3 users",
      },
      {
        title: "Analytics",
      },
    ],
  },
  {
    icon: <Link width={32} height={32} />,
    title: "Extended License",
    subtitle: "Corporate",
    price: 99,
    features: [
      {
        title: "Secure",
      },
      {
        title: "∞ users",
      },
      {
        title: "Analytics",
      },
    ],
  },
];

const PricingComponent = () => {
  const { t } = useTranslation("pricing");
  return (
    <>
      <div className="text-center my-3">
        <h1 className="text-2xl font-bolder">{t("title")}</h1>
        <h6>{t("subtitle")}</h6>

        <div className="inline-flex items-center justify-center w-full mb-10">
          {t("monthly")}&nbsp;
          <label
            htmlFor="toogle"
            className="flex items-center cursor-pointer mx-3"
          >
            <div className="relative">
              <input id="toogle" type="checkbox" className="hidden" />
              <div className="toggle__bar h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div className="toggle__handle absolute transform bg-white rounded-full shadow-sm transform transition duration-150 ease-in-out"></div>
            </div>
          </label>
          &nbsp;{t("yearly")}
        </div>
      </div>

      <div className="block xl:flex flex flex-wrap flex-row items-stretch ">
        {data.map((item, index) => (
          <div
            className="w-full lg:w-2/4 xl:w-1/4 px-2 text-center px-3 py-5"
            key={index}
          >
            <Card
              key={index}
              className={`${index === 1 ? "border border-indigo-500" : ""}`}
            >
              <CardBody>
                <WidgetPricing
                  title={item.title}
                  subtitle={item.subtitle}
                  price={item.price}
                  features={item.features}
                  icon={item.icon}
                />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default PricingComponent;
