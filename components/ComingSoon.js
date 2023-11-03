import { Link, Logo, Ripple } from "ui";

import Illustration from "public/images/illustrations/undraw_modern_art_x3qc.svg";
import { useInterval } from "lib";
import { useState } from "react";
import { useTranslation } from "i18n";

const launch = new Date();
launch.setDate(launch.getDate() + 2);

const Timer = ({ localization }) => {
  const [countdown, setCountDown] = useState({
    days: 88,
    minutes: 88,
    hours: 88,
    seconds: 88,
  });

  useInterval(() => {
    const now = new Date().getTime();
    const t = launch - now;
    const dd = Math.floor(t / (1000 * 60 * 60 * 24));
    const hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const ss = Math.floor((t % (1000 * 60)) / 1000);

    const days = dd < 10 ? "0" + dd : dd;
    const hours = hh < 10 ? "0" + hh : hh;
    const minutes = mm < 10 ? "0" + mm : mm;
    const seconds = ss < 10 ? "0" + ss : ss;

    setCountDown({ days, minutes, hours, seconds });
  }, 1000);

  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-1/4 px-2">
        <div className="flex flex-col text-center">
          <span className="font-bold text-2xl">{countdown.days}</span>
          <span className="text-gray-700 text-xs">{localization.days}</span>
        </div>
      </div>
      <div className="w-1/4 px-2">
        <div className="flex flex-col">
          <span className="font-bold text-2xl">{countdown.hours}</span>
          <span className="text-gray-700 text-xs">{localization.hours}</span>
        </div>
      </div>
      <div className="w-1/4 px-2">
        <div className="flex flex-col">
          <span className="font-bold text-2xl">{countdown.minutes}</span>
          <span className="text-gray-700 text-xs">{localization.minutes}</span>
        </div>
      </div>
      <div className="w-1/4 px-2">
        <div className="flex flex-col">
          <span className="font-bold text-2xl">{countdown.seconds}</span>
          <span className="text-gray-700 text-xs">{localization.seconds}</span>
        </div>
      </div>
    </div>
  );
};

const ComingSoon = () => {
  const { t } = useTranslation("coming-soon");
  return (
    <div className="flex flex-col justify-center items-center px-3 bg-white dark:bg-gray-600 min-h-screen">
      <div className="w-full max-w-screen-xl">
        <div className="block md:flex flex-wrap items-center -mx-2">
          <div className="w-full md:w-1/2 px-2 text-center order-last flex justify-center">
            <div className="w-full md:max-w-md p-2">
              <Illustration className="w-64 md:w-full h-64 md:h-auto  inline-block" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              <div className="text-center mb-5 text-indigo-500">
                <Logo height={50} width={50} />
              </div>
              <div className="text-center mb-5">
                <h1 className="uppercase text-2xl mb-3 font-bold leading-none text-indigo-500">
                  {t("title")}
                </h1>
              </div>
              <Timer
                localization={{
                  days: t("days"),
                  hours: t("hours"),
                  minutes: t("minutes"),
                  seconds: t("seconds"),
                }}
              />
              <p className="text-gray-800 mt-5 mb-3">{t("subtitle")}</p>

              <div className="rounded-lg shadow-sm">
                <div className="-mt-px">
                  <input
                    aria-label={t("emailAddress")}
                    name="email"
                    type="email"
                    required
                    className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-t-lg rounded-b-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
                    placeholder={t("emailAddress")}
                  />
                </div>
              </div>

              <button className="shadow-sm relative w-full flex justify-center py-3 px-4 border border-transparent text-sm rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out my-3 leading-none">
                {t("notifyButton")}
                <Ripple />
              </button>

              <div className="text-center">
                <small className="text-gray-700 text-center">
                  <span>{t("haveAccount?")}</span>{" "}
                  <Link href="/auth/register">
                    <a>{t("createAccount")}</a>
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
