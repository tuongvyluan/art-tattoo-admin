import { Link, Logo, Ripple } from "ui";

import Illustration from "public/images/illustrations/undraw_Group_chat_unwm.svg";
import { useTranslation } from "i18n";

const Login = () => {
  const { t } = useTranslation("login");
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
              <form action="/">
                <div className="text-center mb-5">
                  <h1 className="uppercase text-2xl mb-3 font-bold leading-none text-indigo-500">
                    {t("title")}
                  </h1>
                  <p className="text-gray-800">{t("subtitle")}</p>
                </div>

                <div className="rounded-lg shadow-sm">
                  <div className="block mb-3">
                    <label>{t("emailAddress")}</label>
                    <input
                      aria-label={t("emailAddress")}
                      name="email"
                      type="email"
                      required
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
                      placeholder={t("emailAddress")}
                    />
                  </div>
                  <div className="block mb-3">
                    <label>{t("password")}</label>
                    <input
                      aria-label={t("password")}
                      name="password"
                      type="password"
                      required
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
                      placeholder={t("password")}
                    />
                  </div>
                </div>

                <button
                  className="shadow-sm relative w-full flex justify-center py-3 px-4 border border-transparent text-sm rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out mb-3 leading-none"
                  type="submit"
                >
                  {t("loginButton")}
                  <Ripple />
                </button>
              </form>
              <div className="text-center">
                <small className="text-gray-700 text-center">
                  <span>{t("haveAccount?")}</span>{" "}
                  <Link href="/register">
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
export default Login;
