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
      <div className="w-full relative bg-transparent">
        <div className="flex flex-row justify-end mb-4 mt-2">
          <button
            onClick={toggleHide}
            className="text-white text-lg font-light bg-primary-2 px-4 py-1 rounded-lg"
          >
            {settings?.hide_completed_tasks ? "Show" : "Hide"} completed tasks
          </button>
        </div>
        <TaskList hideCompleted={!!settings?.hide_completed_tasks} />
        <Button
          onClick={() => navigate("/new-task")}
          rounded={true}
          className="fixed !shadow-xl bottom-16 md:bottom-40 right-4 bg-accent-1 border-accent-1"
        >
          <PlusIcon className="size-6 md:size-12" />
        </Button>
      </div>
    </Default>
  );
};

export default Home;
