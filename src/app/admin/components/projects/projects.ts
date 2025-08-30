import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../../services/admin';
import Swal from 'sweetalert2';
import { Project } from '../../models/interfaces';

@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {

  private adminService = inject(Admin)
  private fb: FormBuilder = inject(FormBuilder)
  private idProject: number = 0

  projectForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    dateInit: ['', [Validators.required]],
    dateEnd: ['', [Validators.required]],
    state: ['No iniciado', [Validators.required]]
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

  getProject(name: string, dateInit: string, dateEnd: string, state: string, id: number) {
    this.adminService.getProject(name, dateInit, dateEnd, state, id).subscribe({
      next: (res: Project[]) => {
        this.projectForm.setValue({
          name: res[0].name,
          dateInit: res[0].date_init,
          dateEnd: res[0].date_end,
          state: res[0].state
        })
        this.idProject = res[0].id
        console.log(this.idProject)
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  cleanForm() {
    this.projectForm.setValue({
      name: '',
      dateInit: '',
      dateEnd: '',
      state: 'No iniciado'
    })
  }

  updateProject() {
    const { name, dateInit, dateEnd, state } = this.projectForm.value

    this.adminService.updateProject(name!, dateInit!, dateEnd!, state!, this.idProject).subscribe({
      next: (res: any) => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          text: '¡Proyecto actualizado correctamente!',
          timer: 2000
        })
        this.idProject = 0
        this.projectForm.reset()
        this.getProjects()
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          text: '¡Ha ocurrido un error al actualizar el proyecto!',
          timer: 2000
        })
      }
    })
  }

  deleteProject(id: number) {
    Swal.fire({
      title: '¿Estás seguro de borrar  este proyecto?',
      text: "¡No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar proyecto'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteProject(id).subscribe({
          next: (res) => {
            this.getProjects();
            Swal.fire(
              '¡Borrado!',
              'El proyecto ha sido borrado.',
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
          'El proyecto no ha sido borrado.',
          'error'
        )
      }
    })

  }

}
