import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

  private router:Router = inject(Router)

  logOut(){
    this.router.navigate(['/log-in'])
  }

}  
