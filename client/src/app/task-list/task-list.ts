import { Component, OnInit, signal, effect, inject } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  
} from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs';

import { TaskCard } from '../task-card/task-card';
import { Services } from '../services/services';
import { Task } from '../models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,

  imports: [
    TaskCard,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
     MatIconModule
  ],

  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  private router=inject(Router);

  // =========================================
  // SEARCH + FILTER
  // =========================================

  searchControl = new FormControl('');

  statusControl = new FormControl('All');

  filteredTasks = signal<Task[]>([]);


  // =========================================
  // FORMS
  // =========================================

  taskForm!: FormGroup;

  projectForm!: FormGroup;


  // =========================================
  // EDIT STATE
  // =========================================

  isEditMode = false;

  editTaskId = '';


  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(
    public taskService: Services,
    private fb: FormBuilder
  ) {

    /*
      Whenever tasks signal changes,
      update filteredTasks.
    */

    effect(() => {

      this.filteredTasks.set(
        this.taskService.tasks()
      );

    });

  }


  // =========================================
  // INITIALIZATION
  // =========================================

  ngOnInit(): void {

    // Load existing tasks
    this.taskService.loadTasks();

    // Load existing projects
    this.taskService.loadProjects();


    // =========================================
    // TASK FORM
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

      /*
        IMPORTANT:
        These values must match backend enum.
      */

      status: [
        'Pending',
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

      /*
        Project is required for every task.
      */

      projectId: [
        '',
        Validators.required
      ]

    });


    // =========================================
    // PROJECT FORM
    // =========================================

    this.projectForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      description: ['']

    });


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
  // CREATE PROJECT
  // =========================================

  createProject(): void {

    if (this.projectForm.invalid) {

      this.projectForm.markAllAsTouched();

      return;

    }


    const projectData =
      this.projectForm.value;


    this.taskService
      .createProject(
        projectData.name,
        projectData.description
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Project Created:',
            response.data
          );


          // Reload projects
          this.taskService.loadProjects();


          // Reset project form
          this.projectForm.reset({

            name: '',

            description: ''

          });

        },

        error: (err) => {

          console.error(
            'Error creating project:',
            err
          );

        }

      });

  }


  // =========================================
  // CREATE / UPDATE TASK
  // =========================================

  addTask(): void {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();

      return;

    }


    const taskData =
      this.taskForm.value;


    // =========================================
    // UPDATE EXISTING TASK
    // =========================================

    if (this.isEditMode) {

      const updatedTask: Task = {

        _id: this.editTaskId,

        title: taskData.title,

        description: taskData.description,

        status: taskData.status,

        priority: taskData.priority,

        dueDate: taskData.dueDate,

        projectId: taskData.projectId

      };


      console.log(
        'Updating Task:',
        updatedTask
      );


      this.taskService
        .updateTask(updatedTask)
        .subscribe({

          next: (response) => {

            console.log(
              'Task Updated:',
              response.data
            );


            // Reload tasks
            this.taskService.loadTasks();


            // Exit edit mode
            this.isEditMode = false;

            this.editTaskId = '';


            // Reset form
            this.resetForm();

          },

          error: (err) => {

            console.error(
              'Error updating task:',
              err
            );

          }

        });


      return;

    }


    // =========================================
    // CREATE NEW TASK
    // =========================================

    this.taskService
      .addTask({

        title: taskData.title,

        description: taskData.description,

        status: taskData.status,

        priority: taskData.priority,

        dueDate: taskData.dueDate,

        projectId: taskData.projectId

      })
      .subscribe({

        next: (response) => {

          console.log(
            'Task Created:',
            response.data
          );


          // Reload tasks
          this.taskService.loadTasks();


          // Reset form
          this.resetForm();

        },

        error: (err) => {

          console.error(
            'Error creating task:',
            err
          );

        }

      });

  }


  // =========================================
  // EDIT TASK
  // =========================================

  editTask(task: Task): void {

    console.log(
      'Editing Task:',
      task
    );


    /*
      Save task MongoDB _id
      so PUT request knows which task
      needs to be updated.
    */

    this.editTaskId = task._id;


    /*
      IMPORTANT PART:

      projectId is patched here.

      Because projectId is already present
      in the task, Angular Material will
      automatically show that project
      as selected in the dropdown.
    */

    this.taskForm.patchValue({

      title: task.title,

      description: task.description,

      projectId: task.projectId,

      status: task.status,

      priority: task.priority,

      dueDate: task.dueDate

    });


    // Switch form into edit mode
    this.isEditMode = true;


    // Scroll to task form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  // =========================================
  // DELETE TASK
  // =========================================

  deleteTask(id: string): void {

    this.taskService
      .deleteTask(id)
      .subscribe({

        next: () => {

          console.log(
            'Task Deleted'
          );


          // Reload tasks
          this.taskService.loadTasks();

        },

        error: (err) => {

          console.error(
            'Error deleting task:',
            err
          );

        }

      });

  }


  // =========================================
  // SEARCH + FILTER
  // =========================================

  applyFilters(): void {

    const search =
      this.searchControl.value
        ?.toLowerCase()
        .trim() || '';


    const status =
      this.statusControl.value;


    const filtered =
      this.taskService
        .tasks()
        .filter(task => {


          // Search by title
          const matchSearch =
            task.title
              .toLowerCase()
              .includes(search);


          // Status filter
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
  // RESET TASK FORM
  // =========================================

  resetForm(): void {

    this.taskForm.reset({

      title: '',

      description: '',

      status: 'Pending',

      priority: 'Medium',

      dueDate: '',

      projectId: ''

    });

  }
  

  openProject(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }

}