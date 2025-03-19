
export interface Task {
  taskType: any;
  _id: string;
  title: string;
  description: string;
  subtasks: string[];
  status: string;
}

export interface AllTask {
  todo: Task[];
  done: Task[];
  inProgress: Task[];
}
