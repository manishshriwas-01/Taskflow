import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { signal ,computed} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Services, Project } from '../services/services';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  // =========================
  // PROJECT FORM
  // =========================

  projectForm!: FormGroup;

  projectSearch = signal('');



  onProjectSearch(event: Event): void {

  const input = event.target as HTMLInputElement;

  this.projectSearch.set(input.value);

} 
filteredProjects = computed(() => {

  const search = this.projectSearch()
    .toLowerCase()
    .trim();

  const projects = this.taskService.projects();

  if (!search) {
    return projects;
  }

  return projects.filter(project =>
    project.name
      .toLowerCase()
      .includes(search)
  );

});


  // =========================
  // EDIT STATE
  // =========================

  isEditMode = false;

  editingProjectId: string | null = null;


  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(
    public taskService: Services,
    private fb: FormBuilder,
    private router: Router
  ) {}


  // =========================
  // INITIALIZATION
  // =========================

  ngOnInit(): void {

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


    // Load projects after dashboard opens
    this.taskService.loadProjects();

  }


  // =========================
  // CREATE / UPDATE PROJECT
  // =========================

  createProject(): void {

    // Check validation
    if (this.projectForm.invalid) {

      this.projectForm.markAllAsTouched();

      return;

    }


    const name =
      this.projectForm.get('name')?.value;

    const description =
      this.projectForm.get('description')?.value;


    // =========================
    // UPDATE PROJECT
    // =========================

    if (
      this.isEditMode &&
      this.editingProjectId
    ) {

      this.taskService
        .updateProject(
          this.editingProjectId,
          name,
          description
        )
        .subscribe({

          next: () => {

            console.log(
              'Project updated successfully'
            );

            // Reload projects
            this.taskService.loadProjects();

            // Clear form
            this.resetForm();

          },

          error: (error) => {

            console.error(
              'Error updating project:',
              error
            );

          }

        });

      return;
    }


    // =========================
    // CREATE PROJECT
    // =========================

    this.taskService
      .createProject(
        name,
        description
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Project created:',
            response.data
          );

          // Reload projects
          this.taskService.loadProjects();

          // Clear form
          this.resetForm();

        },

        error: (error) => {

          console.error(
            'Error creating project:',
            error
          );

        }

      });

  }


  // =========================
  // EDIT PROJECT
  // =========================

  editProject(project: Project): void {

    this.isEditMode = true;

    this.editingProjectId =
      project._id;


    // Put existing project data
    // inside form

    this.projectForm.patchValue({

      name: project.name,

      description:
        project.description || ''

    });


    // Scroll to top

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }


  // =========================
  // DELETE PROJECT
  // =========================

  deleteProject(id: string): void {

    const confirmed =
      confirm(
        'Are you sure you want to delete this project?'
      );


    if (!confirmed) {

      return;

    }


    this.taskService
      .deleteProject(id)
      .subscribe({

        next: () => {

          console.log(
            'Project deleted successfully'
          );

          // Reload projects
          this.taskService.loadProjects();

        },

        error: (error) => {

          console.error(
            'Error deleting project:',
            error
          );

        }

      });

  }


  // =========================
  // OPEN PROJECT
  // =========================

  openProject(projectId: string): void {

    this.router.navigate([
      '/project',
      projectId
    ]);

  }


  // =========================
  // RESET FORM
  // =========================

  resetForm(): void {

    this.projectForm.reset({

      name: '',

      description: ''

    });


    this.isEditMode = false;

    this.editingProjectId = null;

  }

}