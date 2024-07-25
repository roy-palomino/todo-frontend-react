import { FC, useEffect, useState } from "react";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useLocation } from "wouter";
import "react-datepicker/dist/react-datepicker.css";

import { Category, Tag, CreateTaskPayload } from "../models";
import { listTags } from "../services/tags.service.ts";
import { listCategories } from "../services/categories.service.ts";
import { createTask } from "../services/tasks.service.ts";
import Default from "../layouts/Default";
import SwitchComponent from "../components/SwitchComponent";
import Button from "../components/Button";
import { purgeData } from "../utils/api-helper.ts";

interface Option {
  value: number;
  label: string;
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

const TaskCreate: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      is_urgent: false,
      is_important: false,
    },
  });

  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [_, navigate] = useLocation();
  const [loading, setLoading] = useState(false);

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

  const optionify = (option: Tag | Category) => ({
    value: option.id,
    label: option.name,
  });

  function formatSelectOptions(options: Tag[] | Category[]) {
    let result = options.map((option) => optionify(option));
    return result;
  }

  function cleanArrayValues(array: { value: number; label: string }[]) {
    if (!array) return [];
    return array.map((option) => option.value);
  }

  const createOption = (label: string) => ({
    name: label,
  });

  async function handleCreateTag(inputValue: string) {
    setLoading(true);
    try {
      const result = await createTag(createOption(inputValue));
      updateFormValues(optionify(result), "tags");
      setTags([...tags, result]);
    } catch (e) {
      toast.error(`Error creating tag`);
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
    } catch (e) {
      toast.error(`Error creating category`);
    } finally {
      setLoading(false);
    }
  }

  function updateFormValues(value: Option, field: keyof Inputs) {
    let currentValues = getValues(field) as Option[];
    let newValues = [value];
    if (!!currentValues) {
      newValues = currentValues.concat(newValues);
    }
    setValue(field, newValues);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    data.tags = cleanArrayValues(data.tags as Option[]);
    data.categories = cleanArrayValues(data.categories as Option[]);
    try {
      const result = await createTask(data as CreateTaskPayload);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, []);

  return (
    <Default>
      <div className="w-full relative py-9 px-7">
        <h1 className="text-4xl text-slate font-bold mb-7">Add a task</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <div>
            <label className="label-form" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border border-slate-400 rounded-lg p-2 mb-4 mt-1"
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
              className="w-full border border-slate-400 rounded-lg p-2 mb-4 mt-1"
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
                  <Select
                    {...field}
                    id="categories"
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        borderRadius: "0.5rem",
                        borderColor: "#94a3b8",
                        padding: "0.3rem 0.5rem",
                        marginTop: "0.25rem",
                        marginBottom: "1rem",
                      }),
                    }}
                    //@ts-ignore
                    options={formatSelectOptions(categories)}
                    placeholder=""
                    isMulti={true}
                  ></Select>
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
                <Select
                  {...field}
                  id="tags"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      borderRadius: "0.5rem",
                      borderColor: "#94a3b8",
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
                ></Select>
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
                  className="w-full border border-slate-400 rounded-lg p-2 mb-4 mt-1"
                  placeholderText=""
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
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
                render={({ field }) => <SwitchComponent {...field} />}
              ></Controller>
            </div>
            <div className="w-full flex flex-col items-start">
              <label htmlFor="is_urgent" className="label-form">
                <span className="label-form">Urgent task</span>
              </label>
              <Controller
                control={control}
                name="is_urgent"
                render={({ field }) => <SwitchComponent {...field} />}
              ></Controller>
            </div>
          </div>
          <div className="mt-8 w-full">
            <Button className="w-full">Create</Button>
          </div>
        </form>
      </div>
    </Default>
  );
};

export default TaskCreate;
