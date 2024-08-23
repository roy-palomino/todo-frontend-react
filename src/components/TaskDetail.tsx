import { type FC } from "react";

import "react-datepicker/dist/react-datepicker.css";

import Default from "../layouts/Default";

import { Task } from "../models";
import TaskForm from "./TaskForm";

interface Props {
  task?: Task;
  onTaskUpdated?: () => Promise<void>;
}

const TaskDetail: FC<Props> = ({ task, onTaskUpdated }) => {
  return (
    <Default>
      <div className="w-full py-9 px-7">
        <h1 className="text-4xl text-white text-center font-bold mb-7">
          Add a task
        </h1>
        <TaskForm task={task} onTaskUpdated={onTaskUpdated} />
      </div>
    </Default>
  );
};

export default TaskDetail;
