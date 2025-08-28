import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Admin } from './admin/admin';
import { Dashboard } from './admin/components/dashboard/dashboard';
import { Users } from './admin/components/users/users';
import { Projects } from './admin/components/projects/projects';
import { Task } from './admin/components/task/task';
import { Resources } from './admin/components/resources/resources';


export const routes: Routes = [
    { path: '', redirectTo: 'log-in', pathMatch: 'full' },
    { path: 'log-in', component: Login },
    { path: 'register', component: Register },
    { path: '**', redirectTo: 'login' },
    {
        path: 'admin',
        component: Admin,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'users', component: Users },
            { path: 'projects', component: Projects },
            { path: 'tasks', component: Task },
            { path: 'resources',component: Resources}
        ]
    }
];
