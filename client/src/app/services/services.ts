import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class Services {

  tasks = signal<Task[]>([]);

  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) { }


  // GET /api/tasks

  loadTasks(): void {

    this.http.get<{ success: boolean; data: Task[] }>(this.apiUrl)
      .subscribe({

        next: (response) => {

          this.tasks.set(response.data);

          console.log('Tasks Loaded', response.data);

        },

        error: (err) => {

          console.error('Error loading tasks:', err);

        }

      });

  }


  // POST /api/tasks

  addTask(newTask: Omit<Task, 'id'>) {

    return this.http.post<{ success: boolean; data: Task }>(
      this.apiUrl,
      newTask
    );

  }


  // DELETE /api/tasks/:id

  deleteTask(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }


  // PUT /api/tasks/:id

  updateTask(updatedTask: Task) {

    return this.http.put<{ success: boolean; data: Task }>(
      `${this.apiUrl}/${updatedTask.id}`,
      updatedTask
    );

  }


  // GET /api/tasks/:id

  getTaskById(id: number) {

    return this.http.get<{ success: boolean; data: Task }>(
      `${this.apiUrl}/${id}`
    );

  }

}