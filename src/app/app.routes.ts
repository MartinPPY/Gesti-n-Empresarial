import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './admin/dashboard/dashboard';


export const routes: Routes = [
    { path: '', redirectTo: 'log-in', pathMatch: 'full' },
    { path: 'log-in', component: Login },
    { path: 'register', component: Register },
    { path: '**', redirectTo: 'login' },
    {
        path: 'admin', 
        component: Dashboard,
        children:[
            
        ]

    }
];
