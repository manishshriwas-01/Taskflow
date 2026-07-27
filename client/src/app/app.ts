import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskCard } from './task-card/task-card';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TaskList],
  standalone: true,
  templateUrl:'./app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
 