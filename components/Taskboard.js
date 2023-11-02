import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "./Taskboard/reorder";

import Column from "./Taskboard/Column";
import { Loading } from "ui";
import { fetcher } from "lib";
import useSWR from "swr";
import { useState } from "react";

const Taskboard = () => {
  const { data, error } = useSWR(`/api/taskboard`, fetcher);
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
  return <TaskboardInner data={data} />;
};

const TaskboardInner = ({ data }) => {
  const [columns, setColumn] = useState(data);
  const [ordered, setOrder] = useState(Object.keys(columns));

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === "COLUMN") {
      const ordered = reorder(ordered, source.index, destination.index);

      setOrder(ordered);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });

    setColumn(data.quoteMap);
  };

  return (
    <div className="absolute inset-0 overflow-x-auto overflow-y-hidden whitespace-nowrap pl-3 pr-3">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskboard" type="COLUMN">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="h-full"
            >
              {ordered.map((key, index) => (
                <Column
                  key={key}
                  index={index}
                  title={key}
                  tasks={columns[key]}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Taskboard;
