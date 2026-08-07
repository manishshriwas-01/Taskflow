import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class Services {

  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) { }

  loadTasks(): void {

    this.http.get<Task[]>('http://localhost:3000/tasks')
      .subscribe({

        next: (data) => {

          this.tasks.set(data);

          console.log("Tasks Loaded", data);

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  addTask(newTask: Task) {

    return this.http.post<Task>(
      'http://localhost:3000/tasks',
      newTask
    );

  }


  deleteTask(id: number) {

    return this.http.delete(
      `http://localhost:3000/tasks/${id}`
    );

  }


  updateTask(updatedTask: Task) {

    return this.http.put<Task>(
      `http://localhost:3000/tasks/${updatedTask.id}`,
      updatedTask
    );

  }

  getTaskById(id: Number) {
    return this.tasks().find(task => task.id === id);
  }

}