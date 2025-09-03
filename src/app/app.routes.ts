import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Admin } from './admin/admin';
import { Dashboard } from './components/dashboard/dashboard';
import { Users } from './components/users/users';
import { Projects } from './components/projects/projects';
import { Task } from './components/task/task';
import { Resources } from './components/resources/resources';
import { adminGuard } from './guard/admin-guard';
import { Employee } from './employee/employee';
import { ProjectManager } from './project-manager/project-manager';


export const routes: Routes = [
    { path: '', redirectTo: 'log-in', pathMatch: 'full' },
    { path: 'log-in', component: Login },
    { path: 'register', component: Register },
    {
        path: 'admin',
        component: Admin,
        canActivate: [adminGuard],
        canActivateChild: [adminGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'users', component: Users },
            { path: 'projects', component: Projects },
            { path: 'tasks', component: Task },
            { path: 'resources', component: Resources }
        ]
    },
    {
        path: 'project-manager', component: ProjectManager,
        children: [
            { path: '', redirectTo: 'projects', pathMatch: 'full' },
            { path: 'projects', component: Projects },
            { path: 'tasks', component: Task },
            { path: 'resources', component: Resources }
        ]
    },
    {
        path: 'employee', component: Employee
    },
    { path: '**', redirectTo: 'log-in' },
];
