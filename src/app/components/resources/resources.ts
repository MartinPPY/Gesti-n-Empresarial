import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project, Resource } from '../../admin/models/interfaces';
import { Admin } from '../../services/admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resources',
  imports: [ReactiveFormsModule],
  templateUrl: './resources.html',
  styleUrl: './resources.scss'
})
export class Resources implements OnInit {

  private adminService = inject(Admin)
  private fb: FormBuilder = inject(FormBuilder)


  resourceForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    projectId: ['', [Validators.required]]
  })

  filterForm: FormGroup = this.fb.group({
    search: ['']
  })

  projects: Project[] = []
  resources: Resource[] = []
  resourceId: number = 0

  ngOnInit(): void {
    this.getProjects()
    this.getResources()
  }


  hasError(controlName: string, errorName: string) {
    return this.resourceForm.get(controlName)!.hasError(errorName) && this.resourceForm.get(controlName)!.touched;
  }

  getProjects() {
    this.adminService.getProjects().subscribe({
      next: (res: Project[]) => {
        this.projects = res
      }
    })
  }

  addResource() {

    if (this.resourceForm.invalid) {
      Swal.fire({
        icon: 'error',
        text: 'Revisa que todos los campos esten completos'
      })
      return
    }

    const { name, projectId } = this.resourceForm.value
    this.adminService.addResource(name, parseInt(projectId)).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Recurso agregado correctamente',
          timer: 2000
        })
        this.getResources()
        this.resourceForm.reset()
      }
    })
  }

  getResources() {
    this.adminService.getResources().subscribe({
      next: (res: Resource[]) => {
        this.resources = res
      }
    })
  }

  getResource(id: number) {
    this.adminService.getResource(id).subscribe({
      next: (res: Resource[]) => {
        this.resourceForm.setValue({
          name: res[0].name,
          projectId: res[0].project_id,
        })

        this.resourceId = res[0].id
      }
    })
  }

  editResource() {
    const { name, projectId } = this.resourceForm.value
    console.log(name, projectId, this.resourceId)
    this.adminService.updateResource(name, parseInt(projectId), this.resourceId).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Recurso actualizado',
          timer: 2000
        })

        this.getResources()
      }
    })
  }

  filterResources() {
    const { search } = this.filterForm.value
    this.adminService.filterResources(search).subscribe({
      next: (res: Resource[]) => {
        this.resources = res
      }
    })
  }

  deleteResource(id: number) {
    Swal.fire({
      title: '¿Estás seguro de borrar  este recurso?',
      text: "¡No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar recurso'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteResource(id).subscribe({
          next: (res) => {
            this.getResources()
            Swal.fire(
              '¡Borrado!',
              'El recurso ha sido borrado.',
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
          'El recurso no ha sido borrada.',
          'error'
        )
      }
    })
  }


}
