import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TaskList } from './task-list';
import { Services } from '../services/services';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  const mockServices = {
    tasks: () => [],
    projects: () => [],

    loadTasks: () => {},
    loadProjects: () => {},

    addTask: () => ({
      subscribe: () => {}
    }),

    updateTask: () => ({
      subscribe: () => {}
    }),

    deleteTask: () => ({
      subscribe: () => {}
    }),

    createProject: () => ({
      subscribe: () => {}
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList],
      providers: [
        provideRouter([]),
        {
          provide: Services,
          useValue: mockServices
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});