import { FC, useState, useEffect } from "react";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

import { Task } from "../models";
import { listTasks } from "../services/tasks.service";
import TaskCard from "./TaskCard";

dayjs.extend(isToday);

interface Props {
  hideCompleted: boolean;
}

interface ClassifiedTasks {
  [key: string]: Task[];
}

const TaskList: FC<Props> = ({ hideCompleted = false }) => {
  const [classifiedTasks, setTasks] = useState<ClassifiedTasks | null>(null);

  function classifyTasks(tasks: Task[]): ClassifiedTasks {
    let classifiedTasks = tasks.reduce((accumulator: any, current: Task) => {
      let due_date = dayjs(current.due_date).isToday()
        ? "Today"
        : dayjs(current.due_date).format("MMM DD").toString();
      if (due_date && !accumulator[due_date]) {
        accumulator[due_date] = [current];
      } else {
        accumulator[due_date].push(current);
      }
      return accumulator;
    }, {});
    return classifiedTasks;
  }

  function renderUndoneTasks(tasks: Task[]) {
    return tasks.map(
      (task) =>
        !task.done && (
          <li key={task.id}>
            <TaskCard onChecked={fetchTasks} task={task} />
          </li>
        ),
    );
  }

  function renderAllTasks(tasks: Task[]) {
    return tasks.map((task) => (
      <li key={task.id}>
        <TaskCard onChecked={fetchTasks} task={task} />
      </li>
    ));
  }

  async function fetchTasks() {
    const tasks = await listTasks();
    setTasks(classifyTasks(tasks));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
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
  );
};

export default TaskList;
