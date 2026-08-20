import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Register } from './register/register';
import { TaskDetails } from './task-details/task-details';
import { NotFound } from './not-found/not-found';

import { Dashboard } from './dashboard/dashboard';
import { TaskList } from './task-list/task-list';

import { authGuard } from './guards/auth-guard';
import { ProjectTasks } from './project-tasks/project-tasks';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
  path: 'project/:id',
  component: ProjectTasks,
  canActivate: [
    authGuard
  ]
},

  {
    path: 'project/:id/tasks',
    component: TaskList,
    canActivate: [authGuard]
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'task/:id',
    component: TaskDetails
  },

  {
    path: '**',
    component: NotFound
  }

];