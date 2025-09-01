import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project, Resource } from '../../models/interfaces';
import { Admin } from '../../../services/admin';

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
  projects: Project[] = []
  resources:Resource[] = []

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
    const { name, projectId } = this.resourceForm.value
    this.adminService.addResource(name, parseInt(projectId)).subscribe({
      next: (res: any) => {
        console.log('recurso agregado')
      }
    })
  }

  getResources(){
    this.adminService.getResources().subscribe({
      next:(res:Resource[])=>{
        this.resources = res
      }
    })
  }

}
