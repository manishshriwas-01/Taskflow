export interface Task {

  _id: string;

  title: string;

  description: string;

  status: 'Todo' | 'In Progress' | 'Done';

  priority: 'Low' | 'Medium' | 'High';

  dueDate: string;

   projectId: string | {
    _id: string;
    name: string;
  } | null;

  createdAt?: string;

  updatedAt?: string;

}