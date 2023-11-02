import { Loading, WidgetTimeline } from "ui";

import { fetcher } from "lib";
import useSWR from "swr";

const TimelineComponent = () => {
  const { data, error } = useSWR(`/api/timeline`, fetcher);
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
  return <WidgetTimeline title="Period ending 2017" timeline={data} />;
};

export default TimelineComponent;
