import { FC, useEffect, useState } from "react";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import { useLocation } from "wouter";
import { toast } from "sonner";

import { Category, Tag, CreateTaskPayload, Task } from "../models";
import { listTags, createTag } from "../services/tags.service.ts";
import {
  listCategories,
  createCategory,
} from "../services/categories.service.ts";
import { createTask, updateTask } from "../services/tasks.service.ts";
import SwitchComponent from "../components/SwitchComponent";
import Button from "../components/Button";
import { purgeData } from "../utils/api-helper.ts";

interface Option {
  value: number;
  label: string;
}

// @ts-ignore
interface UpdatableTask extends Task {
  categories: Category[] | Option[];
  tags: Tag[] | Option[];
}

interface Props {
  task?: Task;
  onTaskUpdated?: () => Promise<void>;
  onTaskCreated?: () => void;
}

type Inputs = {
  name: string;
  description?: string;
  due_date?: Date | null;
  is_important: boolean;
  is_urgent: boolean;
  categories?: number[] | Option[];
  tags?: number[] | Option[];
};

const TaskForm: FC<Props> = ({ task, onTaskUpdated }) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      is_urgent: false,
      is_important: false,
    },
  });

  const [_, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  function formatSelectOptions(options: Tag[] | Category[]) {
    let result = options.map((option) => optionify(option));
    return result;
  }

  async function handleCreateTag(inputValue: string) {
    setLoading(true);
    try {
      const result = await createTag(createOption(inputValue));
      updateFormValues(optionify(result), "tags");
      setTags([...tags, result]);
      toast.success("Tag created successfully!!!");
    } catch (e) {
      toast.error(`Error creating tag: ${e}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCategory(inputValue: string) {
    setLoading(true);
    try {
      const result = await createCategory(createOption(inputValue));
      updateFormValues(optionify(result), "categories");
      setCategories([...categories, result]);
      toast.success("Category created successfully!!!");
    } catch (e) {
      toast.error(`Error creating category`);
    } finally {
      setLoading(false);
    }
  }

  function cleanArrayValues(array: { value: number; label: string }[]) {
    if (!array) return [];
    return array.map((option) => option.value);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    data.tags = cleanArrayValues(data.tags as Option[]);
    data.categories = cleanArrayValues(data.categories as Option[]);
    const handler = task ? handleUpdateTask : handleCreateTask;
    try {
      await handler(data);
    } catch (e) {
      console.error(e);
    }
  };

  const createOption = (label: string) => ({
    name: label,
  });

  function updateFormValues(value: Option, field: keyof Inputs) {
    let currentValues = getValues(field) as Option[];
    let newValues = [value];
    if (!!currentValues) {
      newValues = currentValues.concat(newValues);
    }
    setValue(field, newValues);
  }

  const handleCreateTask: SubmitHandler<Inputs> = async (data) => {
    try {
      await createTask(purgeData(data) as CreateTaskPayload);
      toast.success("Task created!");
      navigate("/");
    } catch (e: any) {
      throw new Error(e);
    }
  };

  async function fetchTags() {
    try {
      let tags = await listTags();
      setTags(tags);
    } catch (e: any) {
      console.error(e);
    }
  }

  async function fetchCategories() {
    try {
      let categories = await listCategories();
      setCategories(categories);
    } catch (e: any) {
      console.error(e);
    }
  }

  const handleUpdateTask: SubmitHandler<Inputs> = async (data) => {
    const updatableTask = { id: task?.id, ...data };
    try {
      await updateTask(purgeData(updatableTask) as Partial<Task>);
      toast.success("Task updated!");
      onTaskUpdated && onTaskUpdated();
      navigate("/");
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const optionify = (option: Tag | Category) => ({
    value: option.id,
    label: option.name,
  });

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (task) {
      const { id, ...localTask }: UpdatableTask = { ...task };
      localTask.tags = localTask.tags.map((tag) => optionify(tag as Tag));
      localTask.categories = localTask.categories.map((category) =>
        optionify(category as Category),
      );
      reset(localTask as Inputs);
    }
  }, [task]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <label className="label-form" htmlFor="name">
          Name
        </label>
        <input
          className="w-full rounded-lg p-2 mb-4 mt-1"
          type="text"
          id="name"
          {...register("name", { required: true })}
        ></input>
        {errors.name && <div>This field is required</div>}
      </div>
      <div>
        <label className="label-form" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full rounded-lg p-2 mb-4 mt-1"
          id="description"
          {...register("description", { required: false })}
        ></textarea>
      </div>
      <div>
        <label className="label-form" htmlFor="categories">
          Categories
        </label>
        {categories.length > 0 && (
          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              //@ts-ignore
              <CreatableSelect
                {...field}
                isClearable
                isDisabled={loading}
                onCreateOption={handleCreateCategory}
                id="categories"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    padding: "0.3rem 0.5rem",
                    marginTop: "0.25rem",
                    marginBottom: "1rem",
                  }),
                }}
                options={formatSelectOptions(categories)}
                placeholder=""
                isMulti={true}
              ></CreatableSelect>
            )}
          ></Controller>
        )}
      </div>
      <div>
        <label className="label-form" htmlFor="tags">
          Tags
        </label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            //@ts-ignore
            <CreatableSelect
              {...field}
              isClearable
              isDisabled={loading}
              onCreateOption={handleCreateTag}
              id="tags"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "0.3rem 0.5rem",
                  width: "100%",
                  marginTop: "0.25rem",
                  marginBottom: "1rem",
                }),
              }}
              //@ts-ignore
              options={formatSelectOptions(tags)}
              placeholder=""
              isMulti={true}
            ></CreatableSelect>
          )}
        ></Controller>
      </div>
      <div className="flex flex-col">
        <label className="label-form" htmlFor="due_date">
          Due date
        </label>
        <Controller
          control={control}
          name="due_date"
          render={({ field }) => (
            <DatePicker
              className="w-full rounded-lg p-2 mb-4 mt-1"
              placeholderText=""
              showTimeSelect={true}
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              dateFormat="Pp"
            />
          )}
        ></Controller>
      </div>
      <div className="flex flex-row space-x-2 w-full mb-4 mt-1">
        <div className="w-full flex flex-col items-start">
          <label htmlFor="is_important" className="label-form">
            <span className="label-form">Important task</span>
          </label>
          <Controller
            control={control}
            name="is_important"
            render={({ field }) => (
              <SwitchComponent checked={field.value} {...field} />
            )}
          ></Controller>
        </div>
        <div className="w-full flex flex-col items-start">
          <label htmlFor="is_urgent" className="label-form">
            <span className="label-form">Urgent task</span>
          </label>
          <Controller
            control={control}
            name="is_urgent"
            render={({ field }) => (
              <SwitchComponent checked={field.value} {...field} />
            )}
          ></Controller>
        </div>
      </div>
      <div className="mt-8 w-full">
        <Button type="submit" className="w-full">
          {task ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
