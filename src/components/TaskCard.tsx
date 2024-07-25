import { FC } from "react";

import { Task } from "../models";
import TagBadge from "./TagBadge";

interface Props extends Task {}

const TaskCard: FC<Props> = (task) => {
  return (
    <div className="flex border border-slate-200 rounded-lg">
      <div className="py-3 pl-3">
        <input
          className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-transparent"
          type="checkbox"
        />
      </div>
      <div className="flex flex-col p-3">
        <h2 className="text-lg font-semibold text-slate-600">{task.name}</h2>
        <p className="text-sm text-slate-400 font-light">{task.description}</p>
        <div>
          {task.tags.map((tag) => (
            <TagBadge key={tag.id} {...tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
