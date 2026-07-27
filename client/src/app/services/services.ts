import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Services {

  tasks = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  loadTasks() {
    this.http.get<any>('/sample-data.json').subscribe(data => {
      this.tasks.set(data.tasks);
    });
  }

 
  addTask(newTask: any): void {
    this.tasks.update(tasks => [
      newTask,
      ...tasks
    ]);
  }


  deleteTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }


  updateTask(updatedTask: any): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }

}