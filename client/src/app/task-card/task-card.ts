import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DueSoonPipe } from '../pipes/due-soon-pipe';
import { StatusColorDirective } from '../directives/status-color';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,DueSoonPipe,StatusColorDirective,MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
 
  @Input()
  task: any;

  @Output()
  edit = new EventEmitter<void>();

  @Output()
  delete = new EventEmitter<void>();

}