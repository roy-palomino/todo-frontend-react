import { create } from "zustand";
import { Category, Tag, Task } from "../models";

import { listTasks } from "../services/tasks.service";
import { listCategories } from "../services/categories.service";
import { listTags } from "../services/tags.service";

import useAuthStore from "./useAuth";

interface TaskStoreState {
  tasks: Task[];
  categories: Category[];
  tags: Tag[];

  loading: boolean;
  errorTasks: boolean;
  errorCategories: boolean;
  errorTags: boolean;

  listTasks: () => void;
  listCategories: () => void;
  listTags: () => void;
}

const useTaskStore = create<TaskStoreState>((set) => ({
  tasks: [],
  categories: [],
  tags: [],

  loading: false,
  errorTasks: false,
  errorCategories: false,
  errorTags: false,

  listTasks: async () => {
    const access = useAuthStore.getState().access;
    if (access) {
      const tasks = await listTasks();
      set({ tasks });
    }
  },
  listCategories: async () => {
    const categories = await listCategories();
    set({ categories });
  },
  listTags: async () => {
    const tags = await listTags();
    set({ tags });
  },
}));

export default useTaskStore;
