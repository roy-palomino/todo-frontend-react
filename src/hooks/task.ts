import { useState, useEffect } from "react";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

import type { ClassifiedTasks, Task } from "../models";
import { listTasks } from "../services/tasks.service";

export function classifyTasks(tasks: Task[]): ClassifiedTasks {
  dayjs.extend(isToday);
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

export const useFetchClassifiedTasks = (
  trigger: boolean,
): [ClassifiedTasks | null, boolean] => {
  const [tasks, setTasks] = useState<ClassifiedTasks | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsFetching(true);
      try {
        const tasks = await listTasks();
        setTasks(classifyTasks(tasks));
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTasks();
  }, [trigger]);

  return [tasks, isFetching];
};
