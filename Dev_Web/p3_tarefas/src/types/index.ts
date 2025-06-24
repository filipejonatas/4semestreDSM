export interface Task {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
}
export interface TaskContextType {
  categories: Category[];
  tasks: Task[];
  addCategory: (name: string) => void;
  addTask: (title: string, categoryId: string) => void;
  toggleTaskComplete: (taskId: string) => void;
  getTasksByCategory: (categoryId: string) => Task[];
}