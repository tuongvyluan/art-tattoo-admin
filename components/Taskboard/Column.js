import { Draggable } from "react-beautiful-dnd";
import TaskList from "./TaskList";

const Column = ({ title, tasks, index }) => (
  <Draggable draggableId={title} index={index}>
    {(provided) => (
      <div
        className="h-full inline-block align-top pt-1"
        key={index}
        style={{ width: "320px" }}
      >
        <div className="flex flex-col max-h-full whitespace-normal min-w-0 break-words rounded-lg overflow-hidden">
          <div className="relative flex flex-row items-center pt-2 pr-4 pb-0 pl-4 uppercase text-sm font-bold">
            {title}
          </div>
          <div
            className="p-4 overflow-y-auto -mr-10 pr-10"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskList listId={title} tasks={tasks} />
          </div>
        </div>
      </div>
    )}
  </Draggable>
);

export default Column;
