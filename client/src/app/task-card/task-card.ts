import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';

import { DueSoonPipe } from '../pipes/due-soon-pipe';
import { StatusColorDirective } from '../directives/status-color';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Task } from '../models/task';

@Component({
  selector: 'app-task-card',
  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive,
    DatePipe,
    DueSoonPipe,
    StatusColorDirective,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {

  @Input()
  task!: Task;

  @Output()
  edit = new EventEmitter<Task>();

  @Output()
  delete = new EventEmitter<string>();

  getProjectName(
    projectId: Task['projectId']
  ): string {

    if (!projectId) {
      return 'No Project';
    }

    if (typeof projectId === 'string') {
      return projectId;
    }

    return projectId.name;
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task._id);
  }
}