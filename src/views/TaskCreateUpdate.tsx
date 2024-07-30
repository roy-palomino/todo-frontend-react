import { useEffect, useState } from "react";

import { useParams } from "wouter";

import TaskDetail from "../components/TaskDetail";
import { fetchTask } from "../services/tasks.service";
import { Task } from "../models";

const TaskCreateUpdate = () => {
  const [task, setTask] = useState<Task>();
  const params = useParams();

  async function fetchTaskDetails(taskId: number) {
    try {
      const taskResult = await fetchTask(taskId);
      setTask(taskResult);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const id = params.taskId;
    id && fetchTaskDetails(+id);
  }, []);

  return (
    <TaskDetail
      onTaskUpdated={() => fetchTaskDetails(task?.id as number)}
      task={task}
    />
  );
};

export default TaskCreateUpdate;
