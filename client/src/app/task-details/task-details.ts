import { Component, signal, } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {Services} from '../services/services';

@Component({
  selector: 'app-task-details',
  imports: [RouterLink],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  task=signal<any | null>(null);

  constructor(
    private route:ActivatedRoute,
    private taskService:Services
  ){}

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const selectedTask=this.taskService.getTaskById(id);
    this.task.set(selectedTask ?? null);
  }


}
