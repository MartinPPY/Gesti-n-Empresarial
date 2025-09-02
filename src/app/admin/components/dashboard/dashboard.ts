import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Admin } from '../../../services/admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  private adminService = inject(Admin)


  ngOnInit(): void {
      this.getSummary()
  }

  getSummary(){
    this.adminService.getUsers().subscribe({
      next:(res:any)=>{
        console.log('estas autenticado!')
      },
      error:(err:any)=>{
        Swal.fire({
          icon:'error',
          title:'Error de autenticacion',
          text:'Debes estar autenticado para acceder a la aplicación'
        })
      }
    })
  }

}
