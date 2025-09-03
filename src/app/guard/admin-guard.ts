import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = async (route, state) => {

  const authService = inject(Auth)

  const response = await lastValueFrom(authService.isAuthenticated())

  if (response[0].role !== 'Administrador') {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso no autorizado',
      text: 'No eres administrador para acceder a este recurso'
    })
    return false
  }

  return true
};
