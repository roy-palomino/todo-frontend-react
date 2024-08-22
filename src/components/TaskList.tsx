import { FC, useState } from "react";

import { Task } from "../models";
import TaskCard from "./TaskCard";
import Loading from "./LoadingComponent";
import { useFetchClassifiedTasks } from "../hooks/task";

interface Props {
  hideCompleted: boolean;
}

const TaskList: FC<Props> = ({ hideCompleted = false }) => {
  const [trigger, setTrigger] = useState(false);

  const [classifiedTasks, isFetching] = useFetchClassifiedTasks(trigger);

  function renderUndoneTasks(tasks: Task[]) {
    return tasks.map(
      (task) =>
        !task.done && (
          <li key={task.id}>
            <TaskCard
              onChecked={() => setTrigger((prev) => !prev)}
              task={task}
            />
          </li>
        ),
    );
  }

  function renderAllTasks(tasks: Task[]) {
    return tasks.map((task) => (
      <li key={task.id}>
        <TaskCard onChecked={() => setTrigger((prev) => !prev)} task={task} />
      </li>
    ));
  }

  return (
    <>
      {isFetching && <Loading />}
      <ul>
        {!!classifiedTasks &&
          Object.keys(classifiedTasks).map((due_date: string) => (
            <li className="hidden has-[li]:block" key={due_date}>
              <h3 className="text-white text-left font-thin text-2xl mt-6 mb-2">
                {due_date}
              </h3>
              <ul className="flex flex-col space-y-4">
                {hideCompleted
                  ? renderUndoneTasks(classifiedTasks[due_date])
                  : renderAllTasks(classifiedTasks[due_date])}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TaskList;
