import { Component, OnInit, signal, effect } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { TaskCard } from '../task-card/task-card';
import { Services } from '../services/services';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCard, ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  searchControl = new FormControl('');
  statusControl = new FormControl('All');

  filteredTasks = signal<Task[]>([]);

  taskForm!: FormGroup;

  isEditMode = false;
  editTaskId = 0;

  constructor(
    public taskService: Services,
    private fb: FormBuilder
  ) {


    effect(() => {

      this.filteredTasks.set(this.taskService.tasks());

    });

  }
  ngOnInit(): void {

    this.taskService.loadTasks();

    this.taskForm = this.fb.group({

      title: ['', [Validators.required, Validators.minLength(3)]],

      description: [''],

      status: ['Todo', Validators.required],

      priority: ['Medium'],

      dueDate: ['', Validators.required]

    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {

        this.applyFilters();

      });

    this.statusControl.valueChanges.subscribe(() => {

      this.applyFilters();

    });

  }

  addTask() {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();
      return;

    }

    const taskData = this.taskForm.value;

    if (this.isEditMode) {

      this.taskService.updateTask({

        ...taskData,

        id: this.editTaskId

      }).subscribe(() => {

        this.taskService.loadTasks();

        this.isEditMode = false;

        this.applyFilters();

        this.resetForm();

      });

    } else {

      const tasks = this.taskService.tasks();

      const newId =
        tasks.length > 0
          ? Math.max(...tasks.map(task => task.id)) + 1
          : 1;

      this.taskService.addTask({

        ...taskData,

        id: newId

      }).subscribe(() => {

        this.taskService.loadTasks();

        this.applyFilters();

        this.resetForm();

      });

    }

  }
  editTask(task: Task) {

    this.taskForm.patchValue({

      title: task.title,

      description: task.description,

      status: task.status,

      priority: task.priority,

      dueDate: task.dueDate

    });

    this.editTaskId = task.id;

    this.isEditMode = true;

  }

  deleteTask(id: number) {

    this.taskService.deleteTask(id)

      .subscribe(() => {

        this.taskService.loadTasks();

        this.applyFilters();

      });

  }

  applyFilters() {

    const search = this.searchControl.value?.toLowerCase() || '';

    const status = this.statusControl.value;

    const filtered = this.taskService.tasks().filter(task => {

      const matchSearch =

        task.title.toLowerCase().includes(search);

      const matchStatus =

        status === 'All' ||

        task.status === status;

      return matchSearch && matchStatus;

    });

    this.filteredTasks.set(filtered);

  }

  resetForm() {

    this.taskForm.reset({

      title: '',

      description: '',

      status: 'Todo',

      priority: 'Medium',

      dueDate: ''

    });

  }

}