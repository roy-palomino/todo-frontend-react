import { useEffect, useState } from "react";

import { useLocation } from "wouter";
import { PlusIcon } from "@heroicons/react/20/solid";

import Default from "../layouts/Default";
import { Task } from "../models";
import Button from "../components/Button";
import TaskCard from "../components/TaskCard";

import { listTasks } from "../services/tasks.service";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [_, navigate] = useLocation();

  async function fetchTasks() {
    const tasks = await listTasks();
    setTasks(tasks);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Default>
      <div className="w-full">
        <div className="flex flex-row justify-end mb-4 mt-2">
          <button onClick={toggleHide} className="text-cyan-600 px-1">
            {hideCompleted ? "Show" : "Hide"} completed tasks
          </button>
        </div>
        {tasks?.length > 0 ? (
          <ul className="flex flex-col space-y-4">
            {hideCompleted ? renderUndoneTasks() : renderAllTasks()}
          </ul>
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
          className="bottom-20 left-96 sticky"
        >
          <PlusIcon className="size-6" />
        </Button>
      </div>
    </Default>
  );
};

export default Index;
