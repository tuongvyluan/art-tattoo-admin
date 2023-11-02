import { Draggable, Droppable } from "react-beautiful-dnd";

import React from 'react';
import TaskItem from "./TaskItem";

const InnerTaskList = React.memo(function InnerTaskList(props) {
  return props.tasks.map((task, index) => (
    <Draggable
      key={`${index}-${task.title}`}
      draggableId={`${index}-${task.title}`}
      index={index}
    >
      {(dragProvided, dragSnapshot) => (
        <TaskItem
          key={task.id}
          task={task}
          isDragging={dragSnapshot.isDragging}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

const InnerList = ({ tasks, dropProvided }) => (
  <div ref={dropProvided.innerRef}>
    <InnerTaskList tasks={tasks} />
    {dropProvided.placeholder}
  </div>
);

const TaskList = ({
  ignoreContainerClipping,
  isDropDisabled,
  listId,
  tasks,
  title
}) => (
  <Droppable
    droppableId={listId}
    ignoreContainerClipping={ignoreContainerClipping}
    isDropDisabled={isDropDisabled}
  >
    {(dropProvided, dropSnapshot) => (
      <InnerList tasks={tasks} title={title} dropProvided={dropProvided} />
    )}
  </Droppable>
);

TaskList.defaultProps = {
  listId: "LIST"
};

export default TaskList;
