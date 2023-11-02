import { Card, CardBody, Chart, Loading } from "ui";

import { fetcher } from "lib";
import useSWR from "swr";

const Charts = () => {
  const { data, error } = useSWR(`/api/chart`, fetcher);

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load chart data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-wrap -mx-2">
      {data.map((chart, index) => (
        <div className="w-full md:w-1/2 lg:w-1/3 px-2" key={index}>
          <Card>
            <div className="flex items-center content-between px-4 py-4 border-b border-solid border-gray-100 dark:border-gray-700">
              {chart.title} {chart.subtitle}
            </div>
            <CardBody>
              <Chart
                type={chart.type}
                data={chart.data}
                height={chart.height}
                options={chart.options}
              />
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Charts;
