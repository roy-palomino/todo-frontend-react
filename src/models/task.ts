export interface Tag {
  readonly id: number;
  name: string;
  description: string;
  background_color: string;
  text_color: string;
}

export interface CreateTagPayload {
  name: string;
  description?: string;
  background_color?: string;
  text_color?: string;
}

export interface Category {
  readonly id: number;
  name: string;
  description: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
}

export interface Task {
  readonly id: number;
  name: string;
  description: string;
  categories: Category[];
  tags: Tag[];
  done: boolean;
  owner: number;
  due_date: string | Date | null;
  is_important: boolean;
  is_urgent: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskPayload {
  name: string;
  categories?: Category[];
  tags?: Tag[];
  due_date?: Date | null;
  is_important: boolean;
  is_urgent: boolean;
}
