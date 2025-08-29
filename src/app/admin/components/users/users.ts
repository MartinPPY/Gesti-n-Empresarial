import { Component, inject, OnInit } from '@angular/core';
import { Admin } from '../../../services/admin';
import { User } from '../../models/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {

  private adminService = inject(Admin);
  users: User[] = [];

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteUser(email: string) {
    Swal.fire({
      title: '¿Estás seguro de borrar a este usuario?',
      text: "¡No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar usuario'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(email).subscribe({
          next: (res) => {
            this.getUsers();
            Swal.fire(
              '¡Borrado!',
              'El usuario ha sido borrado.',
              'success'
            )
          },
          error: (err) => {
            console.error(err);
          }
        })
      } else {
        Swal.fire(
          'Cancelado',
          'El usuario no ha sido borrado.',
          'error'
        )
      }
    })

  }


}
