import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-project-manager',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './project-manager.html',
  styleUrl: './project-manager.scss'
})
export class ProjectManager {

  private router = inject(Router)
  private authService = inject(Auth)

  logOut() {
    this.authService.logOut().subscribe({
      next: (res: any) => {
        this.router.navigate(['login'])
      }
    })
    
  }

}
