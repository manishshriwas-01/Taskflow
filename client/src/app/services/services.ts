import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Services {

  tasks = signal<any[]>([
  {
    id: 1,
    title: 'Complete Angular Routing',
    description: 'Implement routing for Login, Board, and Task Detail pages.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-07-30'
  },
  {
    id: 2,
    title: 'Build Task Detail Page',
    description: 'Display task information using route parameters and signals.',
    status: 'Todo',
    priority: 'Medium',
    dueDate: '2026-08-01'
  },
  {
    id: 3,
    title: 'Design Navbar',
    description: 'Create a responsive navigation bar with router links.',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-07-28'
  }
]);

  // constructor(private http: HttpClient) {}

  // loadTasks() {
  //   this.http.get<any>('/sample-data.json').subscribe(data => {
  //     this.tasks.set(data.tasks);
  //   });
  // }

 
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

  getTaskById(id:Number){
    return this.tasks().find(task=>task.id ===id);
  }

}