import { Avatar, Link } from "ui";

import { useTranslation } from "i18n";

const Lockscreen = () => {
  const { t } = useTranslation("lockscreen");
  return (
    <div className="flex flex-col justify-center items-center px-3 bg-white dark:bg-gray-600 min-h-screen">
      <div className="w-full max-w-sm">
        <div className="flex justify-center flex-col my-3 text-center">
          <Avatar
            size={100}
            src={`images/face4.jpg`}
            alt={`avatar`}
            className="inline-block mx-auto"
            status="yellow"
          />
          <p className="text-gray-800 my-3">John Doe</p>
        </div>
        <form action="/">
          <div className="rounded-lg shadow-sm">
            <div>
              <input
                aria-label={t("passCode")}
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
                placeholder={t("passCode")}
              />
            </div>
          </div>

          <button
            className="shadow-sm relative w-full flex justify-center py-3 px-4 border border-transparent text-sm rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out my-3 leading-none"
            type="submit"
          >
            {t("unlockButton")}
            <Ripple />
          </button>
        </form>
        <div className="text-center">
          <small className="text-muted text-center">
            <span>{t("yourAccount?")}</span>{" "}
            <Link href="/auth/signin" as={`login`}>
              <a>{t("loginLink")}</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Lockscreen;
