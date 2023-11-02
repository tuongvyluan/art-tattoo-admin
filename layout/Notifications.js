import { Avatar, Loading } from "ui";
import { ChevronLeft, ChevronRight } from "icons/solid";

import { fetcher } from "lib";
import { formatDistance } from "date-fns";
import useSWR from "swr";
import { useState } from "react";
import { useTranslation } from "i18n";

const Pages = ({error, data}) => {
  if (error)
  return (
    <div className="flex items-center justify-between py-2 px-3" style={{height: '300px'}}>
      Failed to load notification data
    </div>
  );
  if (!data) return (
    <div className="flex items-center justify-center h-full" style={{height: '300px'}}>
      <Loading />
    </div>
  );

  return (<div className="relative grid gap-6 bg-body px-5 py-6 sm:gap-5 sm:p-5">
    {data.map((notification) => (<a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
      <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
        <Avatar
          size={24}
          src={notification.avatar}
          alt={notification.user}
          circular={false}
        />
      </span>
      <div className="ml-4 w-full">
        <p className="font-medium text-gray-900 w-full">
          <span className="flex items-center justify-between w-full">
            <span>{notification.user}</span>
            <span className="text-xs text-gray-600">
              {formatDistance(new Date(notification.date), new Date())}
            </span>
          </span>
        </p>
        <p className="mt-1 text-xs text-gray-500">{notification.subject}</p>
      </div>
    </a>))}
  </div>)
}

const Notifications = ({ title }) => {
  const { t } = useTranslation("social");
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWR(
    `/api/notifications?page=${pageIndex}`,
    fetcher
  );


  return (
    <>
      <div className="w-full flex flex-row items-center justify-between py-2 px-2 ring-1 ring-black ring-opacity-5">
        <ul className="list-none flex flex-row overflow-auto w-0 min-w-full -mb-10 pb-10">
          <li
            className={`text-center py-3 px-3 cursor-pointer flex flex-1`}
          >
            <a className="text-gray-900 hover:text-indigo">
              {title}
            </a>
          </li>
          <li
            className={`text-center py-3 px-3 cursor-pointer`}
          >
            <a className="text-gray-900 hover:text-indigo" onClick={() => setPageIndex(pageIndex - 1)}>
            <ChevronLeft width={18} height={18} />
            </a>
          </li>
          <li
            className={`text-center py-3 px-3 cursor-pointer`}
          >
            <a className="text-gray-900 hover:text-indigo" onClick={() => setPageIndex(pageIndex + 1)}>
            <ChevronRight width={18} height={18} />
            </a>
          </li>
        </ul>
      </div>
      <div className="relative mt-px overflow-y-auto bg-body">
        <Pages data={data} error={error} />
      </div>
    </>
  );
};

export default Notifications;
