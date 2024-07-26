import { FC, useState, useEffect } from "react";

import { CalendarIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";

import { Task } from "../models";
import TagBadge from "./TagBadge";
// import { updateCompletedStatus } from "../services/tasks.service.ts";

dayjs.extend(utc);

interface Props extends Task {}

const TaskCard: FC<Props> = (propTask) => {
  const [task, setTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState(false);

  //TODO: complete this xd

  // const changeCompleted = async () => {
  //   if (loading || !task) return;
  //   try {
  //     const taskUpdated = await updateCompletedStatus(task.id, !task.done);
  //     setTask(taskUpdated);
  //   } catch (e) {
  //   } finally {
  //   }
  // };

  useEffect(() => {
    setTask(propTask);
  }, []);

  return (
    task && (
      <div className="flex border border-slate-200 rounded-lg shadow-md">
        <div className="py-6 pl-3">
          <input
            disabled={loading}
            // onClick={}
            className="h-4 w-4 mt-1 rounded border-gray-300 text-slate-600 focus:ring-transparent"
            type="checkbox"
          />
        </div>
        <div className="flex flex-col py-6 px-2">
          <h2 className="text-lg font-semibold text-slate-600 mb-2">
            {task.name}
          </h2>
          <p className="text-sm text-slate-400 font-light mb-2">
            {task.description || "No description provided"}
          </p>
          {task.due_date && (
            <div className="flex flex-row text-slate-400 text-xs mb-4 font-semibold my-1">
              <CalendarIcon className="size-4 mr-1" />
              <time>
                {" "}
                {dayjs(task.due_date).utc(true).format("DD/MM/YYYY HH:mm a")}
              </time>
            </div>
          )}
          <div className="flex flex-wrap gap-x-3 gap-y-2">
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
