import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project, Tasks, User, } from '../../models/interfaces';
import { Admin } from '../../../services/admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  imports: [ReactiveFormsModule],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task implements OnInit {

  private adminServices = inject(Admin)
  private fb: FormBuilder = inject(FormBuilder)
  private idTask: number = 0

  employees: User[] = []
  projects: Project[] = []
  tasks: Tasks[] = []


  taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    state: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    employeeId: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
  })

  filterForm: FormGroup = this.fb.group({
    search: [''],
    state: [''],
    priority: ['']
  })

  ngOnInit(): void {
    this.getProjects()
    this.getEmployees()
    this.getTasks()
  }


  hasError(controlName: string, errorName: string) {
    return this.taskForm.get(controlName)!.hasError(errorName) && this.taskForm.get(controlName)!.touched;
  }

  addTask() {
    const { name, state, priority } = this.taskForm.value
    const employeeId: number = parseInt((this.taskForm.get('employeeId')?.value))
    const projectId: number = parseInt(this.taskForm.get('projectId')?.value)

    this.adminServices.addTask(name, state, priority, employeeId, projectId).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.error(err)
      }
    })

  }

  getProjects() {
    this.adminServices.getProjects().subscribe({
      next: (res: Project[]) => {
        this.projects = res
      }
    })
  }

  getEmployees() {
    this.adminServices.getEmployees().subscribe({
      next: (res: User[]) => {
        this.employees = res
      }
    })
  }

  getTasks() {
    this.adminServices.getTasks().subscribe({
      next: (res: Tasks[]) => {
        this.tasks = res
      }
    })
  }

  getTask(id: number) {
    this.adminServices.getTask(id).subscribe({
      next: (res: Tasks[]) => {
        this.taskForm.setValue({
          name: res[0].name,
          state: res[0].state,
          priority: res[0].priority,
          employeeId: res[0].id_employee,
          projectId: res[0].id_project
        })
        this.idTask = res[0].id
      }

    })
  }

  updateTask() {
    const { name, state, priority } = this.taskForm.value
    const employeeId = parseInt(this.taskForm.get('employeeId')?.value)
    const projectId = parseInt(this.taskForm.get('projectId')?.value)

    this.adminServices.updateTask(name, state, priority, employeeId, projectId, this.idTask).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          text: 'tarea actualizada correctamente',
          timer: 2000
        })
        this.getTasks()

      }
    })
  }

  deleteTask(id: number) {
    Swal.fire({
      title: '¿Estás seguro de borrar  esta tarea?',
      text: "¡No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar tarea'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminServices.deleteTask(id).subscribe({
          next: (res) => {
            this.getTasks()
            Swal.fire(
              '¡Borrada!',
              'La tarea ha sido borrada.',
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
          'La tarea no ha sido borrada.',
          'error'
        )
      }
    })
  }

  filterTask() {
    const { search, state, priority } = this.filterForm.value
    this.adminServices.filterTask(search, state, priority).subscribe({
      next: (res: Tasks[]) => {
        this.tasks = res
      }
    })
  }

}
