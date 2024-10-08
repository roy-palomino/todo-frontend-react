import { FC, useState } from "react";

import {
  CalendarIcon,
  PencilSquareIcon,
  FireIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { toast } from "sonner";
import { Link } from "wouter";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";

import { Task } from "../models";
import TagBadge from "./TagBadge";
import CategoryBadge from "./CategoryBadge.tsx";
import { updateCompletedStatus } from "../services/tasks.service.ts";
import { cn } from "../utils/classNames.ts";
import Loading from "./LoadingComponent.tsx";

dayjs.extend(utc);

interface Props {
  task: Task;
  onChecked: () => void;
}

const TaskCard: FC<Props> = ({ task, onChecked }) => {
  const [loading, setLoading] = useState(false);

  const changeCompleted = async () => {
    setLoading(true);
    if (loading || !task) return;
    try {
      const result = await updateCompletedStatus(task.id, !task.done);
      if (result.done) {
        toast.success("Task done succesfully");
      } else {
        toast.warning("Task undone");
      }
      onChecked();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    task && (
      <div
        className={cn(
          "flex border border-slate-300 rounded-2xl shadow-md bg-white relative transition-all",
          { "opacity-60": task.done },
        )}
      >
        {loading && <Loading />}
        <CategoryBadge category={task.categories[0]} />
        <div className="pt-4 pl-3 mt-1">
          <input
            disabled={loading}
            checked={task.done}
            onChange={changeCompleted}
            className="h-4 w-4 mt-1 rounded border-gray-300 text-slate-600 focus:ring-transparent"
            type="checkbox"
          />
        </div>
        <div className="flex flex-col pt-5 pb-4 px-3 w-full">
          <div className="flex flex-row justify-between text-slate-500 mt-1 mb-2 items-center">
            <h2
              className={cn("font-semibold text-dark md:text-xl", {
                "line-through decoration-2": task.done,
                "text-red-700": task.is_important,
              })}
            >
              {task.name}
            </h2>
            <Link href={"/task/" + task.id}>
              <PencilSquareIcon className="size-5 md:size-6" />
            </Link>
          </div>
          {task.description && (
            <p
              className={cn("text-xs text-black mb-2", {
                "line-through": task.done,
              })}
            >
              {task.description}
            </p>
          )}
          <div className="flex w-full justify-between items-center">
            {task.due_date && (
              <div
                className={cn(
                  "flex flex-row text-slate-400 text-xs mb-4 my-1",
                  {
                    "line-through": task.done,
                  },
                )}
              >
                <CalendarIcon className="size-4 mr-1" />
                <time>
                  {" "}
                  {dayjs(task.due_date).utc(true).format("DD/MM/YYYY HH:mm a")}
                </time>
              </div>
            )}
            <div className="flex space-x-1">
              {task.is_important && <FireIcon className="w-6 md:w-8 text-red-600" />}
              {task.is_urgent && (
                <ExclamationTriangleIcon className="w-6 md:w-8 text-yellow-500" />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-2 mt-2">
            {task.tags.map((tag) => (
              <TagBadge key={tag.id} {...tag} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default TaskCard;
