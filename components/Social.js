import {
  Avatar,
  Card,
  CardBody,
  Divider,
  Img,
  Loading,
  Ripple,
  WidgetActivityStream
} from "ui";

import { Bell } from "icons/solid";
import { fetcher } from "lib";
import useSWR from "swr";
import { useState } from "react";
import { useTranslation } from "i18n";

const Social = () => {
  const { t } = useTranslation("social");
  const { data, error } = useSWR(`/api/social`, fetcher);
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="bg-cover -mx-4 -mt-4">
        <Img src={`images/header.jpg`} alt="banner" />
      </div>
      <div className="-mx-4 ring-1 ring-black ring-opacity-5">
        <div className="mx-auto">
          <div className="flex justify-between items-center py-4 px-10">
            <div className="flex items-center">
              <div>
                <Avatar size={84} src={`images/avatar.jpg`} alt={`avatar`} />
              </div>
              <div className="ltr:ml-6 rtl:mr-6">
                <div className="hidden sm:inline-block text-2xl flex items-center">
                  <span className="ltr:mr-2 rtl:ml-2">Gerald Morris</span>
                </div>
                <p className="mt-2 font-hairline text-sm">
                  123,456 {t("followers")}
                </p>
              </div>
            </div>
            <div className="flex items-center text-gray-800 dark:text-gray-300">
              <button className="appearance-none px-3 py-2 uppercase text-sm ltr:mr-3 rtl:ml-3 font-medium">
                <span className="hidden sm:inline-block">
                  {t("subscribers")}
                </span>{" "}
                123K
              </button>
              <span>
                <Bell width={18} height={18} />
              </span>
            </div>
          </div>
          <div className="flex flex-row overflow-auto w-0 min-w-full">
            <ul className="list-none flex flex-row overflow-auto w-0 min-w-full p-4 -mb-10 pb-10">
              <li
                className={`text-center  cursor-pointer ${
                  activeTab === "1"
                    ? "border-b-2 border-solid border-indigo-500"
                    : ""
                }`}
                onClick={() => {
                  toggle("1");
                }}
              >
                <a className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-8 block">
                  {t("home")}
                  <Ripple color="black" />
                </a>
              </li>
              <li
                className={`text-center cursor-pointer ${
                  activeTab === "2"
                    ? "border-b-2 border-solid border-indigo-500"
                    : ""
                }`}
                onClick={() => {
                  toggle("2");
                }}
              >
                <a className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-8 block">
                  {t("profile")}
                  <Ripple color="black" />
                </a>
              </li>
              <li
                className={`text-center cursor-pointer ${
                  activeTab === "3"
                    ? "border-b-2 border-solid border-indigo-500"
                    : ""
                }`}
                onClick={() => {
                  toggle("3");
                }}
              >
                <a className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-8 block">
                  {t("community")}
                  <Ripple color="black" />
                </a>
              </li>
              <li
                className={`text-center cursor-pointer ${
                  activeTab === "4"
                    ? "border-b-2 border-solid border-indigo-500"
                    : ""
                }`}
                onClick={() => {
                  toggle("4");
                }}
              >
                <a className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-8 block">
                  {t("account")}
                  <Ripple color="black" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="block xl:flex -mx-2 mt-5">
        <div className="w-full xl:w-2/5 px-2 order-last">
          <Card>
            <CardBody>
              <div className="flex">
                <div className="w-2/4">
                  <div className="leading-none">
                    <h4 className="m-0 text-2xl">
                      <span>Gerald</span> <b>Morris</b>
                    </h4>
                    <small className="pb-4">gerald@morris.com</small>
                  </div>
                  <p className="my-2">UX Developer</p>
                  <div className="leading-snug">
                    <a className="block cursor-pointer">email@contact.com</a>
                    <a className="block cursor-pointer">www.example.com</a>
                    <a className="block cursor-pointer">+1234567890</a>
                  </div>
                </div>
                <div className="w-2/4">
                  <div className="text-center flex justify-center">
                    <Avatar
                      size={64}
                      src={`images/avatar.jpg`}
                      alt={`avatar`}
                    />
                  </div>
                  <div className="m-1 text-center">
                    <p className="mb-1 text-xs font-medium">
                      {t("storage")} (80/100GB)
                    </p>
                    <div className="w-full my-1 rounded bg-gray-400">
                      <div
                        className="py-1 text-center text-white h-1 rounded bg-indigo-500"
                        style={{
                          width: `80%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
            <Divider text={t("stats")} />
            <CardBody>
              <div className="flex justify-around text-center">
                <div>
                  <h2 className="m-0 text-3xl">
                    <b>23,8K</b>
                  </h2>
                  <small>{t("followers")}</small>
                </div>
                <div>
                  <h2 className="m-0 text-3xl">
                    <b>569</b>
                  </h2>
                  <small>{t("following")}</small>
                </div>
                <div>
                  <h2 className="m-0 text-3xl">
                    <b>67</b>
                  </h2>
                  <small>{t("posts")}</small>
                </div>
              </div>
            </CardBody>
            <Divider text={t("about")} />
            <CardBody>
              <p>
                Maecenas sed diam eget risus varius blandit sit amet non magna.
                Curabitur blandit tempus porttitor. Vestibulum id ligula porta
                felis euismod semper.
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="w-full xl:w-3/5 px-2">
          {activeTab === "1" && (
            <Card>
              <CardBody>
                <WidgetActivityStream
                  title="Period ending 2017"
                  stream={data.activity}
                />
              </CardBody>
            </Card>
          )}

          {activeTab === "2" && (
            <Card>
              <Divider text={t("about")} />
              <CardBody>
                <div className="flex mb-2 justify-around">
                  <div className="w-2/4">
                    <small className="block text-gray-500">{t("mobile")}</small>
                    <span>+20 0593 4095</span>
                  </div>
                  <div className="w-2/4">
                    <small className="block text-gray-500">
                      {t("extension")}
                    </small>
                    <span>94</span>
                  </div>
                </div>

                <div className="flex mb-2 justify-around ">
                  <div className="w-2/4">
                    <small className="block text-gray-500">
                      {t("birthday")}
                    </small>
                    <span>30.09.67</span>
                  </div>
                  <div className="w-2/4">
                    <small className="block text-gray-500">
                      {t("country")}
                    </small>
                    <span>Zimbabwe</span>
                  </div>
                </div>

                <div className="flex mb-2 justify-around ">
                  <div className="w-2/4">
                    <small className="block text-gray-500">
                      {t("occupation")}
                    </small>
                    <span>Assistant</span>
                  </div>
                  <div className="w-2/4">
                    <small className="block text-gray-500">{t("mobile")}</small>
                    <span>+23908924</span>
                  </div>
                </div>

                <div className="flex mb-2 justify-around ">
                  <div className="w-2/4">
                    <small className="block text-gray-500">
                      {t("twitter")}
                    </small>
                    <span>@mrperkins</span>
                  </div>
                  <div className="w-2/4">
                    <small className="block text-gray-500">
                      {t("facebook")}
                    </small>
                    <span>mrperkins</span>
                  </div>
                </div>
              </CardBody>
              <Divider text={t("quickBio")} />
              <CardBody>
                <p>
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Fusce dapibus, tellus ac cursus
                  commodo, tortor mauris condimentum nibh, ut fermentum massa
                  justo sit amet risus. Donec id elit non mi porta gravida at
                  eget metus. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit.
                </p>
              </CardBody>
            </Card>
          )}

          {activeTab === "3" && (
            <Card>
              <CardBody>
                <div className="flex flex-wrap -mx-2">
                  {data.contacts.map((contact, index) => (
                    <div className="w-2/4 px-2 mb-3" key={index}>
                      <a className="w-full block sm:flex flex-row flex-wrap items-center text-gray-900 dark:text-white">
                        <Avatar
                          size={48}
                          src={contact.avatar ? contact.avatar : ""}
                          alt={contact.name}
                          status={
                            ["red", "green", "blue", "yellow", "gray"][
                              Math.floor(Math.random() * 5)
                            ]
                          }
                        />
                        <span className="block sm:inline-block mt-1 sm:mt-0 sm:ltr:ml-3 sm:rtl:mr-3">
                          <span className="block">{contact.name}</span>
                          <small className="text-gray-500">
                            <span>{contact.status}</span>
                          </small>
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === "4" && (
            <Card>
              <Divider text={t("basicInformation")} />

              <form className="w-full py-5">
                <div className="md:flex md:items-center mb-6 px-5 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-first-name"
                    >
                      {t("firstName")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-first-name"
                      type="text"
                      placeholder={t("firstName")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-last-name"
                    >
                      {t("lastName")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-last-name"
                      type="text"
                      placeholder={t("lastName")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-email"
                    >
                      {t("emailAddress")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-email"
                      type="text"
                      placeholder={t("emailAddress")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-phone-number"
                    >
                      {t("phoneNumber")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-phone-number"
                      type="text"
                      placeholder={t("phoneNumber")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-company-name"
                    >
                      {t("companyName")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-compnay-name"
                      type="text"
                      placeholder={t("companyName")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-company-website"
                    >
                      {t("companyWebsite")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-company-website"
                      type="text"
                      placeholder={t("companyWebsite")}
                    />
                  </div>
                </div>

                <Divider text={t("contactInformation")} />

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-address-1"
                    >
                      {t("addressLine")} 1
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-address-1"
                      type="text"
                      placeholder={t("addressLine")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-address-2"
                    >
                      {t("addressLine")} 2
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-address-2"
                      type="text"
                      placeholder={t("addressLine")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-city"
                    >
                      {t("city")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-city"
                      type="text"
                      placeholder={t("city")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-state"
                    >
                      {t("state")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-state"
                      type="text"
                      placeholder={t("state")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-post-code"
                    >
                      {t("postCode")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-post-code"
                      type="text"
                      placeholder={t("postCode")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 px-5">
                  <div className="md:w-1/3">
                    <label
                      className="block md:ltr:text-right md:rtl:text-left mb-1 md:mb-0 ltr:pr-4 rtl:pl-4"
                      htmlFor="inline-country"
                    >
                      {t("country")}
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none"
                      id="inline-country"
                      type="text"
                      placeholder={t("country")}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center px-5">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="shadow-sm relative flex justify-center py-3 px-4 border border-transparent text-sm rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out my-3 leading-none"
                      type="button"
                    >
                      {t("editAccountButton")}
                      <Ripple />
                    </button>
                  </div>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Social;
