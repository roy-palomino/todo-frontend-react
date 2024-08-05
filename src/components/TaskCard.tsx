import { FC, useState } from "react";

import { CalendarIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
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
          "flex border border-slate-300 rounded-lg shadow-md relative transition-all",
          { "opacity-60": task.done },
        )}
      >
        <CategoryBadge category={task.categories[0]} />
        <div className="py-6 pl-3 mt-1">
          <input
            disabled={loading}
            checked={task.done}
            onChange={changeCompleted}
            className="h-4 w-4 mt-1 rounded border-gray-300 text-slate-600 focus:ring-transparent"
            type="checkbox"
          />
        </div>
        <div className="flex flex-col py-6 px-3 w-full">
          <div className="flex flex-row justify-between text-slate-600 mt-1 mb-2 items-center">
            <h2
              className={cn(
                "text-lg font-semibold",
                task.done ? "line-through decoration-2" : "",
              )}
            >
              {task.name}
            </h2>
            <Link href={"/task/" + task.id}>
              <PencilSquareIcon className="size-6" />
            </Link>
          </div>
          {task.description && (
            <p
              className={cn("text-sm text-slate-400 font-light mb-2", {
                "line-through": task.done,
              })}
            >
              {task.description}
            </p>
          )}
          {task.due_date && (
            <div
              className={cn(
                "flex flex-row text-slate-400 text-xs mb-4 font-semibold my-1",
                { "line-through": task.done },
              )}
            >
              <CalendarIcon className="size-4 mr-1" />
              <time>
                {" "}
                {dayjs(task.due_date).utc(true).format("DD/MM/YYYY HH:mm a")}
              </time>
            </div>
          )}
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
