import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Admin } from '../services/admin';
import { Tasks } from '../admin/models/interfaces';
import { Auth } from '../services/auth';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss'
})
export class Employee implements OnInit {

  private fb: FormBuilder = inject(FormBuilder)
  private taskServices = inject(Admin)
  private authServices = inject(Auth)
  private router = inject(Router)

  tasks: Tasks[] = []


  taskForm: FormGroup = this.fb.group({
    state: ['']
  })

  ngOnInit(): void {
    this.getTasks()
  }

  async logOut() {
    await lastValueFrom(this.authServices.logOut())
    this.router.navigate(['log-in'])
  }

  getTasks() {
    this.taskServices.getTasksFromUser().subscribe({
      next: (res: Tasks[]) => {
        this.tasks = res
      }
    })
  }

  async updateTask(name: string, priority: string, employeeId: number, projectId: number, id: number) {

    if (this.taskForm.invalid) {
      return
    }

    const { state } = this.taskForm.value
    
    try {
      const response = await lastValueFrom(this.taskServices.updateTask(name, state, priority, employeeId, projectId, id))
      Swal.fire({
        icon:'success',
        text:'Progreso actualizado',
        timer:2000
      })
    } catch (error: any) {
      Swal.fire({
        icon:'error',
        text:'No se ha podido actualizar el progreso'
      })
    }

    this.getTasks()
  }

}
