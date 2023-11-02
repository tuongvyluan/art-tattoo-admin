import {} from "icons/solid";

import {
  Avatar,
  Loading,
  WidgetImageStatCard,
  WidgetNewsCard,
  WidgetPostCard,
  WidgetProfileCard,
  WidgetStatCard,
  WidgetWeatherCard,
} from "ui";
import {
  ChevronLeft,
  ChevronRight,
  LightningBolt,
  ThumbUp,
  UserAdd,
  Users,
} from "icons/solid";

import { fetcher } from "lib";
import useSWR from "swr";
import { useState } from "react";
import { useTranslation } from "i18n";

const Widgets = ({}) => {
  const { t } = useTranslation("widgets");
  const { data, error } = useSWR(`/api/feed`, fetcher);

  const [stats] = useState([
    {
      title: t("comments"),
      value: 24,
    },
    {
      title: t("pageLikes"),
      value: 45,
    },
    {
      title: t("shares"),
      value: 984,
    },
  ]);

  return (
    <>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("newUsers")}
            value={"576,789"}
            icon={<Users width={16} height={16} />}
            type={"blue"}
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("weeklyUptime")}
            value={"99.99%"}
            icon={<LightningBolt width={16} height={16} />}
            type={"gray"}
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("weeklyVisitors")}
            value={"465,563"}
            icon={<UserAdd width={16} height={16} />}
            type={"indigo"}
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("pageLikes")}
            value={"7,578"}
            icon={<ThumbUp width={16} height={16} />}
            type={"red"}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("newUsers")}
            value={"576,789"}
            subtitle={
              <span className="block text-gray-800 dark:text-gray-200">
                <span className="text-red-500">▼&nbsp;9.87%&nbsp;</span>
                {t("percentageChange")}
              </span>
            }
            icon={<Users width={16} height={16} />}
            type={"blue"}
            reverse
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("weeklyUptime")}
            value={"99.99%"}
            subtitle={
              <span className="block text-gray-800 dark:text-gray-200">
                <span className="text-green-500">▲&nbsp;35%&nbsp;</span>
                {t("percentageChange")}
              </span>
            }
            icon={<LightningBolt width={16} height={16} />}
            type={"gray"}
            reverse
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("weeklyVisitors")}
            value={"465,563"}
            subtitle={
              <span className="block text-gray-800 dark:text-gray-200">
                <span className="text-green-500">▲&nbsp;0.43%&nbsp;</span>
                {t("percentageChange")}
              </span>
            }
            icon={<UserAdd width={16} height={16} />}
            type={"indigo"}
            reverse
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("pageLikes")}
            value={"7,578"}
            subtitle={
              <span className="block text-gray-800 dark:text-gray-200">
                <span className="text-red-500">▼&nbsp;5.5%&nbsp;</span>
                {t("percentageChange")}
              </span>
            }
            icon={<ThumbUp width={16} height={16} />}
            type={"red"}
            reverse
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("newUsers")}
            value={"576,789"}
            icon={<Users width={16} height={16} />}
            type={"blue"}
            fill
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("weeklyUptime")}
            value={"99.99%"}
            icon={<LightningBolt width={16} height={16} />}
            type={"gray"}
            fill
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("weeklyVisitors")}
            value={"465,563"}
            icon={<UserAdd width={16} height={16} />}
            type={"indigo"}
            fill
          />
        </div>
        <div className="w-full sm:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={t("pageLikes")}
            value={"7,578"}
            icon={<ThumbUp width={16} height={16} />}
            type={"red"}
            fill
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full lg:w-1/3 px-2">
          {data ? (
            <WidgetNewsCard
              title={t("newsFeed")}
              subtitle={<>
                  <div
                    className={`text-center py-3 px-3 cursor-pointer`}
                  >
                    <a className="text-gray-900 dark:text-white hover:text-indigo">
                    <ChevronLeft width={18} height={18} />
                    </a>
                  </div>
                  <div
                    className={`text-center py-3 px-3 cursor-pointer`}
                  >
                    <a className="text-gray-900 dark:text-white hover:text-indigo">
                    <ChevronRight width={18} height={18} />
                    </a>
                  </div>
                </>
              }
              feed={data}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loading />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
          <WidgetImageStatCard
            images={[
              `images/unsplash/2.jpg`,
              `images/unsplash/1.jpg`,
              `images/unsplash/13.jpg`,
            ]}
            imageHeight={160}
            stats={stats}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
          <WidgetProfileCard
            name={"John Doe"}
            avatar={`images/face1.jpg`}
            images={[`images/unsplash/4.jpg`, `images/unsplash/6.jpg`]}
            location={"London, Uk"}
            imageHeight={160}
            stats={stats}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full lg:w-1/2 px-2">
          <WidgetWeatherCard city="london" country="gb" days={7} />
        </div>

        <div className="w-full lg:w-1/2 px-2">
          <WidgetPostCard
            title={t("shrimpChorizo")}
            subtitle={t("yesterday")}
            images={[`images/unsplash/1.jpg`, `images/unsplash/15.jpg`]}
            imageHeight={285}
            text="Phileas Fogg and Aouda went on board, where they found Fix already installed. Below deck was a square cabin, of which the walls bulged out in the form of cots, above a circular divan; in the centre was a table provided with a swinging lamp."
          />
        </div>
      </div>
    </>
  );
};

export default Widgets;
