import { useEffect, useState } from "react";

import { useLocation } from "wouter";

import Default from "../layouts/Default";
import { Task } from "../models";
import Button from "../components/Button";

import { PlusIcon } from "@heroicons/react/20/solid";

import { listTasks } from "../services/tasks.service";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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
      <div className="w-full relative">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task: Task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        ) : (
          <div className="w-full mt-52 flex flex-col items-center">
            <div className="text-center w-full text-lg text-slate-400 mb-4">
              You don't have any task
            </div>
          </div>
        )}
        <Button onClick={() => navigate("/new-task")} rounded={true} className="absolute bottom-20 right-6">
          <PlusIcon className="size-6" />
        </Button>
      </div>
    </Default>
  );
};

export default Index;
