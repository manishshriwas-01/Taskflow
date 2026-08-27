import {
  Component,
  OnInit,
  signal,
  computed
} from '@angular/core';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {
  Services,
  Project
} from '../services/services';


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

  // =========================================
  // PROJECT FORM
  // =========================================

  projectForm!: FormGroup;


  // =========================================
  // SEARCH
  // =========================================

  projectSearch = signal('');


  // =========================================
  // SEARCH HANDLER
  // =========================================

  onProjectSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.projectSearch.set(input.value);

    // Search karte hi first page par jao
    this.currentPage = 1;

  }


  // =========================================
  // FILTERED PROJECTS
  // =========================================

  filteredProjects = computed(() => {

    const search =
      this.projectSearch()
        .toLowerCase()
        .trim();

    const projects =
      this.taskService.projects();


    // Search empty hai
    if (!search) {

      return projects;

    }


    // Project name se search
    return projects.filter(project =>
      project.name
        .toLowerCase()
        .includes(search)
    );

  });


  // =========================================
  // EDIT STATE
  // =========================================

  isEditMode = false;

  editingProjectId: string | null = null;


  // =========================================
  // PAGINATION
  // =========================================

  currentPage = 1;

  itemsPerPage = 6;


  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(
    public taskService: Services,
    private fb: FormBuilder,
    private router: Router
  ) {}


  // =========================================
  // INITIALIZATION
  // =========================================

  ngOnInit(): void {

    this.projectForm =
      this.fb.group({

        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],

        description: ['']

      });


    this.taskService.loadProjects();

  }


  // =========================================
  // CREATE / UPDATE PROJECT
  // =========================================

  createProject(): void {

    if (this.projectForm.invalid) {

      this.projectForm.markAllAsTouched();

      return;

    }


    const name =
      this.projectForm.get('name')?.value;

    const description =
      this.projectForm.get('description')?.value;


    // =========================================
    // UPDATE
    // =========================================

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

            this.taskService.loadProjects();

            this.resetForm();

          },

          error: () => {

            // Handle error if needed

          }

        });

      return;

    }


    // =========================================
    // CREATE
    // =========================================

    this.taskService
      .createProject(
        name,
        description
      )
      .subscribe({

        next: () => {

          this.taskService.loadProjects();

          this.resetForm();

        },

        error: () => {

          // Handle error if needed

        }

      });

  }


  // =========================================
  // EDIT PROJECT
  // =========================================

  editProject(project: Project): void {

    this.isEditMode = true;

    this.editingProjectId =
      project._id;


    this.projectForm.patchValue({

      name: project.name,

      description:
        project.description || ''

    });


    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }


  // =========================================
  // DELETE PROJECT
  // =========================================

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

          this.taskService.loadProjects();


          // Current page empty hone par
          // previous page par jao

          if (
            this.currentPage > 1 &&
            this.paginatedProjects.length === 0
          ) {

            this.currentPage--;

          }

        },

        error: () => {

          // Handle error if needed

        }

      });

  }


  // =========================================
  // OPEN PROJECT
  // =========================================

  openProject(projectId: string): void {

    this.router.navigate([
      '/project',
      projectId
    ]);

  }


  // =========================================
  // RESET FORM
  // =========================================

  resetForm(): void {

    this.projectForm.reset({

      name: '',

      description: ''

    });


    this.isEditMode = false;

    this.editingProjectId = null;

  }


  // =========================================
  // TOTAL PAGES
  // =========================================

  get totalPages(): number {

    return Math.ceil(
      this.filteredProjects().length /
      this.itemsPerPage
    );

  }


  // =========================================
  // PAGINATED PROJECTS
  // =========================================

  get paginatedProjects(): Project[] {

    const projects =
      this.filteredProjects();


    const startIndex =
      (this.currentPage - 1) *
      this.itemsPerPage;


    const endIndex =
      startIndex +
      this.itemsPerPage;


    return projects.slice(
      startIndex,
      endIndex
    );

  }


  // =========================================
  // PAGE NUMBERS
  // =========================================

  get pageNumbers(): number[] {

    return Array.from(
      {
        length: this.totalPages
      },
      (_, index) => index + 1
    );

  }


  // =========================================
  // GO TO PAGE
  // =========================================

  goToPage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {

      return;

    }


    this.currentPage = page;

  }


  // =========================================
  // NEXT PAGE
  // =========================================

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

    }

  }


  // =========================================
  // PREVIOUS PAGE
  // =========================================

  previousPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

    }

  }

}