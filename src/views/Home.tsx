import { useEffect, useState } from "react";

import { useLocation } from "wouter";
import { PlusIcon } from "@heroicons/react/20/solid";

import Default from "../layouts/Default";
import { Task, UserSettings } from "../models";
import Button from "../components/Button";
import TaskCard from "../components/TaskCard";
import useAuth from "../stores/useAuth";

import { listTasks } from "../services/tasks.service";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const settings = useAuth((store) => store.settings);
  const toggleHideTasks = useAuth((store) => store.toggleHideCompleted);

  const [_, navigate] = useLocation();

  async function fetchTasks() {
    const tasks = await listTasks();
    setTasks(tasks);
  }

  async function toggleHide() {
    const newSettings = { ...settings };
    newSettings.hide_completed_tasks = !settings?.hide_completed_tasks;
    await toggleHideTasks(newSettings as UserSettings);
  }

  function areDatesEqual(
    date1: string | Date,
    date2: string | Date = new Date().toISOString(),
  ) {
    const parsedDate1 = typeof date1 === "string" ? new Date(date1) : date1;
    const parsedDate2 = typeof date2 === "string" ? new Date(date2) : date2;

    return (
      parsedDate1.getUTCFullYear === parsedDate2.getUTCFullYear &&
      parsedDate1.getUTCMonth === parsedDate2.getUTCMonth &&
      parsedDate1.getUTCDay === parsedDate2.getUTCDay
    );
  }

  function renderUndoneTasks() {
    return tasks.map(
      (task) =>
        !task.done && (
          <li key={task.id}>
            <TaskCard onChecked={fetchTasks} task={task} />
          </li>
        ),
    );
  }

  function renderAllTasks() {
    return tasks.map((task) => (
      <li key={task.id}>
        <TaskCard onChecked={fetchTasks} task={task} />
      </li>
    ));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let classifiedTasks = tasks.reduce((accumulator: any, current: Task) => {
      if (current.due_date && !accumulator[current.due_date.toString()]) {
        accumulator[current.due_date.toString()] = [current];
      } else if (current.due_date) {
        accumulator[current.due_date.toString()].push(current);
      }
      return accumulator;
    }, {});
    console.log(classifiedTasks);
  }, [tasks]);

  return (
    <Default>
      <div className="w-full relative">
        <div className="flex flex-row justify-end mb-4 mt-2">
          <button
            onClick={toggleHide}
            className="text-cyan-600 font-semibold px-1"
          >
            {settings?.hide_completed_tasks ? "Show" : "Hide"} completed tasks
          </button>
        </div>
        {tasks?.length > 0 ? (
          <>
            <h3 className="text-slate-800 text-3xl py-2">Today</h3>
            <ul className="flex flex-col space-y-4 transition-all">
              {settings?.hide_completed_tasks
                ? renderUndoneTasks()
                : renderAllTasks()}
            </ul>
          </>
        ) : (
          <div className="w-full mt-52 flex flex-col items-center">
            <div className="text-center w-full text-lg text-slate-400 mb-4">
              You don't have any task
            </div>
          </div>
        )}
        <Button
          onClick={() => navigate("/new-task")}
          rounded={true}
          className="absolute right-0 bottom-16"
        >
          <PlusIcon className="size-6" />
        </Button>
      </div>
    </Default>
  );
};

export default Home;
