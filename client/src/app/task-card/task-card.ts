import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
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