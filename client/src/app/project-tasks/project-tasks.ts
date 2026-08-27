import { Component, OnInit, signal } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs';

import { Services, Project } from '../services/services';
import { Task } from '../models/task';
import { TaskCard } from '../task-card/task-card';


@Component({
  selector: 'app-project-tasks',

  standalone: true,

  imports: [
    RouterLink,
    ReactiveFormsModule,

    TaskCard,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  templateUrl: './project-tasks.html',

  styleUrl: './project-tasks.css'
})


export class ProjectTasks implements OnInit {


  // =========================================
  // PROJECT
  // =========================================

  projectId = '';

  project = signal<Project | null>(null);


  // =========================================
  // TASKS
  // =========================================

  tasks = signal<Task[]>([]);

  filteredTasks = signal<Task[]>([]);


  // =========================================
  // FORM
  // =========================================

  taskForm!: FormGroup;


  // =========================================
  // EDIT MODE
  // =========================================

  isEditMode = false;

  editTaskId = '';


  // =========================================
  // SEARCH + FILTER
  // =========================================

  searchControl = new FormControl('');

  statusControl = new FormControl('All');


  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(
    private route: ActivatedRoute,

    public taskService: Services,

    private fb: FormBuilder
  ) {}


  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {

    this.projectId =
      this.route.snapshot.paramMap.get('id') || '';


    // =========================================
    // FORM
    // =========================================

    this.taskForm = this.fb.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      description: [''],

      status: [
        'Todo',
        Validators.required
      ],

      priority: [
        'Medium',
        Validators.required
      ],

      dueDate: [
        '',
        Validators.required
      ],

      projectId: [
        this.projectId,
        Validators.required
      ]

    });


    // =========================================
    // LOAD PROJECT
    // =========================================

    this.loadProject();


    // =========================================
    // LOAD PROJECT TASKS
    // =========================================

    this.loadProjectTasks();


    // =========================================
    // SEARCH
    // =========================================

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {

        this.applyFilters();

      });


    // =========================================
    // STATUS FILTER
    // =========================================

    this.statusControl.valueChanges
      .subscribe(() => {

        this.applyFilters();

      });

  }


  // =========================================
  // LOAD PROJECT
  // =========================================

  loadProject(): void {

    if (!this.projectId) {

      console.error(
        'Project ID is missing'
      );

      return;

    }


    this.taskService
      .getProjectById(this.projectId)
      .subscribe({

        next: (response) => {

          this.project.set(
            response.data
          );

        },

        error: (error) => {

          console.error(
            'Error loading project:',
            error
          );

        }

      });

  }


  // =========================================
  // LOAD TASKS OF CURRENT PROJECT
  // =========================================

  loadProjectTasks(): void {

    if (!this.projectId) {

      console.error(
        'Cannot load tasks: Project ID is missing'
      );

      return;

    }


    this.taskService
      .loadTasksByProject(this.projectId)
      .subscribe({

        next: (response) => {

          const projectTasks =
            response.data || [];


          this.tasks.set(
            projectTasks
          );


          this.applyFilters();

        },

        error: (error) => {

          console.error(
            'Error loading project tasks:',
            error
          );

          this.tasks.set([]);

          this.filteredTasks.set([]);

        }

      });

  }


  // =========================================
  // ADD / UPDATE TASK
  // =========================================

  addTask(): void {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();

      return;

    }


    const formValue =
      this.taskForm.value;


    // =========================================
    // UPDATE TASK
    // =========================================

    if (this.isEditMode) {

      const updatedTask: Task = {

        _id: this.editTaskId,

        title:
          formValue.title,

        description:
          formValue.description || '',

        status:
          formValue.status,

        priority:
          formValue.priority,

        dueDate:
          this.formatDate(formValue.dueDate),

        projectId:
          this.projectId

      };


      this.taskService
        .updateTask(updatedTask)
        .subscribe({

          next: () => {

            this.loadProjectTasks();

            this.resetForm();

          },

          error: (error) => {

            console.error(
              'Error updating task:',
              error
            );

          }

        });


      return;

    }


    // =========================================
    // CREATE TASK
    // =========================================

    const newTask: Omit<Task, '_id'> = {

      title:
        formValue.title,

      description:
        formValue.description || '',

      status:
        formValue.status,

      priority:
        formValue.priority,

      dueDate:
        this.formatDate(formValue.dueDate),

      projectId:
        this.projectId

    };


    this.taskService
      .addTask(newTask)
      .subscribe({

        next: () => {

          this.loadProjectTasks();

          this.resetForm();

        },

        error: (error) => {

          console.error(
            'Error creating task:',
            error
          );

        }

      });

  }


  // =========================================
  // EDIT TASK
  // =========================================

  editTask(task: Task): void {

    this.isEditMode = true;

    this.editTaskId =
      task._id;


    this.taskForm.patchValue({

      title:
        task.title,

      description:
        task.description,

      status:
        task.status,

      priority:
        task.priority,

      dueDate:
        task.dueDate
          ? new Date(task.dueDate)
          : '',

      projectId:
        this.projectId

    });


    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }


  // =========================================
  // DELETE TASK
  // =========================================

  deleteTask(id: string): void {

    const confirmed =
      confirm(
        'Are you sure you want to delete this task?'
      );


    if (!confirmed) {

      return;

    }


    this.taskService
      .deleteTask(id)
      .subscribe({

        next: () => {

          this.loadProjectTasks();

        },

        error: (error) => {

          console.error(
            'Error deleting task:',
            error
          );

        }

      });

  }


  // =========================================
  // SEARCH + FILTER
  // =========================================

  applyFilters(): void {

    const search =
      (
        this.searchControl.value || ''
      )
        .toLowerCase()
        .trim();


    const status =
      this.statusControl.value || 'All';


    const filtered =
      this.tasks()
        .filter((task) => {

          const matchSearch =
            task.title
              .toLowerCase()
              .includes(search);


          const matchStatus =
            status === 'All' ||
            task.status === status;


          return (
            matchSearch &&
            matchStatus
          );

        });


    this.filteredTasks.set(
      filtered
    );

  }


  // =========================================
  // RESET FORM
  // =========================================

  resetForm(): void {

    this.taskForm.reset({

      title: '',

      description: '',

      status: 'Todo',

      priority: 'Medium',

      dueDate: '',

      projectId:
        this.projectId

    });


    this.isEditMode = false;

    this.editTaskId = '';

  }


  // =========================================
  // FORMAT DATE
  // =========================================

  private formatDate(
    value: Date | string
  ): string {

    if (!value) {

      return '';

    }


    if (value instanceof Date) {

      return value.toISOString();

    }


    return value;

  }

}