import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task';

export interface Project {
  _id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Services {

  // =========================================
  // STATE
  // =========================================

  tasks = signal<Task[]>([]);
  projects = signal<Project[]>([]);

  // =========================================
  // API URLS
  // =========================================

  private apiUrl = 'https://taskflow-5uoj.onrender.com/api/tasks';
  private projectApiUrl = 'https://taskflow-5uoj.onrender.com/api/projects';

  constructor(private http: HttpClient) {}

  // =========================================
  // TASK APIs
  // =========================================

  // =========================================
  // GET ALL TASKS
  // =========================================

  // GET /api/tasks

  loadTasks(): void {
    this.http
      .get<{ success: boolean; data: Task[] }>(this.apiUrl)
      .subscribe({
        next: (response) => {
          this.tasks.set(response.data);

          console.log(
            'All Tasks Loaded:',
            response.data
          );
        },

        error: (error) => {
          console.error(
            'Error loading all tasks:',
            error
          );
        }
      });
  }

  // =========================================
  // GET TASKS BY PROJECT
  // =========================================

  // GET /api/tasks/project/:projectId

  loadTasksByProject(projectId: string): Observable<{
    success: boolean;
    data: Task[];
  }> {
    return this.http.get<{
      success: boolean;
      data: Task[];
    }>(`${this.apiUrl}/project/${projectId}`);
  }

  // =========================================
  // CREATE TASK
  // =========================================

  // POST /api/tasks

  addTask(newTask: Omit<Task, '_id'>): Observable<{
    success: boolean;
    message: string;
    data: Task;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: Task;
    }>(this.apiUrl, newTask);
  }

  // =========================================
  // UPDATE TASK
  // =========================================

  // PUT /api/tasks/:id

  updateTask(updatedTask: Task): Observable<{
    success: boolean;
    message: string;
    data: Task;
  }> {
    return this.http.put<{
      success: boolean;
      message: string;
      data: Task;
    }>(
      `${this.apiUrl}/${updatedTask._id}`,
      updatedTask
    );
  }

  // =========================================
  // DELETE TASK
  // =========================================

  // DELETE /api/tasks/:id

  deleteTask(id: string): Observable<{
    success: boolean;
    message: string;
  }> {
    return this.http.delete<{
      success: boolean;
      message: string;
    }>(
      `${this.apiUrl}/${id}`
    );
  }

  // =========================================
  // GET TASK BY ID
  // =========================================

  // GET /api/tasks/:id

  getTaskById(id: string): Observable<{
    success: boolean;
    data: Task;
  }> {
    return this.http.get<{
      success: boolean;
      data: Task;
    }>(
      `${this.apiUrl}/${id}`
    );
  }

  // =========================================
  // PROJECT APIs
  // =========================================

  // =========================================
  // GET ALL PROJECTS
  // =========================================

  // GET /api/projects

  loadProjects(): void {
    this.http
      .get<{
        success: boolean;
        data: Project[];
      }>(this.projectApiUrl)
      .subscribe({
        next: (response) => {
          this.projects.set(response.data);

          console.log(
            'All Projects Loaded:',
            response.data
          );
        },

        error: (error) => {
          console.error(
            'Error loading projects:',
            error
          );
        }
      });
  }

  // =========================================
  // GET PROJECT BY ID
  // =========================================

  // GET /api/projects/:id

  getProjectById(id: string): Observable<{
    success: boolean;
    data: Project;
  }> {
    return this.http.get<{
      success: boolean;
      data: Project;
    }>(
      `${this.projectApiUrl}/${id}`
    );
  }

  // =========================================
  // CREATE PROJECT
  // =========================================

  // POST /api/projects

  createProject(name: string, description: string): Observable<{
    success: boolean;
    message: string;
    data: Project;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: Project;
    }>(
      this.projectApiUrl,
      {
        name,
        description
      }
    );
  }

  // =========================================
  // UPDATE PROJECT
  // =========================================

  // PUT /api/projects/:id

  updateProject(id: string, name: string, description: string): Observable<{
    success: boolean;
    message: string;
    data: Project;
  }> {
    return this.http.put<{
      success: boolean;
      message: string;
      data: Project;
    }>(
      `${this.projectApiUrl}/${id}`,
      {
        name,
        description
      }
    );
  }

  // =========================================
  // DELETE PROJECT
  // =========================================

  // DELETE /api/projects/:id

  deleteProject(id: string): Observable<{
    success: boolean;
    message: string;
  }> {
    return this.http.delete<{
      success: boolean;
      message: string;
    }>(
      `${this.projectApiUrl}/${id}`
    );
  }

}