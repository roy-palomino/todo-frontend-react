import { FC } from "react";

import { CalendarIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";

import { Task } from "../models";
import TagBadge from "./TagBadge";

dayjs.extend(utc);

interface Props extends Task {}

const TaskCard: FC<Props> = (task) => {
  return (
    <div className="flex border border-slate-200 rounded-lg shadow-md">
      <div className="py-6 pl-3">
        <input
          className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-transparent"
          type="checkbox"
        />
      </div>
      <div className="flex flex-col py-6 pl-2">
        <h2 className="text-lg font-semibold text-slate-600 mb-2">
          {task.name}
        </h2>
        <p className="text-sm text-slate-400 font-light mb-2">
          {task.description}
        </p>
        {task.due_date && (
          <div className="flex flex-row text-slate-400 font-light text-sm mb-4">
            <CalendarIcon className="size-5 mr-1" />
            {dayjs(task.due_date).utc(true).format("DD/MM/YYYY HH:mm a")}
          </div>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {task.tags.map((tag) => (
            <TagBadge key={tag.id} {...tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
