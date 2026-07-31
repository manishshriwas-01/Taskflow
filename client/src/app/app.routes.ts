import { Routes } from '@angular/router';
import { Login } from './login/login';

import { TaskDetails } from './task-details/task-details';
import { NotFound } from './not-found/not-found';
import { TaskList } from './task-list/task-list';

export const routes: Routes = [
    {
        path:'',
        component:TaskList
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'dashboard',
        component:TaskList
    },
    {
        path:'task/:id',
        component:TaskDetails
    },{
        path:'**',
        component:NotFound
    }
];
