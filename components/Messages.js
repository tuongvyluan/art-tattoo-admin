import { Avatar, Loading, Ripple } from "ui";
import { Bookmark, Flag, Heart, Pencil, Reply, Star } from "icons/solid";

import { fetcher } from "lib";
import format from "date-fns/format";
import { formatDistance } from "date-fns";
import useSWR from "swr";
import { useState } from "react";

const createMarkup = (body) => {
  return { __html: body };
};

const Messages = () => {
  const { data, error } = useSWR(`/api/messages`, fetcher);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const messageList = () => {
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
        {allMessages[group].map((message, index) => (
          <a
            href="#"
            className={`${
              selectedIndex === message.id ? "bg-indigo-50 dark:text-gray-900 ring-1 ring-indigo-100 ring-opacity-80" : ""
            } flex py-4 px-4 lg:mx-3 lg:rounded-lg text-gray-900 dark:text-white relative`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedIndex(message.id);
            }}
            key={index}
          >
            <div className="w-full flex flex-row items-center">
              <span className="relative">
                <Avatar
                  src={message.avatar ? message.avatar : ""}
                  alt={message.from}
                  size={40}
                  status={message.status}
                />
              </span>

              <span className="w-full hidden lg:block ltr:ml-3 rtl:mr-3">
                <small className="flex w-full text-gray-500">
                  <span>{message.from}</span>
                  <span className="ltr:mr-auto rtl:ml-auto" />
                  <span>
                    {formatDistance(new Date(message.date), new Date(), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </span>
                </small>
                <span className="block">{message.subject}</span>
              </span>
            </div>
            <Ripple color="black" className="lg:rounded-lg" />
          </a>
        ))}
      </>)
  };

  const messages = (
    <div className="flex-auto flex-shrink-0 shadow-sm h-auto md:h-full overflow-hidden flex flex-col flex-1 bg-white dark:bg-gray-600 w-20 hover:w-64 lg:max-w-sm lg:w-2/5">
      <div className="flex flex-row overflow-auto w-0 min-w-full">
        {data && (
          <div className="flex flex-row overflow-auto w-0 min-w-full p-4 -mb-10 pb-10">
            <div className="text-center ltr:mr-4 rtl:ml-4">
              <button
                className="relative flex flex-shrink-0 focus:outline-none block bg-indigo-500 text-white rounded-full w-10 h-10 items-center justify-center shadow mx-auto"
                type="button"
              >
                <Pencil width={24} height={24} />
                <Ripple />
              </button>
              <span className="text-xs mt-2 block">Compose</span>
            </div>
            {data.map((message, index) => (
              <div className="text-center ltr:mr-4 rtl:ml-4 w-16" key={index}>
                <Avatar
                  src={message.avatar ? message.avatar : ""}
                  alt={message.from}
                  size={40}
                  status={message.status}
                  className="mx-auto"
                />
                <span className="text-xs block mt-2">
                  {message.from.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <ul className="justify-around h-16 items-center border-b border-solid border-gray-100 dark:border-gray-700 flex-row w-0 min-w-full hidden lg:flex">
        <li className="mx-4">
          <a
            className={`text-gray-900 dark:text-white hover:text-indigo-800 cursor-pointer`}
          >
            <Bookmark width={18} height={18} />
          </a>
        </li>
        <li className="mx-4">
          <a
            className={`text-gray-900 dark:text-white hover:text-indigo-800 cursor-pointer`}
          >
            <Heart width={18} height={18} />
          </a>
        </li>
        <li className="mx-4">
          <a
            className={`text-gray-900 dark:text-white hover:text-indigo-800 cursor-pointer`}
          >
            <Star width={18} height={18} />
          </a>
        </li>
        <li className="mx-4">
          <a
            className={`text-gray-900 dark:text-white hover:text-indigo-800 cursor-pointer`}
          >
            <Reply width={18} height={18} />
          </a>
        </li>
        <li className="mx-4">
          <a className={`text-gray-900 dark:text-white hover:text-indigo-800`}>
            <Flag width={18} height={18} />
          </a>
        </li>
      </ul>
      <div className="overflow-y-auto flex-1 py-3">{messageList()}</div>
    </div>
  );

  return (
    <div className="relative flex flex-row flex-auto -mx-4 -mt-4 md:h-workspace md:overflow-hidden">
      {messages}
      <Message id={selectedIndex} />
    </div>
  );
};

const Message = ({ id }) => {
  const { data, error } = useSWR(`/api/messages?id=${id}`, fetcher);
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
      <div className="overflow-y-auto p-4 w-full">
        <div className="px-5">
          <div className="block sm:flex items-center mb-3">
            <span className="ml-0 mr-0 sm:ltr:mr-3 sm:rtl:ml-3 relative">
              <Avatar
                src={data.avatar ? data.avatar : ""}
                alt={data.from}
                size={40}
                status={data.status}
              />
            </span>
            <div className="pl-0 pr-0 sm:ltr:pl-3 sm:rtl:pr-3">
              <div className="text-gray-600 text-sm">
                {format(new Date(data.date), "MMMM Do yyyy hh:mm")}
              </div>
              <h6>{data.from}</h6>
            </div>
          </div>
          <p className="font-medium text-lg my-4">{data.subject}</p>
          <div
            dangerouslySetInnerHTML={createMarkup(data.body)}
            className="prose prose-sm text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </>
  );
};

export default Messages;
