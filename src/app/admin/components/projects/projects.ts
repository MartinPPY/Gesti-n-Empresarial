import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../../services/admin';
import Swal from 'sweetalert2';
import { Project } from '../../models/users';

@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {

  private adminService = inject(Admin)
  private fb: FormBuilder = inject(FormBuilder)

  projectForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    dateInit: ['', [Validators.required]],
    dateEnd: ['', [Validators.required]],
  })
  projects: Project[] = []


  ngOnInit(): void {
    this.getProjects()
  }


  hasError(controlName: string, errorName: string) {
    return this.projectForm.get(controlName)!.hasError(errorName) && this.projectForm.get(controlName)!.touched;
  }

  addProject() {
    const { name, dateInit, dateEnd } = this.projectForm.value

    console.log(this.projectForm.value)

    this.adminService.addProject(name!, dateInit!, dateEnd!).subscribe({
      next: (res: any) => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          text: '¡Proyecto creado correctamente!',
          timer: 2000
        })
        this.projectForm.reset()
        this.getProjects()
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          text: '¡Ha ocurrido un error al crear el proyecto!',
          timer: 2000
        })
      }
    })
  }

  getProjects() {

    this.adminService.getProjects().subscribe({
      next: (res: Project[]) => {
        this.projects = res
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          text: 'No se ha podido rescatar los proyectos',
          timer: 2000
        })
      }
    })

  }

}
