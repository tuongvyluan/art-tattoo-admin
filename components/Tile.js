import { BackgroundImg, Loading } from "ui";

import { fetcher } from "lib";
import { useRouter } from "next/router";
import useSWR from "swr";

const Tile = () => {
  const { basePath } = useRouter();
  const { data, error } = useSWR(`/api/media`, fetcher);

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

  return (
    <div className="block md:flex flex-wrap -mx-2">
      {data.map((id) => (
        <div className="w-full lg:w-1/3 px-2" key={id}>
          <figure
            className="relative overflow-hidden cursor-pointer bg-gray-900 w-full ltr:text-left rtl:text-right mb-4 rounded-lg"
            style={{ height: "300px" }}
          >
            <BackgroundImg
              className="relative block w-full m-auto absolute bg-cover bg-center w-full h-full object-cover bg-center"
              image={`${basePath}/images/unsplash/${id}.jpg`}
            />
            <figcaption className="absolute bottom-0 ltr:left-0 rtl:right-0 w-full p-3 bg-black bg-opacity-50">
              <h5 className="w-1/2 text-xl font-bolder text-white">
                Gallery {id}
              </h5>
              <h6 className="w-1/2 text-md font-bolder text-white">{id}</h6>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
};

export default Tile;
