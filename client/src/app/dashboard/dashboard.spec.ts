import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Dashboard } from './dashboard';
import { Services } from '../services/services';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  const mockServices = {
    projects: () => [],
    loadProjects: () => {},
    createProject: () => ({
      subscribe: () => {}
    }),
    updateProject: () => ({
      subscribe: () => {}
    }),
    deleteProject: () => ({
      subscribe: () => {}
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        {
          provide: Services,
          useValue: mockServices
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});