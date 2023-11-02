import { BackgroundImg, Loading } from "ui";

import { fetcher } from "lib";
import { useRouter } from "next/router";
import useSWR from "swr";

const Grid = () => {
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
              className="relative block w-full m-auto absolute bg-cover bg-center w-full h-full object-cover bg-center opacity-75 hover:opacity-50"
              image={`${basePath}/images/unsplash/${id}.jpg`}
            />
            <figcaption className="absolute top-0 ltr:left-0 rtl:right-0 w-full h-full p-3">
              <h5 className="absolute bottom-0 ltr:left-0 rtl:right-0 p-3 w-1/2 ltr:text-right rtl:text-left text-xl font-bolder text-white transition duration-150 ease-in-out transform translate-x-full">
                Gallery {id}
              </h5>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
};

export default Grid;
