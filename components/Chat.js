import { Avatar, Loading, Ripple } from "ui";
import {
  Camera,
  EmojiHappy,
  InformationCircle,
  Microphone,
  Pencil,
  Phone,
  Photograph,
  Play,
  PlusCircle,
  Search,
} from "icons/solid";

import { fetcher } from "lib";
import { formatDistance } from "date-fns";
import useSWR from "swr";
import { useState } from "react";
import { useTranslation } from "i18n";

const Chat = () => {
  const { t } = useTranslation("chat");
  const { data, error } = useSWR(`/api/chat`, fetcher);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const contacts = () => {
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

    const allMessages = data.reduce(function (r, a) {
      r[a.group] = r[a.group] || [];
      r[a.group].push(a);
      return r;
    }, Object.create(null));

    return Object.keys(allMessages).map(group => <>
      <h2 className="flex items-center justify-center lg:justify-start relative px-0 lg:px-7 py-px cursor-pointer truncate font-medium text-xxs uppercase font-bold my-2">{group}</h2>
      {allMessages[group].map((contact, index) => (
        <a
          href="#"
          className={`${
            selectedIndex === contact.id ? "bg-indigo-50 dark:text-gray-900 ring-1 ring-indigo-100 ring-opacity-80" : ""
          } flex py-4 px-4 lg:mx-3 lg:rounded-lg text-gray-900 dark:text-white relative`}
          onClick={(e) => {
            e.preventDefault();
            setSelectedIndex(contact.id);
          }}
          key={index}
        >
          <div className="w-full flex flex-row items-center">
            <span className="relative">
              <Avatar
                src={contact.avatar ? contact.avatar : ""}
                alt={contact.from}
                size={40}
                status={contact.status}
              />
            </span>

            <span className="w-full hidden lg:block ltr:ml-3 rtl:mr-3 lg:min-w-0">
              <small className="flex w-full text-gray-500">
                <span>{contact.from}</span>
                <span className="ltr:mr-auto rtl:ml-auto" />
                <span>
                  {formatDistance(new Date(contact.date), new Date(), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </span>
              </small>

              <span className="block lg:truncate">{contact.subject}</span>
            </span>
          </div>
          <Ripple color="black" className="lg:rounded-lg" />
        </a>
      ))}
    </>)
  };

  const contactPanel = (
    <div className="flex-shrink-0 shadow-sm h-full overflow-hidden flex flex-col bg-white dark:bg-gray-600 w-20 hover:w-64 lg:max-w-sm lg:w-2/5">
      <div className="flex flex-row overflow-auto w-0 min-w-full">
        {data && (
          <div className="flex flex-row overflow-auto w-0 min-w-full  p-4 -mb-10 pb-10">
            <div className="text-sm text-center ltr:mr-4 rtl:ml-4">
              <button
                className="relative flex flex-shrink-0 focus:outline-none block bg-indigo-500 text-white rounded-full w-10 h-10 items-center justify-center shadow mx-auto"
                type="button"
              >
                <Pencil width={24} height={24} />
                <Ripple />
              </button>
              <span className="text-xs mt-2 block">{t("compose")}</span>
            </div>
            {data.map((contact, index) => (
              <div className="text-center ltr:mr-4 rtl:ml-4 w-16" key={index}>
                <Avatar
                  src={contact.avatar ? contact.avatar : ""}
                  alt={contact.from}
                  size={40}
                  status={contact.status}
                  className="mx-auto"
                />
                <span className="text-xs block mt-2">
                  {contact.from.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-y-auto flex-1">
        <div className="p-4 flex-none hidden sm:block">
          <div className="relative">
            <label>
              <input
                className="appearance-none relative block w-full py-3 ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
                type="search"
                placeholder={t("search")}
              />
              <span className="absolute top-0 ltr:left-0 rtl:right-0 mt-2 ltr:ml-3 rtl:mr-3 inline-block text-gray-600">
                <Search width={24} height={24} />
              </span>
            </label>
          </div>
        </div>
        {contacts()}
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-row flex-auto -mx-4 -mt-4 h-workspace md:h-workspace overflow-hidden">
      {contactPanel}
      {data && <ChatPanel id={selectedIndex} />}
    </div>
  );
};

const ChatPanel = ({ id }) => {
  const { data, error } = useSWR(`/api/chat?id=${id}`, fetcher);
  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="overflow-y-auto w-full flex flex-col flex-auto flex-1 overflow-y-scroll">
        <div className="px-6 py-6 flex flex-row flex-none justify-between items-center bg-white rounded-lg m-6 sticky top-0 z-10 ring-1 ring-black ring-opacity-5">
          <div className="flex items-center">
            <div className="text-2xl sm:block">
              <p className="font-semibold">{data.user.from}</p>
            </div>
          </div>

          <div className="flex items-center">
            <a href="#" className="block text-gray-700 w-10 mx-1">
              <Phone width={24} height={24} />
            </a>
            <a href="#" className="block text-gray-700 w-10 mx-1">
              <InformationCircle width={24} height={24} />
            </a>
          </div>
        </div>
        <div className="p-6 w-full flex-1 relative">
          {data.chat.map((transcript, index) => (
            <div
              key={index}
              className={`flex flex-row ${
                transcript.from === "them" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`text-sm ${
                  transcript.from === "them"
                    ? ""
                    : "text-white"
                }`}
              >
                <div
                  className={`flex flex-wrap items-center mb-px ${
                    transcript.from === "them" ? "" : "flex-row-reverse"
                  }`}
                >
                  <p
                    className={`px-6 py-3 rounded-t-lg ltr:rounded-lg rtl:rounded-lg w-full sm:max-w-xs lg:max-w-md ${
                      transcript.from === "them"
                        ? "bg-gray-200 dark:bg-gray-600"
                        : "bg-indigo-500"
                    }`}
                  >
                    {transcript.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6">
          <div className="flex-none appearance-none relative block w-full ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none">
            <div className="flex flex-row items-center px-2 py-4 border-b border-gray-100 dark:border-gray-500">
              <div className="flex flex-1">
                <button
                  type="button"
                  className="hidden sm:flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                >
                  <PlusCircle width={24} height={24} />
                </button>
                <button
                  type="button"
                  className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                >
                  <Photograph width={24} height={24} />
                </button>
                <button
                  type="button"
                  className="hidden sm:flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                >
                  <Camera width={24} height={24} />
                </button>
                <button
                  type="button"
                  className="hidden sm:flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                >
                  <Microphone width={24} height={24} />
                </button>
              </div>
              <button
                type="button"
                className="flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
              >
                <EmojiHappy width={24} height={24} />
              </button>
              <button
                type="button"
                className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
              >
                <Play width={24} height={24} />
              </button>
            </div>
            <div className="flex flex-row items-center px-2 py-4">
              <div className="relative flex-grow">
                <label>
                  <textarea
                    className="appearance-none relative block w-full py-3 px-3 border-none placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none bg-transparent"
                    placeholder="Aa"
                  />
                </label>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
