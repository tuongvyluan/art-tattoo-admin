import { Avatar, BackgroundImg, Loading, Ripple } from "ui";
import {
  DotsHorizontal,
  Heart,
  Play,
  Refresh,
  Share,
} from "icons/solid";

import React from 'react';
import { fetcher } from "lib";
import { useAppState } from "components/AppProvider";
import { useRouter } from "next/router";
import useSWR from "swr";

const Music = () => {
  const [state] = useAppState();
  const { data, error } = useSWR(`/api/music`, fetcher);
  const { basePath } = useRouter();

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load media data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

    const allAlbums = data.reduce(function (r, a) {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));

  return (
    <div className="relative flex flex-row flex-auto -mx-4 -mt-4 md:h-workspace md:overflow-hidden">
      <div className="flex flex-col h-full w-full">
        <div className="flex-1 overflow-auto">
          {Object.keys(allAlbums).map(category =>
            <div className="px-4 mb-4">
              <div className="flex items-center py-4">
                <div className="flex-1">
                  <span className="flex items-center relative py-px cursor-pointer truncate text-sm uppercase font-bold mt-4">{category}</span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-2">
                {allAlbums[category].map((album, index) => (
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mb-4">
                    <div className="group relative mb-4 cursor-pointer" style={{ height: "300px" }}>
                      <BackgroundImg
                        className="relative block w-full m-auto absolute bg-cover bg-center h-full object-cover bg-center rounded-lg"
                        image={`${basePath}/images/unsplash/${album.id}.jpg`}
                      />
                      <div className="absolute w-full h-full top-0 left-0 rounded-lg bg-gradient-to-b from-transparent to-black flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <a className="p-2 text-white">
                          <Play width={32} height={32} />
                        </a>

                        <div className="absolute w-full bottom-0 left-0 rounded-lg flex items-center justify-between">
                          <a className="p-2 text-white"><Heart width={16} height={16} /></a>
                          <a className="p-2 text-white"><DotsHorizontal width={16} height={16} /></a>
                        </div>
                        <Ripple />
                      </div>
                    </div>
                    <div className="text-sm mb-1 block">{album.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-500">{album.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={`bg-${state.sidebarColor}-600 flex flex-col sm:flex-row justify-between p-3 text-white sticky md:relative bottom-0`}>
          <div className="flex items-center justify-center sm:justify-start">
            <Avatar size={64} src={`images/unsplash/0.jpg`} alt={`avatar`} circular={false} className="mx-2" />
            <div className="mx-2 hidden sm:inline-block">
              <div className="text-sm">
                VSCode
              </div>
              <div className={`text-xs text-${state.sidebarColor}-50 text-medium`}>
                <span>React Codex</span>
              </div>
            </div>
          </div>
          <div className="flex-1 my-2 sm:my-0 mx-5">
            <div className="flex items-center justify-center mb-3">
              <button className="text-gray-100 mx-3 relative outline-none focus:outline-none">
                <Share width={14} height={14} className="fill-current" />
                <Ripple className="rounded-full" />
              </button>
              <button className="text-gray-100 mx-3 relative outline-none focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={14} height={14} fill="currentColor">
                  <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
                <Ripple className="rounded-full" />
              </button>
              <button
                className="flex text-gray-100 mx-3 relative outline-none focus:outline-none"
              >
                <Play width={36} height={36} className="fill-current m-auto" />
                <Ripple className="rounded-full" />
              </button>
              <button className="text-gray-100 mx-3 relative outline-none focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={14} height={14} fill="currentColor">
                  <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
                <Ripple className="rounded-full" />
              </button>
              <button className="text-gray-100 mx-3 relative outline-none focus:outline-none">
                <Refresh width={14} height={14} className="fill-current" />
                <Ripple className="rounded-full" />
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-100 font-medium">3:14</span>
              <div className="w-full mx-4 rounded bg-gray-400">
                <div
                  className="py-px text-center text-white h-1 rounded bg-indigo-500"
                  style={{
                    width: `50%`,
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-100 font-medium">6:28</span>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <button className="p-2 relative outline-none focus:outline-none">
              <Heart width={16} height={16} />
              <Ripple className="rounded-full" />
            </button>
            <button className="text-gray-100 p-2 relative outline-none focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <Ripple className="rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;