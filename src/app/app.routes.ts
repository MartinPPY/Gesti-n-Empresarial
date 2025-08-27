import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { ForgotPassword } from './auth/forgot-password/forgot-password';

export const routes: Routes = [
    { path: '', redirectTo: 'log-in', pathMatch: 'full' },
    { path: 'log-in', component: Login },
    { path: 'register', component: Register },
    { path: 'forgot-password', component: ForgotPassword },
    { path: '**', redirectTo: 'login' }
];
