import { useLocation } from "wouter";
import { PlusIcon } from "@heroicons/react/20/solid";

import Default from "../layouts/Default";
import { UserSettings } from "../models";
import Button from "../components/Button";
import useAuth from "../stores/useAuth";
import TaskList from "../components/TaskList";

const Home = () => {
  const settings = useAuth((store) => store.settings);
  const toggleHideTasks = useAuth((store) => store.toggleHideCompleted);

  const [_, navigate] = useLocation();

  async function toggleHide() {
    const newSettings = { ...settings };
    newSettings.hide_completed_tasks = !settings?.hide_completed_tasks;
    await toggleHideTasks(newSettings as UserSettings);
  }

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
