import { useTranslation } from "i18n";

const currentDate = new Date();

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <>
      <div className="dark:text-gray-200 text-gray-700">
        <div className="px-5 py-3 mx-auto flex items-start sm:items-center sm:flex-row flex-col">
          <p className="text-sm sm:py-2 sm:mt-0 mt-4">
            &copy; 2023 {t("tagline")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
