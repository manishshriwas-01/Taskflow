import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskCard } from '../task-card/task-card';
import { Services } from '../services/services';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCard, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {

  constructor(public taskService: Services) {}

  newTask = {
    id: 0,
    title: '',
    description: '',
    status: 'Todo',
    priority: 'Medium',
    dueDate: ''
  };

  isEditMode = false;

  
 
  addTask() {

    if (this.isEditMode) {

      this.taskService.updateTask(this.newTask);
      this.isEditMode = false;

    } else {
      const tasks=this.taskService.tasks();

      const newId=tasks.length>0 ? Math.max(...tasks.map(task=>task.id))+1:1;

      this.taskService.addTask({
        ...this.newTask,
        id:newId,
      })

    }

    this.resetForm();
  }

  editTask(task: any) {
    this.newTask = { ...task };
    this.isEditMode = true;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  resetForm() {
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      status: 'Todo',
      priority: 'Medium',
      dueDate: ''
    };
  }

}