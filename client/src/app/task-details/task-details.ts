import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Services } from '../services/services';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails implements OnInit {

  task = signal<Task | null>(null);

  constructor(
    private route: ActivatedRoute,
    private taskService: Services
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.taskService.getTaskById(id).subscribe({

      next: (response) => {

        this.task.set(response.data);

      },

      error: (error) => {

        console.error('Task not found:', error);

        this.task.set(null);

      }

    });

  }

}