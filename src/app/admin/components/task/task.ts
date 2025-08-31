import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project, User } from '../../models/interfaces';
import { Admin } from '../../../services/admin';
import { Projects } from '../projects/projects';

@Component({
  selector: 'app-task',
  imports: [ReactiveFormsModule],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task implements OnInit {

  private adminServices = inject(Admin)
  private fb: FormBuilder = inject(FormBuilder)

  employees: User[] = []
  projects: Project[] = []


  taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    state: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    employeeId: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getProjects()
    this.getEmployees()
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

}
