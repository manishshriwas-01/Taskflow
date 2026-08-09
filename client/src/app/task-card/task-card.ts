import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DueSoonPipe } from '../pipes/due-soon-pipe';
import { StatusColorDirective } from '../directives/status-color';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,DueSoonPipe,StatusColorDirective],
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