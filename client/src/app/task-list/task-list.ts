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

  ngOnInit() {
    this.taskService.loadTasks();
  }

  addTask() {

    if (this.isEditMode) {

      this.taskService.updateTask(this.newTask);
      this.isEditMode = false;

    } else {

      this.taskService.addTask({
        ...this.newTask,
        id: this.taskService
      });

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