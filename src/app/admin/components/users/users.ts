import { Component, inject, OnInit } from '@angular/core';
import { Admin } from '../../../services/admin';
import { User } from '../../models/interfaces';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {

  private adminService = inject(Admin);
  private authService = inject(Auth)
  private fb: FormBuilder = inject(FormBuilder);

  filterForm = this.fb.group({
    role: [''],
    search: ['']
  });

  userForm = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]]
  })

  users: User[] = [];

  ngOnInit(): void {
    this.getUsers();
  }


  private getUsers() {
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

  getUser() {

    const name = this.filterForm.get('search')!.value || ''
    const role = this.filterForm.get('role')!.value || ''

    this.adminService.getUser(name, role).subscribe({
      next: (res: User[]) => {
        this.users = res;
      }
    })
  }

  hasError(controlName: string, errorName: string) {
    return this.userForm.get(controlName)!.hasError(errorName) && this.userForm.get(controlName)!.touched;
  }

  addUser() {
    const { name, lastName, email, password, role } = this.userForm.value;

    this.authService.register(name!, lastName!, email!, password!, role!).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon:'success',
          text:'Usuario agregado'
        })
        this.getUsers()
      },
      error:(err:any)=>{
        Swal.fire({
          icon:'error',
          title:'¡Ha ocurrido un error!',
          text:'No se ha podido agregar a este usuario',
          timer:2000
        })
        console.error(err)
      }
    })
  }


}
