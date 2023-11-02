import { Link, Logo } from "ui";

import Illustration from "public/images/illustrations/undraw_collection_u2np.svg";
import { useTranslation } from "i18n";

const Maintenance = () => {
  const { t } = useTranslation("maintenance");
  return (
    <div className="flex flex-col justify-center items-center px-3 bg-white dark:bg-gray-600 min-h-screen">
      <div className="w-full max-w-screen-xl">
        <div className="block md:flex flex-wrap items-center -mx-2">
          <div className="w-full md:w-1/2 px-2 text-center order-last flex justify-center">
            <div className="w-full md:max-w-md p-2">
              <Illustration className="w-64 md:w-full h-64 md:h-auto inline-block" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              <div className="text-center mb-5 text-indigo-500">
                <Logo height={50} width={50} />
              </div>
              <div className="text-center mb-5">
                <h1 className="uppercase text-4xl mb-0 font-bold leading-none text-teal-500">
                  {t("title")}
                </h1>

                <p className="text-gray-800 dark:text-white mt-5">
                  {t("subTitle")}
                </p>
              </div>

              <div className="text-center">
                <small className="text-gray-700 text-center">
                  <span>{t("keepUpdated?")}</span>{" "}
                  <Link href="/">
                    <a>{t("readBlock")}</a>
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

export default Maintenance;
